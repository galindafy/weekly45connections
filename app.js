const BOARD_SIZE = 45;
const GROUP_SIZE = 45;

document.addEventListener("DOMContentLoaded", () => {
  const WEEK_KEY = getWeekKey();

  let state = {
    tiles: [],
    selected: [],
  };

  init();

  function init() {
    try {
      const saved = localStorage.getItem(WEEK_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.tiles) && Array.isArray(parsed.selected)) {
          state = parsed;
          render();
          return;
        }
      }
    } catch (e) {}

    generateBoard();
    save();
    render();
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
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  const CATEGORY_POOLS = [
    [
      "spaghetti","penne","rigatoni","fusilli","farfalle","linguine","fettuccine",
      "ravioli","tortellini","gnocchi","ziti","macaroni","cavatappi","rotini",
      "bucatini","orecchiette","pappardelle","lasagna","tagliatelle","vermicelli",
      "angel hair","shells","ditalini","manicotti","capellini","gemelli","mafaldine",
      "radiatori","wagon wheels","campanelle","strozzapreti","paccheri","anelletti",
      "bigoli","casarecce","trofie","malloreddus","lumache","fregola","mezzi rigatoni",
      "spaghettini","cellentani","tubetti","sedani","filini"
    ],
    [
      "basil","oregano","thyme","rosemary","cumin","turmeric","paprika","cinnamon",
      "nutmeg","clove","cardamom","parsley","dill","sage","tarragon","sumac",
      "za'atar","bay leaf","fennel","anise","chives","mint","marjoram","caraway",
      "coriander","ginger","allspice","saffron","vanilla","sesame","mustard seed",
      "celery seed","fenugreek","star anise","lemongrass","chili powder","cayenne",
      "garlic powder","onion powder","smoked paprika","herbes de Provence","lovage",
      "savory","asafoetida","nigella"
    ],
    [
      "France","Germany","Italy","Spain","Portugal","Netherlands","Belgium","Sweden",
      "Norway","Denmark","Finland","Poland","Austria","Greece","Ireland","Iceland",
      "Romania","Hungary","Croatia","Serbia","Slovakia","Slovenia","Estonia","Latvia",
      "Lithuania","Switzerland","Ukraine","Albania","Andorra","Belarus","Bosnia and Herzegovina",
      "Bulgaria","Cyprus","Czech Republic","Luxembourg","Malta","Moldova","Montenegro",
      "North Macedonia","San Marino","Kosovo","Liechtenstein","Monaco","Turkey","Vatican City"
    ],
    [
      "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
      "delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
      "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
      "minnesota","mississippi","missouri","montana","nebraska","nevada","new hampshire",
      "new jersey","new mexico","new york","north carolina","north dakota","ohio",
      "oklahoma","oregon","pennsylvania","rhode island","south carolina","south dakota",
      "tennessee","texas","utah","vermont"
    ],
    [
      "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio",
      "San Diego","Dallas","Austin","Jacksonville","Fort Worth","Columbus","Charlotte",
      "San Francisco","Indianapolis","Seattle","Denver","Boston","El Paso","Detroit",
      "Nashville","Portland","Memphis","Oklahoma City","Las Vegas","Louisville","Baltimore",
      "Milwaukee","Albuquerque","Tucson","Fresno","Sacramento","Kansas City","Mesa",
      "Atlanta","Omaha","Raleigh","Miami","Oakland","Minneapolis","Tulsa","Cleveland",
      "Wichita","Arlington"
    ],
    [
      "printer","stapler","notebook","pen","pencil","monitor","keyboard","mouse","desk",
      "chair","whiteboard","calendar","folder","binder","paper clips","tape","scissors",
      "highlighter","envelope","sticky notes","scanner","phone","lamp","filing cabinet",
      "push pins","rubber bands","clipboard","hole punch","label maker","shredder",
      "desk pad","mail tray","eraser","ruler","extension cord","surge protector",
      "dry erase marker","bulletin board","ink cartridge","toner","calculator","mug",
      "paper ream","lanyard","name badge"
    ],
    [
      "Breaking Bad","Stranger Things","The X-Files","Doctor Who","Black Mirror",
      "Battlestar Galactica","The Twilight Zone","Westworld","Fringe","Lost in Space",
      "The Expanse","Firefly","Severance","Dark","Foundation","Silo","Andor","Star Trek",
      "Star Trek: Voyager","Star Trek: Discovery","Star Trek: Picard","The Last of Us",
      "Raised by Wolves","Orphan Black","Sense8","Heroes","The 100","Torchwood",
      "Humans","Altered Carbon","Travelers","Devs","Halo","Snowpiercer","Continuum",
      "Farscape","Eureka","Quantum Leap","Caprica","Alien Nation","Resident Alien",
      "Upload","Beacon 23","3 Body Problem","The Peripheral"
    ],
    [
      "Jack Kirby","Stan Lee","Steve Ditko","Jim Lee","Frank Miller","Alan Moore",
      "Neal Adams","Todd McFarlane","John Romita Sr.","John Byrne","Alex Ross",
      "George Pérez","Brian Bolland","Rob Liefeld","Dave Gibbons","Joe Kubert",
      "Will Eisner","Art Spiegelman","Chris Claremont","Walt Simonson","Carmine Infantino",
      "Gil Kane","Mike Mignola","Moebius","Osamu Tezuka","Rumiko Takahashi","Katsuhiro Otomo",
      "Harvey Kurtzman","Charles Schulz","Bill Watterson","Jim Davis","Al Capp",
      "Hergé","R. Crumb","Jeff Smith","Lynda Barry","Marjane Satrapi","Alison Bechdel",
      "Tove Jansson","Posy Simmonds","Adrian Tomine","Daniel Clowes","Jaime Hernandez",
      "Gilbert Hernandez","Sergio Aragonés"
    ],
    [
      "Tom Hanks","Meryl Streep","Denzel Washington","Cate Blanchett","Leonardo DiCaprio",
      "Viola Davis","Brad Pitt","Nicole Kidman","Robert De Niro","Emma Stone","Ryan Gosling",
      "Julia Roberts","Samuel L. Jackson","Sandra Bullock","Christian Bale","Charlize Theron",
      "Matt Damon","Jodie Foster","Idris Elba","Amy Adams","Harrison Ford","Scarlett Johansson",
      "Jake Gyllenhaal","Saoirse Ronan","Mahershala Ali","Frances McDormand","Cillian Murphy",
      "Florence Pugh","Angela Bassett","Benedict Cumberbatch","Rachel Weisz","Colin Farrell",
      "Margot Robbie","Willem Dafoe","Michelle Yeoh","Keanu Reeves","Jeff Bridges",
      "Naomi Watts","Ayo Edebiri","Paul Mescal","Carey Mulligan","Pedro Pascal","Zendaya",
      "Andrew Garfield","Regina King"
    ],
    [
      "The Matrix","Inception","Titanic","Avatar","Gladiator","Interstellar","The Godfather",
      "Pulp Fiction","The Dark Knight","Forrest Gump","Casablanca","Jaws","Alien","Rocky",
      "Goodfellas","The Departed","Whiplash","Arrival","Barbie","Oppenheimer","La La Land",
      "Moonlight","Parasite","The Shawshank Redemption","The Silence of the Lambs",
      "Jurassic Park","Back to the Future","The Truman Show","No Country for Old Men",
      "There Will Be Blood","Blade Runner","Top Gun","Toy Story","Finding Nemo",
      "The Lion King","Die Hard","Get Out","Her","The Social Network","Little Women",
      "A Few Good Men","The Prestige","Shrek","Memento","The Grand Budapest Hotel"
    ],
    [
      "Imagine","Halo","Firework","Bad Guy","Stay","Uptown Funk","Royals","Poker Face",
      "Yellow","Wonderwall","Hey Jude","Purple Rain","Rolling in the Deep","Single Ladies",
      "Shake It Off","Levitating","Viva La Vida","Mr. Brightside","Call Me Maybe",
      "Watermelon Sugar","Take on Me","Dancing Queen","Bohemian Rhapsody","Toxic",
      "Since U Been Gone","Teenage Dream","Blinding Lights","Umbrella","Hello",
      "Dreams","Africa","Creep","Landslide","Jolene","Fast Car","I Will Survive",
      "Respect","Crazy in Love","Hound Dog","Oops!... I Did It Again","Billie Jean",
      "Like a Prayer","Material Girl","As It Was","Flowers"
    ],
    [
      "Emma","Olivia","Ava","Sophia","Isabella","Mia","Charlotte","Amelia","Harper",
      "Evelyn","Abigail","Emily","Ella","Elizabeth","Camila","Luna","Sofia","Avery",
      "Mila","Aria","Scarlett","Penelope","Layla","Chloe","Victoria","Madison","Eleanor",
      "Grace","Nora","Riley","Zoey","Hannah","Hazel","Lily","Ellie","Violet","Lillian",
      "Zoe","Stella","Aurora","Natalie","Emilia","Everly","Leah","Lucy"
    ],
    [
      "Liam","Noah","Oliver","Elijah","James","William","Benjamin","Lucas","Henry",
      "Theodore","Jack","Levi","Alexander","Jackson","Mateo","Daniel","Michael",
      "Mason","Sebastian","Ethan","Logan","Owen","Samuel","Jacob","Asher","Aiden",
      "John","Joseph","Wyatt","David","Leo","Luke","Julian","Hudson","Grayson",
      "Matthew","Ezra","Gabriel","Carter","Isaac","Jayden","Luca","Anthony","Dylan","Lincoln"
    ]
  ];

  function weeklyShuffle(arr, seed) {
    const clone = arr.slice();
    let s = seed;
    for (let i = clone.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
  }

  function getWeeklySeed() {
    const d = new Date();
    const start = new Date(Date.UTC(d.getFullYear(), 0, 1));
    const now = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = Math.floor((now - start) / 86400000) + 1;
    const week = Math.ceil(dayNum / 7);
    return d.getFullYear() * 100 + week;
  }

  function generateBoard() {
    const seed = getWeeklySeed();
    const poolOrder = weeklyShuffle(CATEGORY_POOLS.map((_, i) => i), seed);
    const chosenPools = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      chosenPools.push(CATEGORY_POOLS[poolOrder[i % poolOrder.length]]);
    }

    const tiles = [];
    for (let groupIndex = 0; groupIndex < BOARD_SIZE; groupIndex++) {
      const items = chosenPools[groupIndex].slice(0, GROUP_SIZE);
      for (const item of items) {
        tiles.push({
          id: makeId(),
          text: item,
          group: groupIndex,
          items: [item],
          locked: false,
        });
      }
    }

    state.tiles = weeklyShuffle(tiles, seed + 17);
    state.selected = [];
  }

  function handleClick(id) {
    const idx = state.tiles.findIndex(t => t.id === id);
    if (idx === -1) return;

    const tile = state.tiles[idx];
    if (tile.locked) return;

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

    merge(firstIdx, idx);
    state.selected = [];
    save();
    render();
  }

  function merge(i1, i2) {
    if (i1 === i2) return;

    const t1 = state.tiles[i1];
    const t2 = state.tiles[i2];
    if (!t1 || !t2) return;
    if (t1.group !== t2.group || t1.locked || t2.locked) return;

    const mergedItems = [...new Set([...t1.items, ...t2.items])];

    const mergedTile = {
      ...t2,
      items: mergedItems,
      text: formatPreview(mergedItems),
      locked: mergedItems.length === GROUP_SIZE,
    };

    state.tiles[i2] = mergedTile;
    state.tiles.splice(i1, 1);

    if (mergedTile.locked) {
      moveGroupToTop(mergedTile.group);
    }
  }

  function moveGroupToTop(group) {
    const groupTiles = state.tiles.filter(t => t.group === group);
    const others = state.tiles.filter(t => t.group !== group);
    state.tiles = [...groupTiles, ...others];
  }

  function formatPreview(items) {
    if (items.length <= 2) return items.join(", ");
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
    const colors = ["var(--yellow)", "var(--green)", "var(--blue)", "var(--purple)"];
    return colors[group % colors.length];
  }

  function save() {
    try {
      localStorage.setItem(WEEK_KEY, JSON.stringify(state));
    } catch (e) {}
  }
});
