const SIZE = 45;
const STORAGE_KEY = "weekly45-expanded-v1";

const board = document.getElementById("board");
const mistakesEl = document.getElementById("mistakes");
const groupsEl = document.getElementById("groups");
const dateEl = document.getElementById("date");
const shuffleBtn = document.getElementById("shuffleBtn");
const deselectBtn = document.getElementById("deselectBtn");

const CATEGORY_BANK = {
  "Birds of prey": ["eagle", "falcon", "hawk", "owl"],
  "Planets": ["Mercury", "Venus", "Mars", "Saturn"],
  "Gemstones": ["ruby", "opal", "topaz", "jade"],
  "Dog breeds": ["beagle", "poodle", "boxer", "corgi"],
  "Tree types": ["maple", "cedar", "birch", "spruce"],
  "Kitchen tools": ["whisk", "ladle", "tongs", "grater"],
  "Board games": ["chess", "checkers", "Risk", "Scrabble"],
  "Musical instruments": ["violin", "trumpet", "flute", "cello"],
  "Sea creatures": ["octopus", "lobster", "seal", "turtle"],
  "Flowers": ["tulip", "daisy", "lilac", "poppy"],
  "Canadian provinces": ["Alberta", "Ontario", "Manitoba", "Quebec"],
  "Winter gear": ["parka", "mittens", "scarf", "toque"],
  "Math terms": ["angle", "radius", "vector", "fraction"],
  "Baking ingredients": ["flour", "yeast", "cocoa", "butter"],
  "Camping items": ["tent", "lantern", "cooler", "sleeping bag"],
  "Weather words": ["blizzard", "drizzle", "fog", "thunder"],
  "Shoe types": ["sandal", "loafer", "sneaker", "boot"],
  "Camera terms": ["lens", "shutter", "flash", "tripod"],
  "Office supplies": ["stapler", "marker", "binder", "scissors"],
  "Farm animals": ["donkey", "goose", "llama", "pig"],
  "Fruits": ["apple", "banana", "mango", "peach"],
  "Vegetables": ["carrot", "celery", "radish", "turnip"],
  "Ice cream flavours": ["vanilla", "chocolate", "pistachio", "strawberry"],
  "Coffee drinks": ["latte", "mocha", "espresso", "cappuccino"],
  "Sports balls": ["baseball", "softball", "handball", "dodgeball"],
  "Card games": ["poker", "bridge", "rummy", "euchre"],
  "Greek letters": ["alpha", "beta", "delta", "omega"],
  "School subjects": ["biology", "history", "chemistry", "algebra"],
  "Art supplies": ["canvas", "easel", "palette", "charcoal"],
  "Laundry terms": ["detergent", "bleach", "softener", "hamper"],
  "Bathroom items": ["mirror", "towel", "soap", "razor"],
  "Space words": ["comet", "asteroid", "nebula", "galaxy"],
  "Desserts": ["brownie", "cupcake", "cheesecake", "donut"],
  "Sandwiches": ["panini", "Reuben", "sub", "wrap"],
  "Common file types": ["PDF", "DOCX", "CSV", "PNG"],
  "Phone app tabs": ["home", "search", "profile", "settings"],
  "Hair salon words": ["fringe", "layer", "bob", "perm"],
  "Painting verbs": ["brush", "roll", "prime", "varnish"],
  "Types of pasta": ["penne", "fusilli", "rigatoni", "farfalle"],
  "Car parts": ["bumper", "axle", "mirror cap", "muffler"],
  "Public transit words": ["transfer", "platform", "turnstile", "timetable"],
  "Construction materials": ["brick", "cement", "plywood", "rebar"],
  "Jewellery pieces": ["brooch", "anklet", "pendant", "bangle"],
  "Hospital areas": ["ward", "clinic", "lab", "pharmacy"],
  "Tennis terms": ["serve", "volley", "lob", "deuce"],
  "Theatre jobs": ["actor", "director", "usher", "stagehand"],
  "Airport words": ["terminal", "gate", "runway", "hangar"],
  "Ocean zones": ["reef", "lagoon", "trench", "estuary"],
  "Common prefixes": ["pre", "sub", "anti", "inter"],
  "Common suffixes": ["ment", "tion", "ness", "able"],
  "Measurement tools": ["ruler", "tape", "caliper", "compass"],
  "Park features": ["bench", "fountain", "pavilion", "gazebo"],
  "Time units": ["second", "minute", "hour", "decade"],
  "Metal types": ["copper", "nickel", "tin", "zinc"],
  "Rock genres": ["punk", "grunge", "indie", "metal"],
  "Dance styles": ["ballet", "salsa", "tango", "waltz"],
  "Programming terms": ["loop", "array", "string", "boolean"],
  "Web browser words": ["tab", "bookmark", "cookie", "extension"],
  "Retail words": ["aisle", "coupon", "checkout", "clearance"],
  "Garden tasks": ["weed", "mulch", "prune", "water"],
  "Road features": ["shoulder", "median", "ramp", "tollbooth"],
  "Sewing words": ["thimble", "bobbin", "seam", "hem"],
  "Gym equipment": ["barbell", "treadmill", "kettlebell", "rower"],
  "Office verbs": ["file", "print", "scroll", "attach"],
  "Wood shop tools": ["chisel", "sander", "lathe", "clamp"],
  "Breakfast foods": ["waffle", "omelet", "bagel", "granola"],
  "Map words": ["legend", "inset", "scale bar", "compass rose"],
  "Phone hardware": ["screen", "battery", "camera", "speaker"],
  "Cheque words": ["payee", "memo", "amount", "signature"],
  "Puzzle words": ["clue", "grid", "across", "down"],
  "Fishing gear": ["tackle", "lure", "bobber", "reel"],
  "Postal words": ["stamp", "envelope", "postmark", "mailbox"],
  "Computer peripherals": ["keyboard", "mouse", "webcam", "microphone"],
  "Pool items": ["goggles", "kickboard", "ladder", "lane"],
  "House styles": ["bungalow", "cottage", "duplex", "townhouse"],
  "Types of beans": ["kidney", "pinto", "navy", "lentil"],
  "Words after snow": ["ball", "cone", "drift", "fall"],
  "Words after book": ["mark", "case", "shelf", "store"],
  "Words after hand": ["shake", "writing", "bag", "rail"],
  "Words before shop": ["flower", "gift", "coffee", "barber"],
  "Words before room": ["mail", "news", "sun", "show"],
  "Words before light": ["day", "moon", "flash", "lamp"],
  "Words before line": ["head", "tag", "sky", "base"],
  "Words before board": ["skate", "score", "head", "cup"],
  "Words before box": ["tool", "mail", "jukebox", "ice"],
  "Words before house": ["dog", "ware", "green", "play"],
  "Words before stone": ["mile", "gem", "tomb", "flag"],
  "Words before print": ["blue", "paw", "news", "foot"],
  "Words after star": ["fish", "dust", "board", "light"],
  "Words after fire": ["work", "place", "house", "ball"],
  "Words after water": ["fall", "front", "proof", "melon"],
  "Words after rain": ["bow", "coat", "drop", "storm"],
  "Words after moon": ["light", "beam", "stone", "roof"],
  "Words after back": ["pack", "drop", "board", "door"],
  "Words after blue": ["print", "berry", "bird", "moon"],
  "Words after head": ["band", "light", "board", "phone"],
  "Words after foot": ["ball", "print", "note", "bridge"],
  "Words after sun": ["rise", "set", "beam", "flower"],
  "Words after note": ["book", "card", "pad", "worthy"]
};

