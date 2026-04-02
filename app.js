const SIZE = 45;
const STORAGE_KEY = "weekly45-real-v2";

/* ---------- CATEGORY BANK (REAL NYT-STYLE) ---------- */
const CATEGORY_BANK = [
  {title:"Dog breeds", words:[
    "beagle","poodle","boxer","corgi","husky","rottweiler","dalmatian","chihuahua",
    "doberman","bulldog","greyhound","mastiff","akita","samoyed","collie","shepherd",
    "terrier","pointer","retriever","spaniel"
  ]},
  {title:"European countries", words:[
    "France","Germany","Italy","Spain","Portugal","Sweden","Norway","Denmark",
    "Finland","Poland","Austria","Belgium","Greece","Ireland","Switzerland",
    "Netherlands","Hungary","Croatia","Czechia","Slovakia"
  ]},
  {title:"U.S. states", words:[
    "California","Texas","Florida","Ohio","Nevada","Oregon","Arizona","Georgia",
    "Alaska","Hawaii","Utah","Idaho","Kansas","Iowa","Maine","Vermont",
    "Indiana","Michigan","Colorado","Montana"
  ]},
  {title:"Medical TV shows", words:[
    "Grey’s Anatomy","Scrubs","House","ER","Chicago Med","New Amsterdam",
    "The Good Doctor","Transplant","Nip/Tuck","Private Practice","The Resident",
    "Call the Midwife","Doc Martin","Saving Hope","Casualty","Holby City",
    "St. Denis Medical","Heartbeat","Diagnosis Murder","Code Black"
  ]},
  {title:"Pasta types", words:[
    "spaghetti","penne","fusilli","rigatoni","farfalle","linguine","tagliatelle",
    "macaroni","orecchiette","gnocchi","ravioli","tortellini","cavatappi",
    "ziti","fettuccine","lasagna","pappardelle","capellini","rotini","conchiglie"
  ]},
  {title:"Spices", words:[
    "cinnamon","nutmeg","paprika","cumin","turmeric","ginger","cardamom",
    "clove","saffron","oregano","basil","thyme","rosemary","parsley",
    "chili","garlic","onion powder","coriander","fenugreek","sumac"
  ]},
  {title:"Things at the beach", words:[
    "towel","umbrella","sunscreen","cooler","sandals","sunglasses","bucket",
    "shovel","surfboard","beach ball","chair","flip flops","kite","blanket",
    "snorkel","fins","shells","sandcastle","lifeguard","pier"
  ]},
  {title:"Things in the office", words:[
    "stapler","printer","keyboard","mouse","monitor","binder","paper","pen",
    "pencil","desk","chair","notebook","calendar","whiteboard","marker",
    "scanner","folder","cabinet","phone","lamp"
  ]},
  {title:"Flowers", words:[
    "rose","tulip","daisy","lily","orchid","sunflower","peony","lavender",
    "iris","poppy","daffodil","jasmine","lotus","hibiscus","carnation",
    "gardenia","bluebell","snapdragon","marigold","chrysanthemum"
  ]},
  {title:"Insects", words:[
    "ant","bee","wasp","hornet","butterfly","moth","beetle","ladybug",
    "dragonfly","grasshopper","cricket","termite","cockroach","fly",
    "mosquito","flea","tick","aphid","weevil","cicada"
  ]},
  {title:"Technology products", words:[
    "iPhone","iPad","MacBook","Surface","ThinkPad","Pixel","Galaxy",
    "PlayStation","Xbox","Switch","AirPods","Kindle","Fitbit","Echo",
    "Nest","Chromecast","GoPro","Roku","Fire Stick","Tile"
  ]},
  {title:"Appliances", words:[
    "fridge","oven","microwave","dishwasher","toaster","blender","mixer",
    "kettle","coffee maker","air fryer","slow cooker","freezer","dryer",
    "washer","stove","range hood","garbage disposal","rice cooker",
    "juicer","vacuum"
  ]},
  {title:"Animals", words:[
    "lion","tiger","bear","wolf","fox","zebra","giraffe","elephant",
    "rhino","hippo","kangaroo","koala","panda","cheetah","leopard",
    "buffalo","camel","otter","sloth","hyena"
  ]},
  {title:"Professions", words:[
    "doctor","lawyer","teacher","engineer","chef","nurse","pilot",
    "dentist","architect","plumber","electrician","carpenter",
    "designer","writer","editor","journalist","photographer",
    "mechanic","firefighter","paramedic"
  ]}
];

/* ---------- CORE LOGIC (UNCHANGED / STABLE) ---------- */

/* key difference */
function weekKey(){
  const d=new Date();
  const day=d.getDay();
  const monday=new Date(d);
  monday.setDate(d.getDate()-(day===0?6:day-1));
  return `${monday.getFullYear()}-${String(monday.getMonth()+1).padStart(2,"0")}-${String(monday.getDate()).padStart(2,"0")}`;
}

/* use weekKey instead of dayKey */
