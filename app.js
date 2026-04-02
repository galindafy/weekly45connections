(() => {
  const GROUP_SIZE = 45;
  const BOARD_GROUPS = 45;
  const STORAGE_PREFIX = 'connections45:';

  const weekInfo = getISOWeekInfo(new Date());
  const storageKey = `${STORAGE_PREFIX}${weekInfo.key}`;

  let state = loadState();
  if (!state) {
    state = createWeeklyState();
    saveState();
  }

  const shuffleBtn = document.getElementById('megaShuffleBtn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      shuffleOpenTiles();
      saveState();
      render();
    });
  }

  render();

  function getISOWeekInfo(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return {
      year: d.getUTCFullYear(),
      week,
      key: `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
    };
  }

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function shuffleInPlace(arr, rng) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function makeTileId(groupIndex, itemIndex) {
    return `tile-${groupIndex}-${itemIndex}`;
  }

  function createWeeklyState() {
    const categories = pickWeeklyCategories();
    const tiles = [];

    categories.forEach((category, groupIndex) => {
      category.items.forEach((item, itemIndex) => {
        tiles.push({
          id: makeTileId(groupIndex, itemIndex),
          categoryId: category.id,
          words: [item],
          solved: false,
          selected: false
        });
      });
    });

    const rng = mulberry32(hashString(`${weekInfo.key}:tiles`));
    shuffleInPlace(tiles, rng);

    return {
      weekKey: weekInfo.key,
      week: weekInfo.week,
      year: weekInfo.year,
      score: 0,
      mistakes: 0,
      categories,
      tiles
    };
  }

  function pickWeeklyCategories() {
    const all = Array.isArray(window.CATEGORY_BANK) ? window.CATEGORY_BANK : [];
    const rng = mulberry32(hashString(`${weekInfo.key}:categories`));
    const candidates = all.map(cat => ({ ...cat, items: cat.items.slice() }));
    shuffleInPlace(candidates, rng);

    const chosen = [];
    const usedItems = new Set();

    for (const category of candidates) {
      if (chosen.length >= BOARD_GROUPS) break;
      if (!Array.isArray(category.items) || category.items.length !== GROUP_SIZE) continue;
      if (hasInternalDuplicates(category.items)) continue;
      if (category.items.some(item => usedItems.has(item))) continue;

      chosen.push(category);
      category.items.forEach(item => usedItems.add(item));
    }

    if (chosen.length < BOARD_GROUPS) {
      throw new Error('Not enough non-overlapping categories to build the board.');
    }

    return chosen;
  }

  function hasInternalDuplicates(items) {
    return new Set(items).size !== items.length;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!isValidState(parsed)) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function isValidState(value) {
    if (!value || !Array.isArray(value.tiles) || !Array.isArray(value.categories)) return false;
    if (typeof value.week !== 'number' || typeof value.year !== 'number') return false;
    const singleWords = new Set();

    for (const tile of value.tiles) {
      if (!tile || typeof tile.id !== 'string' || typeof tile.categoryId !== 'string') return false;
      if (!Array.isArray(tile.words) || tile.words.length < 1 || tile.words.length > GROUP_SIZE) return false;
      if (tile.words.some(word => typeof word !== 'string' || /\s\d+$/.test(word))) return false;
      if (tile.words.length === 1) {
        const word = tile.words[0];
        if (singleWords.has(word)) return false;
        singleWords.add(word);
      }
    }

    return true;
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function selectedTiles() {
    return state.tiles.filter(tile => tile.selected && !tile.solved);
  }

  function clearSelection() {
    state.tiles.forEach(tile => {
      tile.selected = false;
      delete tile.selectedAt;
    });
  }

  function handleTileClick(id) {
    const tile = state.tiles.find(t => t.id === id);
    if (!tile || tile.solved) return;

    const currentlySelected = selectedTiles();

    if (tile.selected) {
      tile.selected = false;
      delete tile.selectedAt;
      saveState();
      render();
      return;
    }

    if (currentlySelected.length >= 2) {
      clearSelection();
    }

    tile.selected = true;
    tile.selectedAt = Date.now() + Math.random();

    const nowSelected = selectedTiles().sort((a, b) => (a.selectedAt || 0) - (b.selectedAt || 0));
    if (nowSelected.length !== 2) {
      saveState();
      render();
      return;
    }

    const [firstTile, secondTile] = nowSelected;

    if (firstTile.categoryId === secondTile.categoryId) {
      mergeTiles(firstTile.id, secondTile.id);
      state.score += 1;
      saveState();
      render();
      return;
    }

    state.mistakes += 1;
    firstTile.bad = true;
    secondTile.bad = true;
    firstTile.selected = false;
    secondTile.selected = false;
    delete firstTile.selectedAt;
    delete secondTile.selectedAt;
    saveState();
    render();
    setTimeout(() => {
      state.tiles.forEach(t => delete t.bad);
      render();
    }, 280);
  }

  function mergeTiles(firstId, secondId) {
    const firstIndex = state.tiles.findIndex(t => t.id === firstId);
    const secondIndex = state.tiles.findIndex(t => t.id === secondId);
    if (firstIndex === -1 || secondIndex === -1) return;

    const firstTile = state.tiles[firstIndex];
    const secondTile = state.tiles[secondIndex];
    const mergedWords = uniquePreserveOrder([...firstTile.words, ...secondTile.words]);

    const mergedTile = {
      ...secondTile,
      words: mergedWords,
      selected: false,
      solved: mergedWords.length === GROUP_SIZE
    };
    delete mergedTile.selectedAt;
    delete mergedTile.bad;

    state.tiles = state.tiles.filter(t => t.id !== firstId && t.id !== secondId);
    const insertIndex = firstIndex < secondIndex ? secondIndex - 1 : secondIndex;
    state.tiles.splice(insertIndex, 0, mergedTile);

    if (mergedTile.solved) {
      moveSolvedGroupToTop(mergedTile.categoryId);
    }
  }

  function moveSolvedGroupToTop(categoryId) {
    const solved = state.tiles.filter(tile => tile.categoryId === categoryId);
    const others = state.tiles.filter(tile => tile.categoryId !== categoryId);
    state.tiles = [...solved, ...others];
  }

  function uniquePreserveOrder(items) {
    const seen = new Set();
    const out = [];
    for (const item of items) {
      if (!seen.has(item)) {
        seen.add(item);
        out.push(item);
      }
    }
    return out;
  }

  function shuffleOpenTiles() {
    clearSelection();
    const solved = state.tiles.filter(tile => tile.solved);
    const open = state.tiles.filter(tile => !tile.solved);
    const rng = mulberry32(hashString(`${storageKey}:shuffle:${state.score}:${state.mistakes}:${open.length}`));
    shuffleInPlace(open, rng);
    state.tiles = [...solved, ...open];
  }

  function formatGroup(words, previewCount = null) {
    if (previewCount && words.length > previewCount) {
      return `${words.slice(0, previewCount).join(', ')}, ... [${words.length}]`;
    }
    return words.join(', ');
  }

  function render() {
    renderStatus();
    renderBoard();
  }

  function renderStatus() {
    const status = document.getElementById('megaStatus');
    if (!status) return;
    status.innerHTML = [
      `<span class="status-pill">Week ${state.week}, ${state.year}</span>`,
      `<span class="status-pill">Score ${state.score}</span>`,
      `<span class="status-pill">Mistakes ${state.mistakes}</span>`
    ].join('');
  }

  function renderBoard() {
    const board = document.getElementById('megaBoard');
    if (!board) return;

    board.innerHTML = '';

    state.tiles.forEach(tile => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = `tile ${tile.words.length === 1 ? 'single' : 'merged'} ${tile.solved ? 'solved-tile' : ''} ${tile.selected ? 'selected' : ''} ${tile.bad ? 'bad' : ''} ${tile.words.length > 2 ? 'hoverable' : ''}`;

      const preview = tile.words.length === 1 ? tile.words[0] : formatGroup(tile.words, 2);
      const popup = tile.words.length > 2 ? `<span class="hover-content">${escapeHtml(formatGroup(tile.words))}</span>` : '';
      el.innerHTML = `<span>${escapeHtml(preview)}</span>${popup}`;
      el.addEventListener('click', () => handleTileClick(tile.id));
      board.appendChild(el);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