function weekKey() {
  const d = new Date();
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = local.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  const monday = new Date(local);
  monday.setDate(local.getDate() + offset);
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

function formatLongDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function seedNumber(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h >>> 0);
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatWord(word) {
  if (/^[A-Z0-9]{2,}$/.test(word)) return word;
  if (/[A-Z]/.test(word) && word !== word.toUpperCase()) return word;
  return word.toLowerCase();
}

function preview(words) {
  const formatted = words.map(formatWord);
  if (formatted.length <= 2) return formatted.join(", ");
  return `${formatted[0]}, ${formatted[1]}, ... [${formatted.length}]`;
}

function chooseCategoriesForKey(key, count) {
  const rng = mulberry32(seedNumber(`weekly:${key}`));
  const entries = Object.entries(CATEGORY_BANK);
  return shuffle(entries, rng).slice(0, count);
}

function buildFreshState() {
  const key = weekKey();
  const chosen = chooseCategoriesForKey(key, SIZE);
  const tileRng = mulberry32(seedNumber(`weekly:${key}:tiles`));

  const lookup = {};
  const words = [];

  chosen.forEach(([category, items]) => {
    items.forEach((word) => {
      lookup[word] = category;
      words.push(word);
    });
  });

  const groups = shuffle(words, tileRng).map((word) => ({
    words: [word]
  }));

  return {
    key,
    lookup,
    groups,
    mistakes: 0,
    selected: null
  };
}

function validSaved(saved, fresh) {
  if (!saved || saved.key !== fresh.key || !Array.isArray(saved.groups)) return false;

  const savedWords = saved.groups.flatMap(g => Array.isArray(g.words) ? g.words : []);
  const freshWords = Object.keys(fresh.lookup);

  if (savedWords.length !== freshWords.length) return false;
  if (new Set(savedWords).size !== freshWords.length) return false;

  const validSet = new Set(freshWords);
  for (const word of savedWords) {
    if (!validSet.has(word)) return false;
  }

  return true;
}

function loadState() {
  const fresh = buildFreshState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;

    const saved = JSON.parse(raw);
    if (!validSaved(saved, fresh)) {
      localStorage.removeItem(STORAGE_KEY);
      return fresh;
    }

    return {
      key: fresh.key,
      lookup: fresh.lookup,
      groups: saved.groups,
      mistakes: Number.isFinite(saved.mistakes) ? saved.mistakes : 0,
      selected: null
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return fresh;
  }
}

let state = loadState();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    key: state.key,
    groups: state.groups,
    mistakes: state.mistakes
  }));
}

