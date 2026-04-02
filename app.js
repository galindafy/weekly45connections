document.addEventListener("DOMContentLoaded", () => {
  const BOARD_SIZE = 45;
  const GROUP_SIZE = 45;

  const STORAGE_KEY = getWeekKey();

  let state = {
    tiles: [],
    selected: [],
  };

  const CATEGORY_BANK = buildCategoryBank();

  init();

  function init() {
    const saved = load();
    if (saved && isValidState(saved)) {
      state = saved;
      render();
      return;
    }

    newWeeklyBoard();
    save();
    render();
  }

  function newWeeklyBoard() {
    const weeklyCategories = buildWeeklyCategories();
    const tiles = [];

    weeklyCategories.forEach((category, groupIndex) => {
      category.items.forEach((item) => {
        tiles.push({
          id: makeId(),
          text: item,
          items: [item],
          group: groupIndex,
          locked: false,
        });
      });
    });

    state.tiles = shuffle(tiles, seededRandom(getWeekSeed() + 101));
    state.selected = [];
  }

  function buildWeeklyCategories() {
    const seed = getWeekSeed();
    const rng = seededRandom(seed);

    const shuffled = shuffle([...CATEGORY_BANK], rng);
    const chosen = [];
    const usedTexts = new Set();
    const usedSlugs = new Set();

    for (const cat of shuffled) {
      if (chosen.length === BOARD_SIZE) break;
      if (usedSlugs.has(cat.slug)) continue;
      if (!categoryHasNoBoardConflicts(cat, usedTexts)) continue;

      chosen.push(cat);
      usedSlugs.add(cat.slug);
      cat.items.forEach((item) => usedTexts.add(item));
    }

    if (chosen.length < BOARD_SIZE) {
      throw new Error("Not enough clean categories to build a weekly board.");
    }

    return chosen;
  }

  function categoryHasNoBoardConflicts(category, usedTexts) {
    for (const item of category.items) {
      if (usedTexts.has(item)) return false;
    }
    return true;
  }

  function handleClick(id) {
    const idx = state.tiles.findIndex((t) => t.id === id);
    if (idx === -1) return;

    const tile = state.tiles[idx];
    if (!tile || tile.locked) return;

    if (state.selected.length === 0) {
      state.selected = [idx];
      save();
      render();
      return;
    }

    const firstIdx = state.selected[0];

    if (firstIdx === idx) {
      state.selected = [];
      save();
      render();
      return;
    }

    const firstTile = state.tiles[firstIdx];
    if (!firstTile) {
      state.selected = [];
      save();
      render();
      return;
    }

    if (firstTile.group !== tile.group) {
      const shakeIds = [firstTile.id, tile.id];
      state.selected = [];
      render(shakeIds);
      setTimeout(() => render(), 320);
      return;
    }

    mergeTiles(firstIdx, idx);
    state.selected = [];
    save();
    render();
  }

  function mergeTiles(i1, i2) {
    if (i1 === i2) return;

    const t1 = state.tiles[i1];
    const t2 = state.tiles[i2];
    if (!t1 || !t2) return;
    if (t1.group !== t2.group) return;
    if (t1.locked || t2.locked) return;

    const mergedItems = uniquePreserveOrder([...t1.items, ...t2.items]);
    const mergedTile = {
      ...t2,
      items: mergedItems,
      text: formatPreview(mergedItems),
      locked: mergedItems.length === GROUP_SIZE,
    };

    state.tiles[i2] = mergedTile;
    state.tiles.splice(i1, 1);

    if (mergedTile.locked) {
      moveSolvedGroupToTop(mergedTile.group);
    }
  }

  function moveSolvedGroupToTop(group) {
    const groupTiles = state.tiles.filter((t) => t.group === group);
    const others = state.tiles.filter((t) => t.group !== group);
    state.tiles = [...groupTiles, ...others];
  }

  function formatPreview(items) {
    if (items.length <= 2) {
      return items.join(", ");
    }
    return `${items[0]}, ${items[1]}, ... [${items.length}]`;
  }

  function render(shakeIds = []) {
    const board = document.querySelector(".board");
    if (!board) return;

    board.innerHTML = "";

    state.tiles.forEach((tile, idx) => {
      const div = document.createElement("div");
      div.className = "tile";

      if (tile.items.length === 1) {
        div.classList.add("single");
      } else {
        div.classList.add("merged");
      }

      if (tile.locked) {
        div.classList.add("solved-tile");
        div.style.background = getSolvedColor(tile.group);
      }

      if (state.selected.includes(idx)) {
        div.classList.add("selected");
      }

      if (shakeIds.includes(tile.id)) {
        div.classList.add("shake");
      }

      div.textContent = tile.text;

      if (tile.items.length > 2) {
        div.classList.add("hoverable");
        const hover = document.createElement("div");
        hover.className = "hover-content";
        hover.textContent = tile.items.join(", ");
        div.appendChild(hover);
      }

      div.addEventListener("click", () => handleClick(tile.id));
      board.appendChild(div);
    });
  }

  function getSolvedColor(group) {
    const colors = [
      "var(--yellow)",
      "var(--green)",
      "var(--blue)",
      "var(--purple)",
    ];
    return colors[group % colors.length];
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function isValidState(value) {
    return (
      value &&
      Array.isArray(value.tiles) &&
      Array.isArray(value.selected) &&
      value.tiles.every(
        (t) =>
          t &&
          typeof t.id === "string" &&
          typeof t.text === "string" &&
          typeof t.group === "number" &&
          Array.isArray(t.items)
      )
    );
  }

  function getWeekSeed() {
    const d = new Date();
    const start = new Date(Date.UTC(d.getFullYear(), 0, 1));
    const now = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = Math.floor((now - start) / 86400000) + 1;
    const week = Math.ceil(dayNum / 7);
    return d.getFullYear() * 100 + week;
  }

  function getWeekKey() {
    const d = new Date();
    const start = new Date(Date.UTC(d.getFullYear(), 0, 1));
    const now = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = Math.floor((now - start) / 86400000) + 1;
    const week = Math.ceil(dayNum / 7);
    return `connections_weekly_45x45_${d.getFullYear()}_${week}`;
  }

  function makeId() {
    if (window.crypto && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  function uniquePreserveOrder(arr) {
    const seen = new Set();
    const out = [];
    for (const item of arr) {
      if (!seen.has(item)) {
        seen.add(item);
        out.push(item);
      }
    }
    return out;
  }

  function shuffle(arr, rng = Math.random) {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function seededRandom(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function makeCategory(slug, items) {
    const clean = items.map((x) => x.trim());
    const unique = [...new Set(clean)];
    if (unique.length !== GROUP_SIZE) {
      throw new Error(`${slug} does not have exactly ${GROUP_SIZE} unique items.`);
    }
    return { slug, items: unique };
  }

  function buildCategoryBank() {
    return [
      makeCategory("pasta-types", [
        "spaghetti","penne","rigatoni","fusilli","farfalle","linguine","fettuccine",
        "ravioli","tortellini","gnocchi","ziti","macaroni","cavatappi","rotini",
        "bucatini","orecchiette","pappardelle","lasagna","tagliatelle","vermicelli",
        "angel hair","ditalini","manicotti","capellini","gemelli","mafaldine",
        "radiatori","campanelle","strozzapreti","paccheri","anelletti","bigoli",
        "casarecce","trofie","malloreddus","lumache","fregola","mezzi rigatoni",
        "spaghettini","cellentani","tubetti","sedani","filini","orzo","cannelloni"
      ]),
      makeCategory("spices-and-herbs", [
        "basil","oregano","thyme","rosemary","cumin","turmeric","paprika","cinnamon",
        "nutmeg","clove","cardamom","parsley","dill","sage","tarragon","sumac",
        "za'atar","bay leaf","fennel","anise","chives","mint","marjoram","caraway",
        "coriander","ginger","allspice","saffron","vanilla","sesame","mustard seed",
        "celery seed","fenugreek","star anise","lemongrass","chili powder","cayenne",
        "garlic powder","onion powder","smoked paprika","herbes de provence","lovage",
        "savory","asafoetida","nigella"
      ]),
      makeCategory("european-countries", [
        "France","Germany","Italy","Spain","Portugal","Netherlands","Belgium","Sweden",
        "Norway","Denmark","Finland","Poland","Austria","Greece","Ireland","Iceland",
        "Romania","Hungary","Croatia","Serbia","Slovakia","Slovenia","Estonia","Latvia",
        "Lithuania","Switzerland","Ukraine","Albania","Andorra","Belarus","Bosnia",
        "Bulgaria","Cyprus","Czech Republic","Luxembourg","Malta","Moldova","Montenegro",
        "North Macedonia","San Marino","Kosovo","Liechtenstein","Monaco","Turkey","Vatican City"
      ]),
      makeCategory("us-states", [
        "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
        "delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
        "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
        "minnesota","mississippi","missouri","montana","nebraska","nevada","new hampshire",
        "new jersey","new mexico","new york","north carolina","north dakota","ohio",
        "oklahoma","oregon","pennsylvania","rhode island","south carolina","south dakota",
        "tennessee","texas","utah","vermont"
      ]),
      makeCategory("us-cities", [
        "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio",
        "San Diego","Dallas","Austin","Jacksonville","Fort Worth","Columbus","Charlotte",
        "San Francisco","Indianapolis","Seattle","Denver","Boston","El Paso","Detroit",
        "Nashville","Portland","Memphis","Oklahoma City","Las Vegas","Louisville","Baltimore",
        "Milwaukee","Albuquerque","Tucson","Fresno","Sacramento","Kansas City","Mesa",
        "Atlanta","Omaha","Raleigh","Miami","Oakland","Minneapolis","Tulsa","Cleveland",
        "Wichita","Arlington"
      ]),
      makeCategory("office-things", [
        "printer","stapler","notebook","pen","pencil","monitor","keyboard","mouse","desk",
        "chair","whiteboard","calendar","folder","binder","paper clips","tape","scissors",
        "highlighter","envelope","sticky notes","scanner","phone","lamp","filing cabinet",
        "push pins","rubber bands","clipboard","hole punch","label maker","shredder",
        "desk pad","mail tray","eraser","ruler","extension cord","surge protector",
        "dry erase marker","bulletin board","ink cartridge","toner","calculator","mug",
        "paper ream","lanyard","name badge"
      ]),
      makeCategory("dog-breeds", [
        "Labrador Retriever","Golden Retriever","German Shepherd","French Bulldog",
        "Poodle","Beagle","Rottweiler","Dachshund","Siberian Husky","Boxer",
        "Doberman Pinscher","Great Dane","Shih Tzu","Chihuahua","Border Collie",
        "Australian Shepherd","Cocker Spaniel","Boston Terrier","Pug","Mastiff",
        "Saint Bernard","Bichon Frise","Akita","Samoyed","Weimaraner",
        "Newfoundland","Bernese Mountain Dog","Belgian Malinois","Greyhound","Whippet",
        "Papillon","Pomeranian","Bull Terrier","Cane Corso","Shar Pei",
        "Alaskan Malamute","Basenji","Bloodhound","Dalmatian","English Bulldog",
        "Fox Terrier","Irish Setter","Jack Russell Terrier","Vizsla","Yorkshire Terrier"
      ]),
      makeCategory("flowers", [
        "rose","tulip","daisy","lily","orchid","peony","sunflower","lavender","iris",
        "marigold","daffodil","hyacinth","poppy","camellia","gardenia","begonia","zinnia",
        "petunia","snapdragon","aster","hydrangea","chrysanthemum","violet","lotus",
        "magnolia","anemone","delphinium","foxglove","freesia","gladiolus","hibiscus",
        "hollyhock","jasmine","lilac","nasturtium","phlox","ranunculus","sweet pea",
        "verbena","wisteria","yarrow","cosmos","dahlia","geranium","bluebell"
      ]),
      makeCategory("trees", [
        "oak","maple","pine","spruce","fir","cedar","birch","elm","ash","willow",
        "poplar","beech","sycamore","hemlock","yew","redwood","sequoia","larch","alder",
        "cherry","apple","pear","plum","hawthorn","holly","juniper","magnolia","dogwood",
        "walnut","chestnut","hickory","cypress","eucalyptus","baobab","olive","fig",
        "mulberry","cottonwood","rowan","ginkgo","acacia","aspen","hornbeam","lime","teak"
      ]),
      makeCategory("birds", [
        "sparrow","robin","blue jay","cardinal","goldfinch","crow","raven","eagle","hawk",
        "falcon","owl","woodpecker","hummingbird","swallow","starling","wren","warbler",
        "oriole","blackbird","mockingbird","thrush","loon","pelican","heron","egret",
        "flamingo","parrot","macaw","cockatoo","parakeet","pigeon","dove","quail",
        "pheasant","turkey","goose","duck","swan","kingfisher","osprey","vulture",
        "condor","kestrel","nuthatch","chickadee"
      ]),
      makeCategory("insects", [
        "ant","bee","wasp","hornet","butterfly","moth","beetle","ladybug","dragonfly",
        "damselfly","grasshopper","cricket","locust","mantis","termite","mosquito",
        "gnat","fly","fruit fly","housefly","flea","louse","aphid","cicada","leafhopper",
        "stink bug","firefly","weevil","earwig","silverfish","mayfly","stonefly",
        "caddisfly","lacewing","dobsonfly","walking stick","katydid","cockroach",
        "bark beetle","dung beetle","chafer","blister beetle","sawfly","horsefly","midge"
      ]),
      makeCategory("cheeses", [
        "cheddar","mozzarella","brie","camembert","gouda","parmesan","pecorino","asiago",
        "provolone","havarti","feta","halloumi","ricotta","mascarpone","stilton",
        "gorgonzola","roquefort","blue cheese","colby","monterey jack","pepper jack",
        "swiss","emmental","gruyere","raclette","fontina","burrata","paneer","cotija",
        "queso fresco","manchego","mimolette","jarlsberg","edam","limburger","comte",
        "taleggio","reblochon","double gloucester","wensleydale","cheshire","caerphilly",
        "red leicester","neufchatel","cantal"
      ]),
      makeCategory("breads", [
        "baguette","sourdough","ciabatta","brioche","focaccia","pita","naan","rye",
        "multigrain","whole wheat","white bread","pretzel roll","kaiser roll","croissant",
        "pain de mie","challah","matzo","lavash","flatbread","cornbread","english muffin",
        "breadstick","pretzel","roti","paratha","tortilla","arepa","injera","panettone",
        "soda bread","pumpernickel","irish brown bread","bannock","crumpet","scali bread",
        "olive bread","potato bread","milk bread","teacake","barmbrack","kulcha","bolillo",
        "damper","brotchen","shokupan"
      ]),
      makeCategory("desserts", [
        "brownie","cupcake","donut","eclair","macaron","meringue","trifle","tiramisu",
        "cheesecake","shortcake","pavlova","baklava","cannoli","crepe cake","fruit tart",
        "bread pudding","rice pudding","ice cream cake","lemon bar","blondie","fudge",
        "mousse","sundae","parfait","sorbet","gelato","apple pie","pecan pie","pumpkin pie",
        "banana split","crumble","cobbler","flan","creme brulee","profiterole","opera cake",
        "madeleine","napoleon","biscotti","whoopie pie","snickerdoodle","churro","beignet",
        "semifreddo","poached pear"
      ]),
      makeCategory("candies", [
        "Skittles","Starburst","M&M's","Smarties","Jolly Rancher","Twizzlers","Sour Patch Kids",
        "Swedish Fish","Nerds","Kit Kat","Snickers","Mars","Milky Way","Crunch","Butterfinger",
        "Heath","PayDay","Rolo","Tootsie Roll","Milk Duds","Junior Mints","York Peppermint Pattie",
        "Reese's Pieces","Reese's Peanut Butter Cups","Twix","Whoppers","Airheads","Laffy Taffy",
        "Runts","Gobstopper","Lemonhead","Warheads","Mike and Ike","Dots","Hot Tamales",
        "Red Hots","Jelly Belly","Haribo Goldbears","Almond Joy","Mounds","Charleston Chew",
        "Bit-O-Honey","Werther's Original","Lifesavers","Ring Pop"
      ]),
      makeCategory("cereals", [
        "Cheerios","Corn Flakes","Rice Krispies","Froot Loops","Frosted Flakes","Lucky Charms",
        "Special K","Cocoa Puffs","Trix","Cap'n Crunch","Raisin Bran","Mini-Wheats",
        "Honey Nut Cheerios","Apple Jacks","Cinnamon Toast Crunch","Golden Grahams",
        "Honey Bunches of Oats","Kix","Chex","Cocoa Krispies","Count Chocula","Cookie Crisp",
        "Wheaties","Grape-Nuts","Life","Shredded Wheat","Total","Fruity Pebbles","Cocoa Pebbles",
        "Corn Pops","Cracklin' Oat Bran","Basic 4","Mueslix","Alpha-Bits","Vector","All-Bran",
        "Bran Flakes","Honeycomb","Smart Start","French Toast Crunch","Lucky Charms Chocolate",
        "Krave","Berry Berry Kix","Golden Crisp","Malt-O-Meal"
      ]),
      makeCategory("kitchen-tools", [
        "whisk","spatula","ladle","tongs","colander","grater","peeler","can opener","measuring cup",
        "measuring spoon","cutting board","chef's knife","paring knife","bread knife","rolling pin",
        "mixing bowl","skillet","saucepan","stockpot","sheet pan","baking dish","muffin tin",
        "loaf pan","cooling rack","zester","garlic press","slotted spoon","turner","bench scraper",
        "mortar and pestle","strainer","salad spinner","kettle","toaster","blender","food processor",
        "immersion blender","timer","thermometer","pizza cutter","pastry brush","cookie scoop",
        "melon baller","mandoline","sifter"
      ]),
      makeCategory("garden-tools", [
        "shovel","spade","rake","hoe","trowel","pruning shears","loppers","garden fork","watering can",
        "hose","sprinkler","wheelbarrow","leaf blower","hedge trimmer","lawn mower","weed puller",
        "dibber","hand cultivator","soil scoop","seed spreader","garden gloves","kneeling pad",
        "compost bin","wheel hoe","pickaxe","mattock","bulb planter","edger","pitchfork",
        "hand rake","soil knife","rain gauge","plant ties","twine","watering wand","hose reel",
        "potting bench","garden cart","pruning saw","grass shears","soil tester","mulch fork",
        "transplanter","aerator","sprayer"
      ]),
      makeCategory("cleaning-supplies", [
        "broom","mop","dustpan","vacuum","bucket","sponge","dish soap","laundry detergent",
        "bleach","glass cleaner","all-purpose cleaner","scrub brush","toilet brush","plunger",
        "rubber gloves","microfibre cloth","feather duster","paper towel","garbage bag","spray bottle",
        "magic eraser","floor cleaner","furniture polish","air freshener","disinfecting wipes",
        "lint roller","carpet cleaner","drain cleaner","toilet cleaner","oven cleaner","steel wool",
        "soap scum remover","dust mop","window squeegee","stain remover","fabric refresher",
        "dishwasher detergent","dryer sheet","laundry basket","caddy","recycling bin","hand soap",
        "vinegar","baking soda","spin mop"
      ]),
      makeCategory("board-games", [
        "Monopoly","Scrabble","Risk","Clue","Catan","Ticket to Ride","Carcassonne","Pandemic",
        "Azul","Splendor","Chess","Checkers","Backgammon","Sorry!","Life","Yahtzee","Boggle",
        "Battleship","Connect 4","Operation","Guess Who?","Jenga","Twister","Sequence","Dominion",
        "Patchwork","Codenames","Dixit","Hive","Qwirkle","Santorini","7 Wonders","Agricola",
        "Terra Mystica","Wingspan","Scythe","Gloomhaven","Cranium","Pictionary","Taboo",
        "Trivial Pursuit","Mancala","Go","Othello","Mouse Trap"
      ]),
      makeCategory("sci-fi-shows", [
        "The X-Files","Doctor Who","Black Mirror","Battlestar Galactica","The Twilight Zone",
        "Westworld","Fringe","Lost in Space","The Expanse","Firefly","Severance","Dark",
        "Foundation","Silo","Andor","Star Trek","Star Trek: Voyager","Star Trek: Discovery",
        "Star Trek: Picard","Raised by Wolves","Orphan Black","Sense8","Heroes","Torchwood",
        "Humans","Altered Carbon","Travelers","Devs","Halo","Snowpiercer","Continuum",
        "Farscape","Eureka","Quantum Leap","Caprica","Alien Nation","Resident Alien","Upload",
        "Beacon 23","3 Body Problem","The Peripheral","Blake's 7","Babylon 5","Red Dwarf","Lexx"
      ]),
      makeCategory("sitcoms", [
        "Friends","The Office","Parks and Recreation","Seinfeld","Frasier","Cheers","Brooklyn Nine-Nine",
        "Modern Family","New Girl","Arrested Development","Community","30 Rock","How I Met Your Mother",
        "Schitt's Creek","Superstore","Abbott Elementary","The Good Place","Black-ish","The Nanny",
        "Will & Grace","Scrubs","Kim's Convenience","Fresh Off the Boat","Everybody Loves Raymond",
        "The Big Bang Theory","That '70s Show","Happy Endings","Cougar Town","Rules of Engagement",
        "Malcolm in the Middle","The Middle","Dharma & Greg","Just Shoot Me!","Wings","Night Court",
        "NewsRadio","Spin City","2 Broke Girls","Bob Hearts Abishola","Reba","Home Improvement",
        "Living Single","Family Matters","Full House","Perfect Strangers"
      ]),
      makeCategory("medical-dramas", [
        "ER","Grey's Anatomy","House","The Good Doctor","St. Elsewhere","Chicago Hope",
        "Private Practice","Nurse Jackie","Scrubs","New Amsterdam","Code Black","The Resident",
        "Saving Hope","Transplant","Holby City","Casualty","Call the Midwife","Doc Martin",
        "Mercy","Hawthorne","Three Rivers","Strong Medicine","Trauma","Off the Map","A Gifted Man",
        "Doogie Howser, M.D.","Emily Owens, M.D.","Pure Genius","Nip/Tuck","Body of Proof",
        "Royal Pains","Getting On","Medicine Ball","Heartbeat","The Knick","SkyMed","Bramwell",
        "Dr. Quinn, Medicine Woman","The Night Shift","Lenox Hill","Critical","Monday Mornings",
        "Diagnosis Murder","Hospital Playlist","MASH"
      ]),
      makeCategory("movie-titles", [
        "The Matrix","Inception","Titanic","Avatar","Gladiator","Interstellar","The Godfather",
        "Pulp Fiction","The Dark Knight","Forrest Gump","Casablanca","Jaws","Alien","Rocky",
        "Goodfellas","The Departed","Whiplash","Arrival","Barbie","Oppenheimer","La La Land",
        "Moonlight","Parasite","The Shawshank Redemption","The Silence of the Lambs",
        "Jurassic Park","Back to the Future","The Truman Show","No Country for Old Men",
        "There Will Be Blood","Blade Runner","Top Gun","Toy Story","Finding Nemo",
        "The Lion King","Die Hard","Get Out","Her","The Social Network","Little Women",
        "A Few Good Men","The Prestige","Shrek","Memento","The Grand Budapest Hotel"
      ]),
      makeCategory("song-titles", [
        "Imagine","Halo","Firework","Bad Guy","Stay","Uptown Funk","Royals","Poker Face",
        "Yellow","Wonderwall","Hey Jude","Purple Rain","Rolling in the Deep","Single Ladies",
        "Shake It Off","Levitating","Viva La Vida","Mr. Brightside","Call Me Maybe",
        "Watermelon Sugar","Take on Me","Dancing Queen","Bohemian Rhapsody","Toxic",
        "Since U Been Gone","Teenage Dream","Blinding Lights","Umbrella","Hello","Dreams",
        "Africa","Creep","Landslide","Jolene","Fast Car","I Will Survive","Respect",
        "Crazy in Love","Hound Dog","Billie Jean","Like a Prayer","Material Girl",
        "As It Was","Flowers","Shallow"
      ]),
      makeCategory("comic-artists", [
        "Jack Kirby","Stan Lee","Steve Ditko","Jim Lee","Frank Miller","Alan Moore",
        "Neal Adams","Todd McFarlane","John Romita Sr.","John Byrne","Alex Ross",
        "George Perez","Brian Bolland","Rob Liefeld","Dave Gibbons","Joe Kubert",
        "Will Eisner","Art Spiegelman","Chris Claremont","Walt Simonson","Carmine Infantino",
        "Gil Kane","Mike Mignola","Moebius","Osamu Tezuka","Rumiko Takahashi","Katsuhiro Otomo",
        "Harvey Kurtzman","Charles Schulz","Bill Watterson","Jim Davis","Al Capp","Herge",
        "R. Crumb","Jeff Smith","Lynda Barry","Marjane Satrapi","Alison Bechdel",
        "Tove Jansson","Posy Simmonds","Adrian Tomine","Daniel Clowes","Jaime Hernandez",
        "Gilbert Hernandez","Sergio Aragones"
      ]),
      makeCategory("actors", [
        "Tom Hanks","Meryl Streep","Denzel Washington","Cate Blanchett","Leonardo DiCaprio",
        "Viola Davis","Brad Pitt","Nicole Kidman","Robert De Niro","Emma Stone","Ryan Gosling",
        "Julia Roberts","Samuel L. Jackson","Sandra Bullock","Christian Bale","Charlize Theron",
        "Matt Damon","Jodie Foster","Idris Elba","Amy Adams","Harrison Ford","Scarlett Johansson",
        "Jake Gyllenhaal","Saoirse Ronan","Mahershala Ali","Frances McDormand","Cillian Murphy",
        "Florence Pugh","Angela Bassett","Benedict Cumberbatch","Rachel Weisz","Colin Farrell",
        "Margot Robbie","Willem Dafoe","Michelle Yeoh","Keanu Reeves","Jeff Bridges",
        "Naomi Watts","Paul Mescal","Pedro Pascal","Zendaya","Andrew Garfield","Regina King",
        "Carey Mulligan","Ayo Edebiri"
      ]),
      makeCategory("authors", [
        "Jane Austen","Charles Dickens","George Eliot","Virginia Woolf","James Joyce",
        "Toni Morrison","Margaret Atwood","Kazuo Ishiguro","Salman Rushdie","Donna Tartt",
        "C.S. Lewis","J.R.R. Tolkien","Harper Lee","George Orwell","Aldous Huxley",
        "F. Scott Fitzgerald","Ernest Hemingway","William Faulkner","Emily Bronte",
        "Charlotte Bronte","Anne Tyler","Alice Munro","Hilary Mantel","Arundhati Roy",
        "Zadie Smith","Ian McEwan","Colson Whitehead","Rachel Cusk","Michael Ondaatje",
        "Maya Angelou","Jhumpa Lahiri","John Steinbeck","Philip Roth","Vladimir Nabokov",
        "Kurt Vonnegut","Elena Ferrante","John Irving","Rohinton Mistry","Margaret Laurence",
        "Mordecai Richler","Alice Walker","Louise Erdrich","Ann Patchett","David Mitchell","Kazim Ali"
      ]),
      makeCategory("directors", [
        "Steven Spielberg","Martin Scorsese","Christopher Nolan","Greta Gerwig","Spike Lee",
        "Sofia Coppola","Ridley Scott","James Cameron","Kathryn Bigelow","Guillermo del Toro",
        "Wes Anderson","David Fincher","Quentin Tarantino","Patty Jenkins","Bong Joon Ho",
        "Denis Villeneuve","Jordan Peele","Chloe Zhao","Ava DuVernay","Alfred Hitchcock",
        "Francis Ford Coppola","Peter Jackson","Tim Burton","Stanley Kubrick","Akira Kurosawa",
        "Hayao Miyazaki","Ang Lee","Jane Campion","Jonathan Demme","David Lynch","Roman Polanski",
        "Sam Mendes","Coen Brothers","Barry Jenkins","Todd Haynes","Mike Leigh","Ken Loach",
        "Clint Eastwood","John Ford","Orson Welles","Paul Thomas Anderson","Robert Altman",
        "Howard Hawks","John Carpenter","Rob Reiner"
      ]),
      makeCategory("painters", [
        "Pablo Picasso","Vincent van Gogh","Claude Monet","Rembrandt","Johannes Vermeer",
        "Edgar Degas","Paul Cezanne","Henri Matisse","Wassily Kandinsky","Jackson Pollock",
        "Georgia O'Keeffe","Frida Kahlo","Salvador Dali","Edvard Munch","Pierre-Auguste Renoir",
        "Paul Klee","Joan Miro","Gustav Klimt","Jan van Eyck","Sandro Botticelli",
        "Michelangelo","Raphael","Titian","El Greco","Caravaggio","Diego Velazquez",
        "Francisco Goya","J.M.W. Turner","John Constable","Caspar David Friedrich",
        "Mary Cassatt","Berthe Morisot","Camille Pissarro","Georges Seurat","Amedeo Modigliani",
        "Marc Chagall","Henri Rousseau","Egon Schiele","Piet Mondrian","Willem de Kooning",
        "Edward Hopper","Grant Wood","Winslow Homer","Thomas Eakins","Lucian Freud"
      ]),
      makeCategory("composers", [
        "Johann Sebastian Bach","Ludwig van Beethoven","Wolfgang Amadeus Mozart","Franz Schubert",
        "Johannes Brahms","Pyotr Ilyich Tchaikovsky","Richard Wagner","Giuseppe Verdi",
        "Antonio Vivaldi","George Frideric Handel","Joseph Haydn","Felix Mendelssohn",
        "Robert Schumann","Frederic Chopin","Franz Liszt","Claude Debussy","Maurice Ravel",
        "Igor Stravinsky","Sergei Rachmaninoff","Dmitri Shostakovich","Sergei Prokofiev",
        "Gustav Mahler","Antonin Dvorak","Bedrich Smetana","Jean Sibelius","Edvard Grieg",
        "Camille Saint-Saens","Hector Berlioz","Bela Bartok","Anton Bruckner","Giacomo Puccini",
        "Gaetano Donizetti","Gioachino Rossini","Vincenzo Bellini","Aaron Copland",
        "Leonard Bernstein","George Gershwin","Philip Glass","Steve Reich","John Adams",
        "Arvo Part","Olivier Messiaen","Nikolai Rimsky-Korsakov","Benjamin Britten","Edward Elgar"
      ]),
      makeCategory("philosophers", [
        "Plato","Aristotle","Socrates","Epicurus","Zeno of Citium","Marcus Aurelius",
        "St. Augustine","Thomas Aquinas","Rene Descartes","Baruch Spinoza","John Locke",
        "David Hume","Immanuel Kant","G.W.F. Hegel","Arthur Schopenhauer","Soren Kierkegaard",
        "Friedrich Nietzsche","Karl Marx","John Stuart Mill","Bertrand Russell","Ludwig Wittgenstein",
        "Jean-Paul Sartre","Simone de Beauvoir","Albert Camus","Hannah Arendt","Michel Foucault",
        "Jacques Derrida","Gilles Deleuze","Emmanuel Levinas","Edmund Husserl","Martin Heidegger",
        "Maurice Merleau-Ponty","Thomas Hobbes","Jean-Jacques Rousseau","Voltaire","Montesquieu",
        "Blaise Pascal","Gottfried Wilhelm Leibniz","Ayn Rand","Martha Nussbaum","Judith Butler",
        "Alasdair MacIntyre","Richard Rorty","Isaiah Berlin","Cornel West"
      ]),
      makeCategory("scientists", [
        "Isaac Newton","Albert Einstein","Marie Curie","Charles Darwin","Galileo Galilei",
        "Nikola Tesla","Michael Faraday","Gregor Mendel","Louis Pasteur","Rosalind Franklin",
        "Alan Turing","Ada Lovelace","Niels Bohr","Max Planck","Johannes Kepler","Blaise Pascal",
        "James Clerk Maxwell","Erwin Schrodinger","Richard Feynman","Stephen Hawking",
        "Carl Sagan","Rachel Carson","Barbara McClintock","Jane Goodall","Dorothy Hodgkin",
        "Lise Meitner","Subrahmanyan Chandrasekhar","Enrico Fermi","Paul Dirac","Linus Pauling",
        "Jonas Salk","Alexander Fleming","Robert Hooke","Antonie van Leeuwenhoek",
        "Edwin Hubble","Sally Ride","Katherine Johnson","Chien-Shiung Wu","Vera Rubin",
        "Jagdish Chandra Bose","Tu Youyou","Jennifer Doudna","Emmanuelle Charpentier",
        "Tim Berners-Lee","James Watson"
      ]),
      makeCategory("poets", [
        "Emily Dickinson","Walt Whitman","Robert Frost","Langston Hughes","Sylvia Plath",
        "Maya Angelou","T.S. Eliot","W.B. Yeats","Seamus Heaney","Elizabeth Bishop",
        "Allen Ginsberg","Adrienne Rich","Carol Ann Duffy","Ted Hughes","John Keats",
        "Percy Bysshe Shelley","William Wordsworth","Samuel Taylor Coleridge","Lord Byron",
        "Alexander Pope","John Donne","Geoffrey Chaucer","Philip Larkin","Dylan Thomas",
        "Christina Rossetti","Edgar Allan Poe","E.E. Cummings","Gwendolyn Brooks","Audre Lorde",
        "Louise Gluck","Ocean Vuong","Anne Carson","Sappho","Virgil","Ovid","Rainer Maria Rilke",
        "Pablo Neruda","Federico Garcia Lorca","Paul Celan","Alicia Ostriker","Margaret Atwood",
        "Denise Levertov","Muriel Rukeyser","Robert Lowell","Wallace Stevens"
      ]),
      makeCategory("women-first-names", [
        "Emma","Olivia","Ava","Sophia","Isabella","Mia","Charlotte","Amelia","Harper",
        "Evelyn","Abigail","Emily","Ella","Elizabeth","Camila","Luna","Sofia","Avery",
        "Mila","Aria","Scarlett","Penelope","Layla","Chloe","Victoria","Madison","Eleanor",
        "Grace","Nora","Riley","Zoey","Hannah","Hazel","Lily","Ellie","Violet","Lillian",
        "Zoe","Stella","Aurora","Natalie","Emilia","Everly","Leah","Lucy"
      ]),
      makeCategory("men-first-names", [
        "Liam","Noah","Oliver","Elijah","James","William","Benjamin","Lucas","Henry",
        "Theodore","Jack","Levi","Alexander","Jackson","Mateo","Daniel","Michael",
        "Mason","Sebastian","Ethan","Logan","Owen","Samuel","Jacob","Asher","Aiden",
        "John","Joseph","Wyatt","David","Leo","Luke","Julian","Hudson","Grayson",
        "Matthew","Ezra","Gabriel","Carter","Isaac","Jayden","Luca","Anthony","Dylan","Lincoln"
      ]),
      makeCategory("surnames", [
        "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez",
        "Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor",
        "Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez",
        "Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright",
        "Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall"
      ]),
      makeCategory("mythological-figures", [
        "Zeus","Hera","Poseidon","Demeter","Athena","Apollo","Artemis","Ares","Aphrodite",
        "Hermes","Hephaestus","Dionysus","Hades","Persephone","Hestia","Eros","Nike","Nemesis",
        "Hypnos","Thanatos","Hecate","Pan","Selene","Helios","Gaia","Uranus","Cronus","Rhea",
        "Atlas","Prometheus","Epimetheus","Perseus","Heracles","Theseus","Jason","Medea",
        "Orpheus","Eurydice","Achilles","Patroclus","Odysseus","Penelope","Circe","Cassandra","Andromeda"
      ]),
      makeCategory("shakespeare-plays", [
        "Hamlet","Macbeth","Othello","King Lear","Romeo and Juliet","A Midsummer Night's Dream",
        "Much Ado About Nothing","Twelfth Night","As You Like It","The Tempest","Julius Caesar",
        "Antony and Cleopatra","Coriolanus","Timon of Athens","Pericles","Cymbeline",
        "The Winter's Tale","Measure for Measure","The Merchant of Venice","The Taming of the Shrew",
        "Richard II","Richard III","Henry IV, Part 1","Henry IV, Part 2","Henry V",
        "Henry VI, Part 1","Henry VI, Part 2","Henry VI, Part 3","Henry VIII","King John",
        "Titus Andronicus","Troilus and Cressida","All's Well That Ends Well","Love's Labour's Lost",
        "The Comedy of Errors","The Two Gentlemen of Verona","The Merry Wives of Windsor",
        "Coriolanus Again","Titus Again","Venus and Adonis","The Rape of Lucrece","The Phoenix and the Turtle",
        "Sonnets","Edward III","Cardenio"
      ].filter((_, i, arr) => arr.indexOf(arr[i]) === i).slice(0, 45)),
      makeCategory("gemstones", [
        "diamond","ruby","sapphire","emerald","amethyst","topaz","opal","garnet","peridot",
        "aquamarine","tourmaline","citrine","onyx","jade","turquoise","lapis lazuli","moonstone",
        "sunstone","zircon","spinel","tanzanite","iolite","alexandrite","malachite","agate",
        "carnelian","jasper","obsidian","bloodstone","fluorite","amber","coral","pearl",
        "jet","aventurine","chrysoprase","larimar","unakite","serpentine","rhodonite",
        "sodalite","charoite","amazonite","hematite","pyrite"
      ]),
      makeCategory("kitchen-appliances", [
        "toaster","microwave","blender","food processor","stand mixer","hand mixer","coffee maker",
        "espresso machine","kettle","slow cooker","pressure cooker","rice cooker","air fryer",
        "toaster oven","waffle maker","panini press","bread maker","juicer","immersion blender",
        "electric griddle","electric skillet","ice cream maker","sous vide machine","hot plate",
        "mini fridge","dishwasher","garbage disposal","range hood","electric can opener",
        "milk frother","coffee grinder","meat slicer","vacuum sealer","dehydrator","yogurt maker",
        "popcorn maker","egg cooker","sandwich maker","deep fryer","induction burner",
        "wine cooler","water dispenser","food steamer","warming drawer","ice maker"
      ]),
      makeCategory("capitals", [
        "Paris","Berlin","Rome","Madrid","Lisbon","Amsterdam","Brussels","Stockholm",
        "Oslo","Copenhagen","Helsinki","Warsaw","Vienna","Athens","Dublin","Reykjavik",
        "Bucharest","Budapest","Zagreb","Belgrade","Bratislava","Ljubljana","Tallinn","Riga",
        "Vilnius","Bern","Kyiv","Tirana","Andorra la Vella","Minsk","Sarajevo","Sofia",
        "Nicosia","Prague","Luxembourg","Valletta","Chisinau","Podgorica","Skopje","San Marino",
        "Pristina","Vaduz","Monaco","Ankara","Vatican City"
      ]),
      makeCategory("constellations", [
        "Orion","Ursa Major","Ursa Minor","Cassiopeia","Andromeda","Pegasus","Cygnus","Lyra",
        "Aquila","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpius","Sagittarius",
        "Capricornus","Aquarius","Pisces","Aries","Draco","Phoenix","Hydra","Centaurus",
        "Crux","Carina","Vela","Puppis","Perseus","Auriga","Bootes","Canis Major","Canis Minor",
        "Cepheus","Delphinus","Hercules","Lepus","Lupus","Monoceros","Musca","Pavo","Reticulum",
        "Triangulum","Volans"
      ]),
      makeCategory("clean-female-surnames", [
        "Murphy","Kelly","Ryan","O'Sullivan","Byrne","Walsh","O'Connor","Doyle","McCarthy",
        "Gallagher","Kennedy","Lynch","Murray","Quinn","Moorehouse","Dunn","Power","Nolan",
        "Reilly","Casey","Kavanagh","Foley","Donovan","Sheehan","Brennan","Molloy","Hogan",
        "Keane","Flanagan","Sheridan","Tierney","Farrell","Gannon","Bishop","Phelan","Dempsey",
        "Noonan","McGrath","Sexton","Moran","Boland","Hickey","Healy","Cullen","Corcoran"
      ])
    ];
  }
});
