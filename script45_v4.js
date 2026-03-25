
document.addEventListener("DOMContentLoaded", () => {
  const SIZE = 45;
  const STORAGE_KEY = "connections-45x45-autogen-v4";
  const GROUP_COLORS = ["#f9df6d", "#a0c35a", "#b0c4ef", "#ba81c5"];

  const DIRECT_BANKS = {
    "FRUITS": ["apple","banana","orange","grape","pear","peach","plum","mango","kiwi","papaya","pineapple","strawberry","raspberry","blueberry","blackberry","melon","watermelon","coconut","lemon","lime"],
    "COLOURS": ["red","blue","green","yellow","purple","pink","black","white","orange colour","brown","teal","navy","gold colour","silver colour","cyan","magenta","beige","maroon","olive","indigo"],
    "CITIES": ["Paris","Rome","Tokyo","London","Berlin","Madrid","Vienna","Prague","Dublin","Lisbon","Oslo","Athens","Warsaw","Zurich","Helsinki","Budapest","Seoul","Bangkok","Delhi","Cairo"],
    "SINGERS": ["Taylor Swift","Ariana Grande","Cher","Miley Cyrus","Olivia Rodrigo","Sabrina Carpenter","Drake","Billie Eilish","Elvis Presley","Aretha Franklin","Dua Lipa","Adele","Rihanna","Beyonce","Bruno Mars","Shania Twain","Celine Dion","Katy Perry","Justin Bieber","The Weeknd"],
    "ACTORS": ["Zendaya","Tom Holland","Scarlett Johansson","Anne Hathaway","Margot Robbie","Robert De Niro","Johnny Depp","Meryl Streep","Leonardo DiCaprio","Chris Evans","Emma Stone","Ryan Gosling","Julia Roberts","Denzel Washington","Sandra Bullock","Brad Pitt","Natalie Portman","Cillian Murphy","Paul Rudd","Keanu Reeves"],
    "ANIMALS": ["lion","tiger","bear","wolf","fox","dog","cat","zebra","panda","horse","eagle","shark","whale","snake","frog","deer","otter","camel","goat","sheep"],
    "DESSERTS": ["cake","pie","cookie","brownie","muffin","donut","croissant pastry","tart","pudding","ice cream","sundae","sorbet","cheesecake","macaron","eclair","cannoli","fudge","truffle","cupcake","parfait"],
    "BREAKFAST FOODS": ["toast","bagel","pancakes","waffles","omelette","bacon","sausage","cereal","granola","yogurt","hash browns","oatmeal","breakfast muffin","croissant","fruit cup","smoothie","fried eggs","home fries","jam","butter"],
    "PHONE APPS": ["Instagram","TikTok app","YouTube app","Spotify app","Uber app","Google Maps","Notes app","Calendar app","Photos app","Camera app","Gmail app","WhatsApp","Messenger app","Zoom app","Netflix app","Weather app","Clock app","Reminders","Discord app","Pinterest app"],
    "AT THE OFFICE": ["stapler","printer","shredder","laptop","monitor","headset","keyboard","computer mouse","paper","binder","clipboard","eraser","marker","notebook","scanner","calendar planner","desk","office chair","folder","pen"],
    "THINGS IN A KITCHEN": ["fork","knife","spoon","plate","bowl","mug","toaster","fridge","freezer","oven","pan","pot","whisk","ladle","foil","napkin","tray","sink","kettle","colander"],
    "THINGS IN A BATHROOM": ["toothbrush","toothpaste","soap","towel","mirror","shampoo","conditioner","razor","mouthwash","toilet paper","plunger","hairbrush","comb","bath mat","sink basin","bathtub","scale","lotion","tissue","medicine cabinet"],
    "JOBS": ["doctor","teacher","pilot","chef","lawyer","artist","nurse","driver","engineer","farmer","stage actor","novelist","plumber","carpenter","dentist","designer","analyst","manager","clerk","mechanic"],
    "MOVIE TITLES": ["Inception","Interstellar","Wicked film","Love Actually","Clueless film","Titanic film","Barbie film","Jaws","Frozen","Scream film","Twister","Speed film","Rocky","Memento","Skyfall","Up","Cars","Braveheart","Hitch","Elf"],
    "SONG TITLES": ["Firework","Vampire","Imagine","Halo","Toxic","Bad Romance","Royals","Shivers","Happy song","Poker Face","Single Ladies","Levitating","Umbrella","Grenade","Stay song","Yellow song","Sorry","Believer","Dreams","Waterfalls"],
    "THINGS AT THE BEACH": ["sunscreen","beach towel","beach umbrella","sandals","bucket","shovel","cooler","flip flops","sunglasses","swimsuit","lawn chair","picnic blanket","beach ball","seashell","surfboard","floatie","snorkel","paddle","sandcastle","beach bag"],
    "COMMON PASSWORD WORDS": ["password","qwerty","welcome","dragon","football","monkey","sunshine","master","shadow","freedom","hello","login","starwars","princess","flower","summer","whatever","cheese","abc123","iloveyou"],
    "BOOKS": ["1984","Dune novel","Beloved","Jane Eyre","Hamlet","Macbeth","Frankenstein","Dracula","Emma novel","Rebecca novel","It novel","Carrie","Matilda book","Holes","Coraline","Persuasion","Ulysses","Lolita","Room novel","Normal People"],

    "SPORTS TEAMS": ["Toronto Maple Leafs","Montreal Canadiens","Boston Bruins","New York Rangers","Chicago Blackhawks","Los Angeles Lakers","Golden State Warriors","Chicago Bulls","Miami Heat","Boston Celtics","New York Yankees","Los Angeles Dodgers","Toronto Blue Jays","Atlanta Braves","Houston Astros","Dallas Cowboys","Green Bay Packers","New England Patriots","Kansas City Chiefs","San Francisco 49ers","Buffalo Bills","Philadelphia Eagles","Pittsburgh Steelers","Baltimore Ravens","Detroit Red Wings","Vancouver Canucks","Edmonton Oilers","Calgary Flames","Tampa Bay Lightning","Vegas Golden Knights","Chicago Cubs","Boston Red Sox","Seattle Mariners","Texas Rangers","Milwaukee Bucks","Denver Nuggets","Phoenix Suns","Toronto Raptors","Cleveland Cavaliers","Arsenal","Chelsea","Liverpool","Manchester United","Real Madrid","Barcelona"],
    "STREAMING SERVICES": ["Netflix","Amazon Prime Video","Disney+","Hulu","Apple TV+","Paramount+","Peacock","Crave","YouTube","Twitch","Spotify","SoundCloud","Audible","Deezer","Pandora","BBC iPlayer","NOW","Shudder","Mubi","Discovery+","Max","Starz","Hayu","BritBox","Acorn TV","DAZN","Crunchyroll","Funimation","Roku Channel","Pluto TV","Tubi","Kanopy","CBC Gem","CTV","Global TV","Sling TV","Fubo","Philo","Qobuz","Apple Music","YouTube Music","iHeartRadio","SiriusXM","MLB TV","NBA League Pass"],
    "SOCIAL MEDIA PLATFORMS": ["Facebook","Instagram","Twitter","TikTok","Snapchat","Reddit","Pinterest","LinkedIn","Tumblr","Threads","WeChat","WhatsApp","Discord","Telegram","Signal","BeReal","Clubhouse","Mastodon","VK","Weibo","LINE","KakaoTalk","YouTube","Twitch","Quora","Medium","Substack","Patreon","Vimeo","Flickr","DeviantArt","Behance","Dribbble","Nextdoor","Meetup","Letterboxd","Goodreads","Bandcamp","SoundCloud","Bluesky","Plurk","Xing","Mix","Vero","Douyin"],
    "FLOWERS": ["rose","tulip","daisy","lily","orchid","sunflower","peony","daffodil","marigold","lavender","iris","hibiscus","jasmine","lotus","chrysanthemum","carnation","bluebell","gardenia","poppy","snapdragon"],
    "CAR BRANDS": ["Toyota","Honda","Ford","Chevrolet","BMW","Mercedes-Benz","Audi","Volkswagen","Hyundai","Kia","Nissan","Mazda","Subaru","Volvo","Tesla","Jeep","Dodge","Lexus","Porsche","Ferrari"],
    "AIRLINES": ["Air Canada","Delta","United","American Airlines","Southwest","Lufthansa","Emirates","Qatar Airways","British Airways","Air France","KLM","Singapore Airlines","Cathay Pacific","ANA","Japan Airlines","Turkish Airlines","Etihad","Alaska Airlines","JetBlue","Ryanair"],
    "BOARD GAMES": ["Monopoly","Scrabble","Clue","Risk","Catan","Ticket to Ride","Battleship","Chess","Checkers","Sorry","Connect Four","Candy Land","Operation","Guess Who","Trouble","Life","Uno","Yahtzee","Dominoes","Backgammon"],
    "VIDEO GAMES": ["Minecraft","Fortnite","Call of Duty","Grand Theft Auto","The Sims","Animal Crossing","The Legend of Zelda","Super Mario Bros","Pokemon","Tetris","Overwatch","Halo","FIFA","NBA 2K","Elden Ring","Dark Souls","Skyrim","Red Dead Redemption","Among Us","Roblox"],
    "MAKEUP BRANDS": ["Fenty Beauty","MAC","Sephora","Maybelline","L'Oreal","Revlon","NARS","Urban Decay","Too Faced","Charlotte Tilbury","Dior Beauty","Chanel Beauty","Benefit","Rare Beauty","Glossier","Huda Beauty","Pat McGrath Labs","Milk Makeup","CoverGirl","e.l.f."],
    "SHOE BRANDS": ["Nike","Adidas","Puma","Reebok","Converse","Vans","New Balance","Asics","Under Armour","Skechers","Dr. Martens","Timberland","Crocs","Birkenstock","Gucci","Prada","Balenciaga","Jimmy Choo","Christian Louboutin","Salomon"],
    "CHAIN RESTAURANTS": ["McDonald's","Burger King","Wendy's","Subway","KFC","Taco Bell","Domino's","Pizza Hut","Chipotle","Five Guys","Olive Garden","Red Lobster","Outback Steakhouse","Applebee's","Chili's","IHOP","Denny's","Panera Bread","Shake Shack","Nando's"],
    "TYPES OF BREAD": ["white bread","whole wheat","sourdough","rye","pumpernickel","baguette","ciabatta","focaccia","naan","pita","flatbread","brioche","cornbread","multigrain","bagel","pretzel bread","lavash","matzo","tortilla","english muffin"],
    "TYPES OF HATS": ["baseball cap","beanie","fedora","beret","cowboy hat","bucket hat","top hat","sombrero","boater","newsboy cap","trilby","snapback","visor","balaclava","cloche","bowler hat","sun hat","helmet","hard hat","turban"],
    "TYPES OF DRINKS": ["water","juice","soda","coffee","tea","milk","smoothie","milkshake","lemonade","iced tea","hot chocolate","energy drink","sports drink","kombucha","sparkling water","cider","beer","wine","cocktail","mocktail"],
    "TYPES OF CHEESE": ["cheddar","mozzarella","parmesan","brie","camembert","gouda","swiss","feta","blue cheese","goat cheese","provolone","ricotta","halloumi","gruyere","asiago","pecorino","colby","monterey jack","havarti","fontina"],
    "KITCHEN TOOLS": ["knife","fork","spoon","whisk","ladle","spatula","tongs","peeler","grater","colander","rolling pin","measuring cup","cutting board","can opener","bottle opener","mixing bowl","baking tray","skillet","saucepan","kettle"],
    "OLYMPIC SPORTS": ["swimming","athletics","gymnastics","cycling","rowing","canoeing","fencing","judo","boxing","wrestling","weightlifting","shooting","archery","badminton","table tennis","tennis","golf","triathlon","sailing","equestrian"]
  };

  const PHRASE_BANKS = {
    "WORDS WITH APPLE": ["apple pie","apple juice","apple cider","apple watch","apple store","apple core","apple seed","apple tart","apple sauce","apple jam","apple peel","apple orchard","apple crisp","apple slice","apple cake","apple skin","apple pulp","apple snack","apple bite","apple tree"],
    "WORDS WITH BREAK": ["break down","break up","break in","break out","break even","break free","break away","break point","break news","break habit","break silence","break code","break lock","break record","break chain","break rank","break stride","break time","break line","break rule"],
    "WORDS WITH LIGHT": ["light bulb","light switch","light year","light house","light show","light rail","light beam","light post","light box","light meter","light ring","light source","light shade","light touch","light line","light path","light table","light wave","light signal","light screen"],
    "WORDS WITH MOON": ["moonlight","moonbeam","moonstone","moonwalk","moonshine","moonrise","moonfall","moonshadow","moonglow","moon river","moon dust","moon rock","moon phase","moon roof","moon cake","moon jar","moon gate","moon garden","moon pool","moon flower"],
    "WORDS WITH WATER": ["water bottle","water park","waterfall","water line","water table","water tank","water pump","water meter","water tower","water pipe","water glass","water heater","water hose","water filter","water cooler","water bed","water jet","water system","water feature","water basin"],
    "WORDS WITH STAR": ["starfish","stardust","starlight","starboard","starburst","star player","star power","star chart","star sign","star turn","star pupil","star quality","star trail","star fruit","star map","star field","star point","star cluster","star system","star rating"],
    "WORDS WITH FIRE": ["fire truck","fire drill","fire alarm","fire station","fire escape","fire pit","fire hydrant","fire door","fire engine","fire extinguisher","fire code","fire lane","fire wall","fire place","fire ball","fire fly","firewood","firestorm","firelight","fireproof"],
    "WORDS WITH HAND": ["hand bag","hand towel","hand rail","hand brake","hand wash","hand cream","hand signal","hand tool","hand luggage","hand written","hand picked","hand made","hand shake","hand bell","hand drill","hand mirror","hand soap","hand dryer","hand mixer","hand held"],
    "WORDS WITH HEART": ["heart rate","heart attack","heart beat","heart break","heart burn","heart throb","heart line","heart shape","heart valve","heart monitor","heart stone","heart emoji","heart transplant","heart disease","heart murmur","heart rhythm","heart surgery","heart patient","heart centre","heart failure"],
    "WORDS WITH HOUSE": ["house plant","house party","house guest","house wine","house cat","house band","house key","house rule","house boat","house coat","house fly","house lights","house music","house sitter","house work","house arrest","house warming","house blend","house style","house call"],
    "WORDS WITH BLUE": ["blue moon","blue bird","blue jeans","blue sky","blue whale","blue jay","blue print","blue screen","blue light","blue ribbon","blue collar","blue blood","blue berry","blue book","blue line","blue chip","blue grass","blue water","blue note","blue stone"],
    "WORDS WITH GREEN": ["green light","green room","green house","green tea","green thumb","green card","green bean","green screen","green belt","green onion","green flag","green space","green energy","green roof","green salad","green apple","green line","green fee","green day","green wood"]
  };

  const board = document.getElementById("board");
  const mistakesEl = document.getElementById("mistakes");
  const dateEl = document.getElementById("puzzleDate");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const deselectBtn = document.getElementById("deselectBtn");

  function normalizeSourceWord(word) {
    return String(word).replace(/\s+\[.*?\]$/, "").replace(/\s+(film|song|novel|app|platform|service|company|book|chain|colour)$/i, "").trim();
  }

  function displayWord(word) {
    return normalizeSourceWord(word);
  }

  function buildCategoryPool() {
    return { ...DIRECT_BANKS, ...PHRASE_BANKS };
  }

  function seedForToday() {
    const d = new Date();
    const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return `${local.getFullYear()}${String(local.getMonth() + 1).padStart(2, "0")}${String(local.getDate()).padStart(2, "0")}`;
  }

  function formatLongDate(k) {
    const y = Number(k.slice(0, 4));
    const m = Number(k.slice(4, 6)) - 1;
    const d = Number(k.slice(6, 8));
    return new Date(y, m, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function seedNumber(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function rand(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
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

  function buildFreshState() {
    const dateKey = seedForToday();
    const seed = seedNumber(dateKey);
    const entries = Object.entries(buildCategoryPool());
    if (entries.length < SIZE) throw new Error(`Need at least ${SIZE} categories, found ${entries.length}.`);

    const chosen = shuffle(entries, seed).slice(0, SIZE);
    const categories = chosen.map(([name, words], idx) => {
      const cleaned = words.map(normalizeSourceWord);
      const unique = [...new Set(cleaned)];
      if (unique.length < SIZE) throw new Error(`${name} needs at least ${SIZE} unique entries after cleanup.`);
      return { name, words: shuffle(unique, seed + idx).slice(0, SIZE) };
    });

    const seen = new Set();
    const lookup = {};
    const tiles = [];

    categories.forEach((cat, idx) => {
      cat.words.forEach(word => {
        let w = word;
        if (seen.has(w)) w = `${w} [${cat.name}]`;
        seen.add(w);
        lookup[w] = { name: cat.name, color: GROUP_COLORS[idx % GROUP_COLORS.length] };
        tiles.push(w);
      });
    });

    return {
      dateKey,
      lookup,
      groups: shuffle(tiles, seed + 999).map(word => ({ words: [word], solved: false, category: null, color: null })),
      selectedIndex: null,
      mistakes: 0
    };
  }

  function validSaved(saved, fresh) {
    if (!saved || saved.dateKey !== fresh.dateKey || !Array.isArray(saved.groups)) return false;
    const words = saved.groups.flatMap(g => g.words || []);
    const validWords = Object.keys(fresh.lookup);
    if (words.length !== validWords.length || new Set(words).size !== validWords.length) return false;
    const validSet = new Set(validWords);
    return words.every(w => validSet.has(w));
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
      return { dateKey: fresh.dateKey, lookup: fresh.lookup, groups: saved.groups, selectedIndex: null, mistakes: Number.isFinite(saved.mistakes) ? saved.mistakes : 0 };
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return fresh;
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dateKey: state.dateKey, groups: state.groups, mistakes: state.mistakes }));
  }

  function preview(group) {
    const shown = group.words.map(displayWord);
    const firstTwo = shown.slice(0, 2).join(", ");
    return shown.length >= 3 ? `${firstTwo}, ... [${shown.length}]` : firstTwo;
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

  function mergeIntoSecond(a, b) {
    const mergedWords = [...state.groups[a].words, ...state.groups[b].words];
    const category = categoryForWords(mergedWords);
    if (!category) {
      state.mistakes += 1;
      return;
    }

    const merged = { words: mergedWords, solved: false, category: null, color: null };
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

  function handleClick(i) {
    const g = state.groups[i];
    if (!g || g.solved) return;
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

  function render() {
    if (!board || !mistakesEl || !dateEl) return;
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
        hover.textContent = g.words.map(displayWord).join(", ");
        tile.appendChild(hover);
      }

      if (!g.solved) tile.addEventListener("click", () => handleClick(i));
      board.appendChild(tile);
    });
  }

  shuffleBtn?.addEventListener("click", () => {
    shuffleUnsolvedInPlace();
    state.selectedIndex = null;
    saveState();
    render();
  });

  deselectBtn?.addEventListener("click", () => {
    state.selectedIndex = null;
    render();
  });

  render();
});
