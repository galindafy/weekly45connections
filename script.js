
document.addEventListener("DOMContentLoaded", () => {
  const SIZE = 45;
  const STORAGE_KEY = "connections-polished-45x45-v1";
  const GROUP_COLORS = ["#f9df6d","#a0c35a","#b0c4ef","#ba81c5"];
const CATEGORY_BANK = {
  "FRUITS": [...],
  "COLOURS": [...],
  "CITIES": [...],
  "SINGERS": [...],
  "ACTORS": [...],
  "CLOTHING BRANDS": [...],
  "ANIMALS": [...],
  "DESSERTS": [...],
  "BREAKFAST FOODS": [...],
  "PHONE APPS": [...],
  "THINGS AT THE BEACH": [...],
  "COMMON PASSWORD WORDS": [...],
  "BOOKS": [...],
  "COUNTRIES": [...],
  "SPORTS": [...],
  "FLOWERS": [...],
  "BEVERAGES": [...],
  "THINGS IN A HOME": [...],
  "JOBS": [...],
  "MOVIE TITLES": [...],
  "SONG TITLES": [...],
  "FOODS": [...],
  "VEGETABLES": [...],
  "TOOLS": [...],
  "FURNITURE": [...],
  "VEHICLES": [...],
  "MUSICAL INSTRUMENTS": [...],
  "BOARD GAMES": [...],
  "CARD GAMES": [...],
  "SOCIAL MEDIA PLATFORMS": [...],
  "STREAMING SERVICES": [...],
  "FAST FOOD CHAINS": [...],
  "COFFEE DRINKS": [...],
  "ALCOHOL TYPES": [...],
  "CHEESES": [...],
  "PASTA TYPES": [...],
  "BREAD TYPES": [...],
  "CANDY": [...],
  "ICE CREAM FLAVOURS": [...],
  "MAKEUP PRODUCTS": [...],
  "SKINCARE": [...],
  "HAIR PRODUCTS": [...],
  "EXERCISES": [...],
  "SPORTS TEAMS": [...],
  "AIRLINES": [...],
};  const board = document.getElementById("board");
  const mistakesEl = document.getElementById("mistakes");
  const dateEl = document.getElementById("puzzleDate");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const deselectBtn = document.getElementById("deselectBtn");
  function seedForToday() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
  }
  function formatLongDate(k) {
    const y = Number(k.slice(0,4)), m = Number(k.slice(4,6))-1, d = Number(k.slice(6,8));
    return new Date(y,m,d).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
  }
  function seedNumber(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }
  function rand(seed) { const x = Math.sin(seed) * 10000; return x - Math.floor(x); }
  function shuffle(arr, seed) {
    const copy = [...arr]; let s = seed;
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand(s++) * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function pick45(arr, seed) {
    const uniq = [...new Set(arr)];
    return shuffle(uniq, seed).slice(0, 45);
  }
function createDailyCategories(key) {
  const seed = seedNumber(key);

  const entries = Object.entries(CATEGORY_BANK);

  // pick 45 categories
  const chosen = shuffle(entries, seed).slice(0, 45);

  return chosen.map(([name, words], i) => ({
    name,
    words: shuffle(words, seed + i * 100).slice(0, 45)
  }));
}
  function buildFreshState() {
    const dateKey = seedForToday();
    const cats = createDailyCategories(dateKey);
    const tiles = [];
    const lookup = {};
    cats.forEach((cat, idx) => {
      cat.words.forEach(word => {
        tiles.push(word);
        lookup[word] = { name: cat.name, color: GROUP_COLORS[idx % GROUP_COLORS.length] };
      });
    });
    return { dateKey, lookup, groups: shuffle(tiles, seedNumber(dateKey) + 999).map(word => ({ words:[word], solved:false, category:null, color:null })), selectedIndex:null, mistakes:0 };
  }
  function validSaved(saved, fresh) {
    if (!saved || saved.dateKey !== fresh.dateKey || !Array.isArray(saved.groups)) return false;
    const words = saved.groups.flatMap(g => g.words || []);
    if (words.length !== SIZE * SIZE) return false;
    const uniq = new Set(words);
    if (uniq.size !== SIZE * SIZE) return false;
    const valid = new Set(Object.keys(fresh.lookup));
    for (const w of uniq) if (!valid.has(w)) return false;
    return true;
  }
  function loadState() {
    const fresh = buildFreshState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fresh;
      const saved = JSON.parse(raw);
      if (!validSaved(saved, fresh)) return fresh;
      return { dateKey:fresh.dateKey, lookup:fresh.lookup, groups:saved.groups, selectedIndex:null, mistakes:Number.isFinite(saved.mistakes)?saved.mistakes:0 };
    } catch { return fresh; }
  }
  let state = loadState();
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dateKey:state.dateKey, groups:state.groups, mistakes:state.mistakes }));
  }
  function preview(group) {
    const t = group.words.slice(0,2).join(", ");
    return group.words.length >= 3 ? `${t}, ... [${group.words.length}]` : t;
  }
  function categoryForWords(words) {
    const first = state.lookup[words[0]];
    if (!first) return null;
    for (const w of words) {
      const info = state.lookup[w];
      if (!info || info.name !== first.name) return null;
    }
    return first;
  }
  function shakeIndex(i) {
    const tile = board.children[i];
    if (tile) { tile.classList.add("shake"); setTimeout(() => tile.classList.remove("shake"), 280); }
  }
  function rejectMerge(i) {
    state.mistakes += 1;
    requestAnimationFrame(() => shakeIndex(i));
  }
  function mergeIntoSecond(a, b) {
    const mergedWords = [...state.groups[a].words, ...state.groups[b].words];
    const category = categoryForWords(mergedWords);
    if (!category) { rejectMerge(b); return; }
    const merged = { words: mergedWords, solved:false, category:null, color:null };
    let insertIndex = b;
    if (a > b) {
      state.groups.splice(a, 1);
      state.groups.splice(b, 1);
    } else {
      state.groups.splice(b, 1);
      state.groups.splice(a, 1);
      insertIndex -= 1;
    }
    state.groups.splice(insertIndex, 0, merged);
    if (merged.words.length === SIZE) {
      merged.solved = true;
      merged.category = category.name;
      merged.color = category.color;
    }
  }
  function shuffleUnsolvedInPlace() {
    const seed = seedNumber(state.dateKey) + (Date.now() % 1000);
    const unsolvedIdx = [];
    const unsolvedGroups = [];
    state.groups.forEach((g, i) => {
      if (!g.solved) { unsolvedIdx.push(i); unsolvedGroups.push(g); }
    });
    const shuffled = shuffle(unsolvedGroups, seed);
    unsolvedIdx.forEach((idx, i) => { state.groups[idx] = shuffled[i]; });
  }
  function handleClick(i) {
    const g = state.groups[i];
    if (!g || g.solved) return;
    if (state.selectedIndex === null) { state.selectedIndex = i; render(); return; }
    if (state.selectedIndex === i) { state.selectedIndex = null; render(); return; }
    mergeIntoSecond(state.selectedIndex, i);
    state.selectedIndex = null;
    saveState();
    render();
  }
  function render() {
    dateEl.textContent = formatLongDate(state.dateKey);
    mistakesEl.textContent = String(state.mistakes);
    board.innerHTML = "";
    state.groups.forEach((g, i) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      if (g.solved) {
        tile.classList.add("solved-tile", "hoverable");
        tile.style.background = g.color || GROUP_COLORS[0];
      } else {
        tile.classList.add(g.words.length > 1 ? "merged" : "single");
        if (state.selectedIndex === i) tile.classList.add("selected");
        if (g.words.length >= 3) tile.classList.add("hoverable");
      }
      const label = document.createElement("div");
      label.textContent = g.solved ? (g.category || "") : preview(g);
      tile.appendChild(label);
      if (g.solved || g.words.length >= 3) {
        const hover = document.createElement("div");
        hover.className = "hover-content";
        hover.textContent = g.words.join(", ");
        tile.appendChild(hover);
      }
      if (!g.solved) tile.addEventListener("click", () => handleClick(i));
      board.appendChild(tile);
    });
  }
  shuffleBtn.addEventListener("click", () => {
    shuffleUnsolvedInPlace();
    state.selectedIndex = null;
    saveState();
    render();
  });
  deselectBtn.addEventListener("click", () => { state.selectedIndex = null; render(); });
  render();
});