function shake(index) {
  const tile = board.children[index];
  if (!tile) return;
  tile.classList.add("shake");
  setTimeout(() => tile.classList.remove("shake"), 250);
}

function same(words) {
  const category = state.lookup[words[0]];
  return words.every(word => state.lookup[word] === category);
}

function merge(a, b) {
  const first = state.groups[a];
  const second = state.groups[b];
  if (!first || !second) return;

  const mergedWords = [...first.words, ...second.words];

  if (!same(mergedWords)) {
    state.mistakes += 1;
    shake(b);
    return;
  }

  const merged = { words: mergedWords };
  const newGroups = state.groups.filter((_, i) => i !== a && i !== b);

  const insertIndex = b > a ? b - 1 : b;
  newGroups.splice(insertIndex, 0, merged);
  state.groups = newGroups;
}

function clickTile(index) {
  if (state.selected === null) {
    state.selected = index;
    render();
    return;
  }

  if (state.selected === index) {
    state.selected = null;
    render();
    return;
  }

  merge(state.selected, index);
  state.selected = null;
  save();
  render();
}

function shuffleUnsolved() {
  const rng = mulberry32(seedNumber(`weekly-shuffle:${state.key}:${state.groups.length}:${state.mistakes}`));
  state.groups = shuffle(state.groups, rng);
  state.selected = null;
  save();
  render();
}

function deselectAll() {
  state.selected = null;
  render();
}

function render() {
  board.innerHTML = "";
  dateEl.textContent = formatLongDate(state.key);
  mistakesEl.textContent = String(state.mistakes);
  groupsEl.textContent = String(state.groups.length);

  state.groups.forEach((group, index) => {
    if (!group || !Array.isArray(group.words)) return;

    const tile = document.createElement("div");
    tile.className = "tile";

    if (group.words.length > 1) tile.classList.add("merged");
    if (state.selected === index) tile.classList.add("selected");

    const label = document.createElement("div");
    label.textContent = preview(group.words);
    tile.appendChild(label);

    if (group.words.length >= 3) {
      tile.classList.add("hoverable");
      const hover = document.createElement("div");
      hover.className = "hover-content";
      hover.textContent = group.words.map(formatWord).join(", ");
      tile.appendChild(hover);
    }

    tile.addEventListener("click", () => clickTile(index));
    board.appendChild(tile);
  });
}

if (shuffleBtn) shuffleBtn.addEventListener("click", shuffleUnsolved);
if (deselectBtn) deselectBtn.addEventListener("click", deselectAll);

render();
