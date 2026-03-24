document.addEventListener("DOMContentLoaded", () => {
  const SIZE = 45;
  const STORAGE_KEY = "connections-45x45-weekly-clean-v1";
  const GROUP_COLORS = ["#f9df6d", "#a0c35a", "#b0c4ef", "#ba81c5"];

  const CATEGORY_BANK = {
    "FRUITS": ["apple","banana","orange","grape","pear","peach","plum","mango","kiwi","papaya","pineapple","strawberry","raspberry","blueberry","blackberry","melon","watermelon","coconut","lemon","lime","apricot","fig","guava","lychee","nectarine","passionfruit","pomegranate","dragon fruit","persimmon","tangerine","cranberry","date","grapefruit","mulberry","quince","starfruit","currant","boysenberry","cantaloupe","honeydew","jackfruit","kumquat","yuzu","pomelo","longan"],
    "VEGETABLES": ["carrot","broccoli","spinach","lettuce","cabbage","kale","cauliflower","celery","cucumber","zucchini","eggplant","pepper","tomato","potato","sweet potato","onion","garlic","beet","radish","turnip","parsnip","leek","shallot","okra","artichoke","asparagus","pea","green bean","corn","pumpkin","squash","yam","fennel","brussels sprouts","bok choy","chard","arugula","watercress","rutabaga","jicama","daikon","cassava","taro","edamame","collard greens"],
    "ANIMALS": ["lion","tiger","bear","wolf","fox","dog","cat","zebra","panda","horse","eagle","shark","whale","snake","frog","deer","otter","camel","goat","sheep","rabbit","owl","falcon","moose","bison","beaver","lynx","cougar","koala","lemur","rhino","hippo","gecko","iguana","salmon","trout","crab","lobster","octopus","squid","penguin","seal","dolphin","orca","buffalo"],
    "BIRDS": ["sparrow","robin","blue jay","cardinal","crow","raven","eagle bird","hawk","falcon bird","owl bird","parrot","canary","finch","woodpecker","hummingbird","pelican","seagull","albatross","flamingo","heron","stork","duck","goose","swan","turkey","peacock","ostrich","emu","kiwi bird","loon","oriole","blackbird","kingfisher","magpie","mockingbird","nightingale","phoebe","pigeon","dove","quail","wren","warbler","vulture","condor","cockatoo"],
    "COLOURS": ["red","blue","green","yellow","purple","pink","black","white","orange","brown","teal","navy","gold","silver","cyan","magenta","beige","maroon","olive","indigo","charcoal","ivory","lavender colour","turquoise colour","mustard","burgundy","mint","tan","cream","scarlet","crimson","amber colour","bronze","lilac","periwinkle","sage","coral","taupe","ochre","russet","khaki","fuchsia","aqua","jade colour","slate colour"],
    "CITIES": ["Paris","Rome","Tokyo","London","Berlin","Madrid","Vienna","Prague","Dublin","Lisbon","Oslo","Athens","Warsaw","Zurich","Helsinki","Budapest","Seoul","Bangkok","Delhi","Cairo","Montreal","Toronto","Vancouver","Ottawa","Chicago","Boston","Miami","Seattle","Sydney","Melbourne","Auckland","Brussels","Munich","Hamburg","Florence","Naples","Kyoto","Busan","Lima","Santiago","Bogota","Reykjavik","Doha","Dubai","Marrakesh"],
    "COUNTRIES": ["Canada","United States","Mexico","Brazil","Argentina","Chile","Peru","Colombia","France","Germany","Spain","Italy","Portugal","Netherlands","Belgium","Switzerland","Austria","Poland","Sweden","Norway","Finland","Denmark","Ireland","United Kingdom","Iceland","Greece","Turkey","Egypt","Morocco","South Africa","India","China","Japan","South Korea","Thailand","Vietnam","Indonesia","Philippines","Australia","New Zealand","Nigeria","Kenya","Ethiopia","Saudi Arabia","Qatar"],
    "ACTORS": ["Zendaya","Tom Holland","Scarlett Johansson","Anne Hathaway","Margot Robbie","Robert De Niro","Johnny Depp","Meryl Streep","Leonardo DiCaprio","Chris Evans","Emma Stone","Ryan Gosling","Julia Roberts","Denzel Washington","Sandra Bullock","Brad Pitt","Natalie Portman","Cillian Murphy","Paul Rudd","Keanu Reeves","Viola Davis","Jennifer Lawrence","Matt Damon","George Clooney","Nicole Kidman","Cate Blanchett","Pedro Pascal","Ayo Edebiri","Dev Patel","Daniel Kaluuya","Florence Pugh","Kerry Washington","Angela Bassett","Jeff Goldblum","Winona Ryder","Sigourney Weaver","Oscar Isaac","Adam Driver","Rachel McAdams","Ethan Hawke","Jodie Foster","Amy Adams","Jenna Ortega","Millie Bobby Brown","Saoirse Ronan"],
    "SINGERS": ["Taylor Swift","Ariana Grande","Cher","Miley Cyrus","Olivia Rodrigo","Sabrina Carpenter","Drake","Billie Eilish","Elvis Presley","Aretha Franklin","Dua Lipa","Adele","Rihanna","Beyonce","Bruno Mars","Shania Twain","Celine Dion","Katy Perry","Justin Bieber","The Weeknd","Harry Styles","Sheryl Crow","Mariah Carey","Whitney Houston","Britney Spears","Christina Aguilera","Lorde","Sia","Hozier","Ed Sheeran","Sam Smith","Shawn Mendes","Kelly Clarkson","Pink","Tina Turner","Dolly Parton","Carly Rae Jepsen","Nelly Furtado","Janet Jackson","Alicia Keys","Usher","Janelle Monae","Lana Del Rey","Kesha","Megan Thee Stallion"],
    "MOVIE TITLES": ["Inception","Interstellar","Titanic film","Barbie film","Jaws","Frozen","Rocky","Skyfall","Cars","Elf","Shrek","Moana","Gladiator","Arrival","Whiplash","Coco","Soul","The Matrix","Grease","Chicago film","Parasite","Her","Gravity","Drive","Dune","Brooklyn","Spotlight","Juno","Selma","Hook","Bambi","Tangled","Up","Speed film","Twister","Hitch","Clueless film","Scream film","Memento","Braveheart","Love Actually","Casablanca","Psycho","Nope","Lincoln"],
    "SONG TITLES": ["Firework","Imagine","Halo","Toxic","Royals","Happy song","Umbrella","Grenade","Sorry","Believer","Dreams","Waterfalls","Chandelier","Hero","Vogue","Call Me Maybe","Bad Guy","Hello","Formation","Applause","Ironic","Zombie","Valerie","Respect","Irreplaceable","Photograph","Clocks","Riptide","Torn","Bleeding Love","No Scrubs","Watermelon Sugar","Stay song","Yellow song","Poker Face","Levitating","Single Ladies","Shivers","Vampire","Rolling in the Deep","Complicated","Genie in a Bottle","Tik Tok song","Style song","Blank Space"],
    "BOOKS": ["1984","Dune novel","Beloved","Jane Eyre","Hamlet","Macbeth","Frankenstein","Dracula","Emma novel","Rebecca novel","It novel","Carrie","Matilda book","Holes","Coraline","Persuasion","Ulysses","Lolita","Room novel","Normal People","Little Women","Anne of Green Gables","Pride and Prejudice","Sense and Sensibility","The Odyssey","The Iliad","The Great Gatsby","The Bell Jar","The Handmaid's Tale","The Road","The Kite Runner","The Secret History","Atonement","The Goldfinch","Cloud Atlas","Station Eleven","Never Let Me Go","The Book Thief","The Giver","Charlotte's Web","The Hobbit","The Fellowship of the Ring","The Two Towers","The Return of the King","To Kill a Mockingbird"],
    "TV SHOWS": ["Friends","Seinfeld","The Office","Parks and Recreation","Breaking Bad","Better Call Saul","Mad Men","Succession","The Sopranos","The Wire","Lost","Grey's Anatomy","The Bear","The Crown","Bridgerton","The Last of Us","Stranger Things","The Simpsons","Frasier","Modern Family","Abbott Elementary","Yellowjackets","Twin Peaks","Sherlock","House","The X-Files","Buffy the Vampire Slayer","Gossip Girl","Gilmore Girls","One Tree Hill","The OC","Euphoria","Fleabag","Ted Lasso","Brooklyn Nine-Nine","Community","30 Rock","Arrested Development","Veep","Westworld","The Good Place","Friday Night Lights","Downton Abbey","Killing Eve","Big Little Lies"],
    "TECH BRANDS": ["Apple","Samsung","Google","Microsoft","Amazon","Meta","Sony","LG","Intel","AMD","Nvidia","Dell","HP","Lenovo","Asus","Acer","Huawei","Xiaomi","OnePlus","Oppo","Vivo","Tesla","IBM","Oracle","Cisco","Adobe","Spotify company","Netflix company","Uber company","Airbnb company","PayPal","Shopify","Slack","Zoom","Dropbox","eBay","Pinterest company","Snapchat","TikTok company","Reddit","Discord","Twitch","Square","Stripe","Canva"],
    "SPORTS": ["soccer","basketball","baseball","hockey","tennis","golf","rugby","cricket","boxing","swimming","running","cycling","skiing","snowboarding","volleyball","badminton","surfing","rowing","wrestling","archery","skateboarding","lacrosse","curling","water polo","fencing","gymnastics","triathlon","marathon","handball","softball","squash","table tennis","figure skating","speed skating","kayaking","canoeing","diving","judo","karate","taekwondo","sailing","bobsled","luge","biathlon","climbing"]
  };

  function displayWord(word) {
    return word
      .replace(/\s+(film|song|novel|app|platform|service|company|book)$/i, "")
      .replace(/\s+\[.*?\]$/, "")
      .trim();
  }

  function weekStartDate() {
    const d = new Date();
    const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = local.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    local.setDate(local.getDate() + diff);
    local.setHours(0, 0, 0, 0);
    return local;
  }

  function weekKey() {
    const d = weekStartDate();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  }

  function formatLongDate(k) {
    const y = Number(k.slice(0, 4));
    const m = Number(k.slice(4, 6)) - 1;
    const d = Number(k.slice(6, 8));
    return new Date(y, m, d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  function rand(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function seedNumber(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  function shuffle(arr, seed) {
    const copy = [...arr];
    let s = seed;
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand(s++) * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function createWeeklyCategories(dateKey) {
    const entries = Object.entries(CATEGORY_BANK);
    const chosen = shuffle(entries, seedNumber(dateKey) + 71).slice(0, SIZE);

    const categories = chosen.map(([name, words], idx) => {
      const unique = [...new Set(words)];
      if (unique.length < SIZE) {
        throw new Error(`${name} must contain at least 45 tiles.`);
      }
      return {
        name,
        words: shuffle(unique, seedNumber(dateKey) + idx * 101).slice(0, SIZE)
      };
    });

    const seen = new Set();

    categories.forEach(cat => {
      cat.words = cat.words.map(word => {
        if (!seen.has(word)) {
          seen.add(word);
          return word;
        }
        const marked = `${word} [${cat.name.toLowerCase().split(" ").slice(0, 2).join(" ")}]`;
        if (seen.has(marked)) {
          throw new Error("Duplicate after qualifier.");
        }
        seen.add(marked);
        return marked;
      });
    });

    return categories;
  }

  function buildFreshState() {
    const dateKey = weekKey();
    const categories = createWeeklyCategories(dateKey);
    const tiles = [];
    const lookup = {};

    categories.forEach((cat, idx) => {
      cat.words.forEach(word => {
        tiles.push(word);
        lookup[word] = { name: cat.name, color: GROUP_COLORS[idx % GROUP_COLORS.length] };
      });
    });

    return {
      dateKey,
      lookup,
      groups: shuffle(tiles, seedNumber(dateKey) + 999).map(word => ({
        words: [word],
        solved: false,
        category: null,
        color: null
      })),
      selectedIndex: null,
      mistakes: 0
    };
  }

  function validSaved(saved, fresh) {
    if (!saved || saved.dateKey !== fresh.dateKey || !Array.isArray(saved.groups)) {
      return false;
    }

    const words = saved.groups.flatMap(g => g.words || []);
    if (words.length !== SIZE * SIZE) {
      return false;
    }

    const uniq = new Set(words);
    if (uniq.size !== SIZE * SIZE) {
      return false;
    }

    const valid = new Set(Object.keys(fresh.lookup));
    for (const w of uniq) {
      if (!valid.has(w)) {
        return false;
      }
    }

    return true;
  }

  function loadState() {
    const fresh = buildFreshState();

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return fresh;
      }

      const saved = JSON.parse(raw);
      if (!validSaved(saved, fresh)) {
        localStorage.removeItem(STORAGE_KEY);
        return fresh;
      }

      return {
        dateKey: fresh.dateKey,
        lookup: fresh.lookup,
        groups: saved.groups,
        selectedIndex: null,
        mistakes: Number.isFinite(saved.mistakes) ? saved.mistakes : 0
      };
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return fresh;
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dateKey: state.dateKey,
      groups: state.groups,
      mistakes: state.mistakes
    }));
  }

  function preview(group) {
    const shown = group.words.map(displayWord);
    const firstTwo = shown.slice(0, 2).join(", ");
    return shown.length >= 3 ? `${firstTwo}, ... [${shown.length}]` : firstTwo;
  }

  function categoryForWords(words) {
    const first = state.lookup[words[0]];
    if (!first) {
      return null;
    }
    for (const w of words) {
      const info = state.lookup[w];
      if (!info || info.name !== first.name) {
        return null;
      }
    }
    return first;
  }

  function shakeIndex(i) {
    const tile = board.children[i];
    if (tile) {
      tile.classList.add("shake");
      setTimeout(() => tile.classList.remove("shake"), 280);
    }
  }

  function rejectMerge(i) {
    state.mistakes += 1;
    requestAnimationFrame(() => shakeIndex(i));
  }

  function mergeIntoSecond(a, b) {
    const mergedWords = [...state.groups[a].words, ...state.groups[b].words];
    const category = categoryForWords(mergedWords);

    if (!category) {
      rejectMerge(b);
      return;
    }

    const merged = {
      words: mergedWords,
      solved: false,
      category: null,
      color: null
    };

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
      if (!g.solved) {
        unsolvedIdx.push(i);
        unsolvedGroups.push(g);
      }
    });

    const shuffled = shuffle(unsolvedGroups, seed);
    unsolvedIdx.forEach((idx, i) => {
      state.groups[idx] = shuffled[i];
    });
  }

  function handleClick(i) {
    const g = state.groups[i];
    if (!g || g.solved) {
      return;
    }

    if (state.selectedIndex === null) {
      state.selectedIndex = i;
      render();
      return;
    }

    if (state.selectedIndex === i) {
      state.selectedIndex = null;
      render();
      return;
    }

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
        if (state.selectedIndex === i) {
          tile.classList.add("selected");
        }
        if (g.words.length >= 3) {
          tile.classList.add("hoverable");
        }
      }

      const label = document.createElement("div");
      label.textContent = g.solved ? (g.category || "") : preview(g);
      tile.appendChild(label);

      if (g.solved || g.words.length >= 3) {
        const hover = document.createElement("div");
        hover.className = "hover-content";
        hover.textContent = g.words.map(displayWord).join(", ");
        tile.appendChild(hover);
      }

      if (!g.solved) {
        tile.addEventListener("click", () => handleClick(i));
      }

      board.appendChild(tile);
    });
  }

  shuffleBtn.addEventListener("click", () => {
    shuffleUnsolvedInPlace();
    state.selectedIndex = null;
    saveState();
    render();
  });

  deselectBtn.addEventListener("click", () => {
    state.selectedIndex = null;
    render();
  });

  render();
});
