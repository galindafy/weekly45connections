(() => {
  const config = window.CONNECTIONS_CONFIG;
  const solvedColours = ['var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--purple)', 'var(--orange)', 'var(--rose)', 'var(--teal)'];

  const categoryPool = [
    ['Birds of prey', ['EAGLE', 'FALCON', 'HAWK', 'OWL']],
    ['Planets', ['MERCURY', 'VENUS', 'MARS', 'SATURN']],
    ['Gemstones', ['RUBY', 'OPAL', 'TOPAZ', 'JADE']],
    ['Dog breeds', ['BEAGLE', 'POODLE', 'BOXER', 'CORGI']],
    ['Tree types', ['MAPLE', 'CEDAR', 'BIRCH', 'SPRUCE']],
    ['Kitchen tools', ['WHISK', 'LADLE', 'TONGS', 'GRATER']],
    ['Board games', ['CHESS', 'CHECKERS', 'RISK', 'SCRABBLE']],
    ['Musical instruments', ['VIOLIN', 'TRUMPET', 'FLUTE', 'CELLO']],
    ['Sea creatures', ['OCTOPUS', 'LOBSTER', 'SEAL', 'TURTLE']],
    ['Flowers', ['TULIP', 'DAISY', 'LILAC', 'POPPY']],
    ['Canadian provinces', ['ALBERTA', 'ONTARIO', 'MANITOBA', 'QUEBEC']],
    ['Winter gear', ['PARKA', 'MITTENS', 'SCARF', 'TOQUE']],
    ['Math terms', ['ANGLE', 'RADIUS', 'VECTOR', 'FRACTION']],
    ['Baking ingredients', ['FLOUR', 'YEAST', 'COCOA', 'BUTTER']],
    ['Camping items', ['TENT', 'LANTERN', 'COOLER', 'SLEEPINGBAG']],
    ['Weather words', ['BLIZZARD', 'DRIZZLE', 'FOG', 'THUNDER']],
    ['Shoe types', ['SANDAL', 'LOAFER', 'SNEAKER', 'BOOT']],
    ['Camera terms', ['LENS', 'SHUTTER', 'FLASH', 'TRIPOD']],
    ['Office supplies', ['STAPLER', 'MARKER', 'BINDER', 'SCISSORS']],
    ['Farm animals', ['DONKEY', 'GOOSE', 'LLAMA', 'PIG']],
    ['Fruits', ['APPLE', 'BANANA', 'MANGO', 'PEACH']],
    ['Vegetables', ['CARROT', 'CELERY', 'RADISH', 'TURNIP']],
    ['Ice cream flavours', ['VANILLA', 'CHOCOLATE', 'PISTACHIO', 'STRAWBERRY']],
    ['Coffee drinks', ['LATTE', 'MOCHA', 'ESPRESSO', 'CAPPUCCINO']],
    ['Sports balls', ['BASEBALL', 'SOFTBALL', 'HANDBALL', 'DODGEBALL']],
    ['Card games', ['POKER', 'BRIDGE', 'RUMMY', 'EUCHRE']],
    ['Greek letters', ['ALPHA', 'BETA', 'DELTA', 'OMEGA']],
    ['School subjects', ['BIOLOGY', 'HISTORY', 'CHEMISTRY', 'ALGEBRA']],
    ['Art supplies', ['CANVAS', 'EASEL', 'PALETTE', 'CHARCOAL']],
    ['Laundry terms', ['DETERGENT', 'BLEACH', 'SOFTENER', 'HAMPER']],
    ['Bathroom items', ['MIRROR', 'TOWEL', 'SOAP', 'RAZOR']],
    ['Space words', ['COMET', 'ASTEROID', 'NEBULA', 'GALAXY']],
    ['Desserts', ['BROWNIE', 'CUPCAKE', 'CHEESECAKE', 'DONUT']],
    ['Sandwiches', ['PANINI', 'REUBEN', 'SUB', 'WRAP']],
    ['Common file types', ['PDF', 'DOCX', 'CSV', 'PNG']],
    ['Phone app tabs', ['HOME', 'SEARCH', 'PROFILE', 'SETTINGS']],
    ['Hair salon words', ['FRINGE', 'LAYER', 'BOB', 'PERM']],
    ['Painting verbs', ['BRUSH', 'ROLL', 'PRIME', 'VARNISH']],
    ['Types of pasta', ['PENNE', 'FUSILLI', 'RIGATONI', 'FARFALLE']],
    ['Car parts', ['BUMPER', 'AXLE', 'MIRRORCAP', 'MUFFLER']],
    ['Public transit words', ['TRANSFER', 'PLATFORM', 'TURNSTILE', 'TIMETABLE']],
    ['Construction materials', ['BRICK', 'CEMENT', 'PLYWOOD', 'REBAR']],
    ['Jewellery pieces', ['BROOCH', 'ANKLET', 'PENDANT', 'BANGLE']],
    ['Hospital rooms or areas', ['WARD', 'CLINIC', 'LAB', 'PHARMACY']],
    ['Tennis terms', ['SERVE', 'VOLLEY', 'LOB', 'DEUCE']],
    ['Theatre jobs', ['ACTOR', 'DIRECTOR', 'USHER', 'STAGEHAND']],
    ['Airport words', ['TERMINAL', 'GATE', 'RUNWAY', 'HANGAR']],
    ['Ocean zones', ['REEF', 'LAGOON', 'TRENCH', 'ESTUARY']],
    ['Common prefixes', ['PRE', 'SUB', 'ANTI', 'INTER']],
    ['Common suffixes', ['MENT', 'TION', 'NESS', 'ABLE']],
    ['Measurement tools', ['RULER', 'TAPE', 'CALIPER', 'COMPASS']],
    ['Park features', ['BENCH', 'FOUNTAIN', 'PAVILION', 'GAZEBO']],
    ['Room shapes', ['OVAL', 'SQUARE', 'ROUND', 'RECTANGLE']],
    ['Time units', ['SECOND', 'MINUTE', 'HOUR', 'DECADE']],
    ['Metal types', ['COPPER', 'NICKEL', 'TIN', 'ZINC']],
    ['Rock genres', ['PUNK', 'GRUNGE', 'INDIE', 'METAL']],
    ['Dance styles', ['BALLET', 'SALSA', 'TANGO', 'WALTZ']],
    ['Tropical storms words', ['EYEWALL', 'GUST', 'SURGE', 'CYCLONE']],
    ['Programming terms', ['LOOP', 'ARRAY', 'STRING', 'BOOLEAN']],
    ['Web browser words', ['TAB', 'BOOKMARK', 'COOKIE', 'EXTENSION']],
    ['Retail words', ['AISLE', 'COUPON', 'CHECKOUT', 'CLEARANCE']],
    ['Classroom furniture', ['DESK', 'LECTERN', 'CUBBY', 'WHITEBOARD']],
    ['Garden tasks', ['WEED', 'MULCH', 'PRUNE', 'WATER']],
    ['Road features', ['SHOULDER', 'MEDIAN', 'RAMP', 'TOLLBOOTH']],
    ['Camping cooking gear', ['SKILLET', 'BURNER', 'KETTLE', 'SPATULA']],
    ['Sewing words', ['THIMBLE', 'BOBBIN', 'SEAM', 'HEM']],
    ['Gym equipment', ['BARBELL', 'TREADMILL', 'KETTLEBELL', 'ROWER']],
    ['Office verbs', ['FILE', 'PRINT', 'SCROLL', 'ATTACH']],
    ['Wood shop tools', ['CHISEL', 'SANDER', 'LATHE', 'CLAMP']],
    ['Beach items', ['SUNSCREEN', 'UMBRELLA', 'COOLERBAG', 'FLIPFLOPS']],
    ['Common fabrics', ['DENIM', 'LINEN', 'SATIN', 'CORDUROY']],
    ['Breakfast foods', ['WAFFLE', 'OMELET', 'BAGEL', 'GRANOLA']],
    ['Ski hill words', ['GONDOLA', 'CHAIRLIFT', 'MOGUL', 'LODGE']],
    ['Map words', ['LEGEND', 'INSET', 'SCALEBAR', 'COMPASSROSE']],
    ['Store departments', ['BAKERY', 'PHARMACYDEPT', 'PRODUCE', 'DELI']],
    ['Phone hardware', ['SCREEN', 'BATTERY', 'CAMERA', 'SPEAKER']],
    ['Words on a cheque', ['PAYEE', 'MEMO', 'AMOUNT', 'SIGNATURE']],
    ['Puzzle words', ['CLUE', 'GRID', 'ACROSS', 'DOWN']],
    ['Home repair items', ['DRYWALL', 'CAULK', 'PUTTY', 'SANDPAPER']],
    ['Picnic items', ['PLAIDBLANKET', 'BASKET', 'THERMOS', 'NAPKINS']],
    ['Fishing gear', ['TACKLE', 'LURE', 'BOBBER', 'REEL']],
    ['Library words', ['STACKS', 'CATALOGUE', 'BOOKMARKER', 'CHECKOUTDESK']],
    ['Bakery display items', ['MUFFIN', 'CROISSANT', 'TART', 'SCONE']],
    ['Postal words', ['STAMP', 'ENVELOPE', 'POSTMARK', 'MAILBOX']],
    ['Scent words', ['MUSK', 'CITRUS', 'CEDARWOOD', 'VANILLABEAN']],
    ['Computer peripherals', ['KEYBOARD', 'MOUSE', 'WEBCAM', 'MICROPHONE']],
    ['Pool items', ['GOGGLES', 'KICKBOARD', 'LADDER', 'LANE']],
    ['Movie set jobs', ['GAFFER', 'GRIP', 'EDITOR', 'PRODUCER']],
    ['House styles', ['BUNGALOW', 'COTTAGE', 'DUPLEX', 'TOWNHOUSE']],
    ['Painting surfaces', ['WOODPANEL', 'PLASTER', 'MASONRY', 'DRYWALLBOARD']],
    ['Types of beans', ['KIDNEY', 'PINTO', 'NAVY', 'LENTIL']],
    ['Words after “snow”', ['BALL', 'CONE', 'DRIFT', 'FALL']],
    ['Words after “book”', ['MARK', 'CASE', 'SHELF', 'STORE']],
    ['Words after “hand”', ['SHAKE', 'WRITING', 'BAG', 'RAIL']],
    ['Words before “shop”', ['FLOWER', 'GIFT', 'COFFEE', 'BARBER']],
    ['Words before “room”', ['MAIL', 'NEWS', 'SUN', 'SHOW']],
    ['Words before “light”', ['DAY', 'MOON', 'FLASH', 'LAMP']],
    ['Words before “line”', ['HEAD', 'TAG', 'SKY', 'BASE']],
    ['Words before “board”', ['SKATE', 'SCORE', 'HEAD', 'CUP']],
    ['Words before “box”', ['TOOL', 'MAIL', 'JUKE', 'ICE']],
    ['Words before “house”', ['DOG', 'WARE', 'GREEN', 'PLAY']],
    ['Words before “stone”', ['MILE', 'GEM', 'TOMB', 'FLAG']],
    ['Words before “print”', ['BLUE', 'PAW', 'NEWS', 'FOOT']],
    ['Words after “star”', ['FISH', 'DUST', 'BOARD', 'LIGHT']],
    ['Words after “fire”', ['WORK', 'PLACE', 'HOUSE', 'BALL']],
    ['Words after “water”', ['FALL', 'FRONT', 'PROOF', 'MELON']],
    ['Words after “rain”', ['BOW', 'COAT', 'DROP', 'STORM']],
    ['Words after “moon”', ['LIGHT', 'BEAM', 'ROOF', 'STONE']],
    ['Words after “back”', ['PACK', 'DROP', 'BOARD', 'DOOR']],
    ['Words after “blue”', ['PRINT', 'BERRY', 'BIRD', 'MOON']],
    ['Words after “head”', ['BAND', 'LIGHT', 'BOARD', 'PHONE']],
    ['Words after “foot”', ['BALL', 'PRINT', 'NOTE', 'BRIDGE']],
    ['Words after “sun”', ['RISE', 'SET', 'BEAM', 'FLOWER']],
    ['Words after “note”', ['BOOK', 'CARD', 'PAD', 'WORTHY']]
  ].map(([title, words], index) => ({ id: `c${index + 1}`, title, words }));

  const boardEl = document.getElementById('board');
  const solvedTrayEl = document.getElementById('solvedTray');
  const mistakesEl = document.getElementById('mistakes');
  const groupsEl = document.getElementById('groups');
  const seedLabelEl = document.getElementById('seedLabel');
  const statusBannerEl = document.getElementById('statusBanner');
  const strikesEl = document.getElementById('strikes');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const deselectBtn = document.getElementById('deselectBtn');
  const submitBtn = document.getElementById('submitBtn');

  const seedInfo = getSeedInfo(config.puzzleType);
  const storageKey = `${config.storagePrefix}:${seedInfo.key}`;
  seedLabelEl.textContent = seedInfo.label;

  let puzzle = buildPuzzle(seedInfo.key, config.categoryCount);
  let state = loadState() || createFreshState();
  normaliseState();
  render();

  shuffleBtn.addEventListener('click', () => {
    if (state.locked) return;
    state.tileOrder = shuffleUnsolved(state.tileOrder);
    saveState();
    renderBoard();
  });

  deselectBtn.addEventListener('click', () => {
    state.selected = [];
    saveState();
    renderBoard();
    renderButtons();
  });

  submitBtn.addEventListener('click', submitSelection);

  function createFreshState() {
    return {
      selected: [],
      solvedIds: [],
      mistakes: 0,
      locked: false,
      won: false,
      tileOrder: puzzle.tiles.map(tile => tile.id),
      revealedOnLoss: false
    };
  }

  function normaliseState() {
    const validTileIds = new Set(puzzle.tiles.map(tile => tile.id));
    state.selected = (state.selected || []).filter(id => validTileIds.has(id));
    state.solvedIds = (state.solvedIds || []).filter(id => puzzle.categories.some(cat => cat.id === id));
    if (!Array.isArray(state.tileOrder) || state.tileOrder.length !== puzzle.tiles.length) {
      state.tileOrder = puzzle.tiles.map(tile => tile.id);
    }
    if (state.mistakes >= 4) {
      state.locked = true;
      state.revealedOnLoss = true;
    }
    if (state.solvedIds.length === puzzle.categories.length) {
      state.won = true;
      state.locked = true;
    }
  }

  function submitSelection() {
    if (state.locked || state.selected.length !== 4) return;
    const selectedTiles = state.selected.map(id => puzzle.tileById.get(id));
    const categoryId = selectedTiles[0].categoryId;
    const allMatch = selectedTiles.every(tile => tile.categoryId === categoryId);

    if (allMatch) {
      if (!state.solvedIds.includes(categoryId)) state.solvedIds.push(categoryId);
      state.selected = [];
      state.tileOrder = orderTilesForSolvedFirst();
      const solvedCount = state.solvedIds.length;
      if (solvedCount === puzzle.categories.length) {
        state.won = true;
        state.locked = true;
        setStatus('Solved. A new puzzle will appear automatically on the next date or week.');
      } else {
        setStatus('Correct.');
      }
    } else {
      state.mistakes += 1;
      const grouped = groupSelectedByCategory(selectedTiles);
      const oneAway = [...grouped.values()].some(count => count === 3);
      setStatus(oneAway ? 'One away.' : 'Not a group.');
      if (state.mistakes >= 4) {
        state.locked = true;
        state.revealedOnLoss = true;
        setStatus('Out of mistakes. The groups are shown below.');
      }
      state.selected = [];
    }
    saveState();
    render();
  }

  function groupSelectedByCategory(selectedTiles) {
    const map = new Map();
    selectedTiles.forEach(tile => map.set(tile.categoryId, (map.get(tile.categoryId) || 0) + 1));
    return map;
  }

  function setStatus(message) {
    state.statusMessage = message;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function buildPuzzle(seed, count) {
    const rng = mulberry32(hashString(`${config.storagePrefix}:${seed}`));
    const shuffledCategories = [...categoryPool];
    shuffleInPlace(shuffledCategories, rng);

    const chosenCategories = [];
    const usedWords = new Set();
    for (const cat of shuffledCategories) {
      const clash = cat.words.some(word => usedWords.has(word.toUpperCase()));
      if (clash) continue;
      chosenCategories.push(cat);
      cat.words.forEach(word => usedWords.add(word.toUpperCase()));
      if (chosenCategories.length === count) break;
    }

    if (chosenCategories.length !== count) {
      throw new Error(`Not enough unique categories to build a ${count}-group puzzle.`);
    }

    const categories = chosenCategories.map((cat, catIndex) => ({
      ...cat,
      order: catIndex
    }));

    const tiles = categories.flatMap(cat => cat.words.map((word, wordIndex) => ({
      id: `${cat.id}-${wordIndex}`,
      word,
      categoryId: cat.id,
      categoryTitle: cat.title
    })));

    const tileOrder = [...tiles];
    shuffleInPlace(tileOrder, mulberry32(hashString(`${config.storagePrefix}:${seed}:tiles`)));

    return {
      categories,
      categoryById: new Map(categories.map(cat => [cat.id, cat])),
      tiles: tileOrder,
      tileById: new Map(tiles.map(tile => [tile.id, tile]))
    };
  }

  function orderTilesForSolvedFirst() {
    const solved = [];
    const unsolved = [];
    const current = state.tileOrder.map(id => puzzle.tileById.get(id)).filter(Boolean);
    current.forEach(tile => {
      if (state.solvedIds.includes(tile.categoryId)) solved.push(tile.id);
      else unsolved.push(tile.id);
    });
    return [...solved, ...unsolved];
  }

  function shuffleUnsolved(tileOrder) {
    const solved = [];
    const unsolved = [];
    tileOrder.forEach(id => {
      const tile = puzzle.tileById.get(id);
      if (!tile) return;
      if (state.solvedIds.includes(tile.categoryId)) solved.push(id);
      else unsolved.push(id);
    });
    shuffleInPlace(unsolved, mulberry32(hashString(`${storageKey}:${Date.now()}`)));
    return [...solved, ...unsolved];
  }

  function render() {
    renderMeta();
    renderStrikes();
    renderSolvedTray();
    renderBoard();
    renderButtons();
  }

  function renderMeta() {
    mistakesEl.textContent = `${state.mistakes} / 4`;
    groupsEl.textContent = `${state.solvedIds.length} / ${puzzle.categories.length}`;
    statusBannerEl.textContent = state.statusMessage || '';
  }

  function renderStrikes() {
    strikesEl.innerHTML = '';
    for (let i = 0; i < 4; i += 1) {
      const dot = document.createElement('span');
      dot.className = `strike-dot${i < state.mistakes ? ' used' : ''}`;
      strikesEl.appendChild(dot);
    }
  }

  function renderSolvedTray() {
    solvedTrayEl.innerHTML = '';
    const visibleIds = state.revealedOnLoss ? puzzle.categories.map(cat => cat.id) : state.solvedIds;
    visibleIds.forEach((categoryId, index) => {
      const cat = puzzle.categoryById.get(categoryId);
      const card = document.createElement('article');
      card.className = 'solved-card';
      card.style.background = solvedColours[index % solvedColours.length];
      const title = document.createElement('p');
      title.className = 'solved-title';
      title.textContent = cat.title;
      const words = document.createElement('p');
      words.className = 'solved-words';
      words.textContent = cat.words.join(', ');
      card.append(title, words);
      solvedTrayEl.appendChild(card);
    });
  }

  function renderBoard() {
    boardEl.innerHTML = '';
    state.tileOrder.forEach(tileId => {
      const tile = puzzle.tileById.get(tileId);
      if (!tile) return;
      const solvedIndex = state.solvedIds.indexOf(tile.categoryId);
      const shouldHide = solvedIndex !== -1;
      if (shouldHide) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tile';
      btn.textContent = prettifyWord(tile.word);
      const isSelected = state.selected.includes(tile.id);
      if (isSelected) btn.classList.add('selected');
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.addEventListener('click', () => toggleTile(tile.id));
      boardEl.appendChild(btn);
    });
  }

  function renderButtons() {
    submitBtn.disabled = state.locked || state.selected.length !== 4;
  }

  function prettifyWord(word) {
    return word
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]{4,})([A-Z][a-z])/g, '$1 $2');
  }

  function toggleTile(tileId) {
    if (state.locked) return;
    if (state.selected.includes(tileId)) {
      state.selected = state.selected.filter(id => id !== tileId);
    } else {
      if (state.selected.length >= 4) return;
      state.selected.push(tileId);
    }
    saveState();
    renderBoard();
    renderButtons();
  }

  function getSeedInfo(type) {
    const now = new Date();
    const local = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (type === 'weekly') {
      const day = local.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      const monday = new Date(local);
      monday.setDate(local.getDate() + mondayOffset);
      return {
        key: formatDateKey(monday),
        label: formatLongDate(monday)
      };
    }
    return {
      key: formatDateKey(local),
      label: formatLongDate(local)
    };
  }

  function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatLongDate(date) {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  function hashString(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i += 1) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  function mulberry32(seedFactory) {
    let t = typeof seedFactory === 'function' ? seedFactory() : seedFactory;
    return function() {
      t += 0x6D2B79F5;
      let x = Math.imul(t ^ (t >>> 15), t | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleInPlace(arr, rng) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
})();
