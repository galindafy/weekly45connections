document.addEventListener("DOMContentLoaded", () => {

const BOARD_SIZE = 45;
const GROUP_SIZE = 45;

let state = {
  tiles: [],
  selected: []
};

/* ---------- CURATED DATA ---------- */

const DATA = [
  // pasta
  ["spaghetti","penne","rigatoni","fusilli","farfalle","linguine","fettuccine","ravioli","tortellini","gnocchi","ziti","macaroni","cavatappi","rotini","bucatini","orecchiette","pappardelle","lasagna","tagliatelle","vermicelli","angel hair","ditalini","manicotti","capellini","gemelli","mafaldine","radiatori","campanelle","strozzapreti","paccheri","anelletti","bigoli","casarecce","trofie","malloreddus","lumache","fregola","mezzi rigatoni","spaghettini","cellentani","tubetti","sedani","filini","orzo","cannelloni"],

  // spices
  ["basil","oregano","thyme","rosemary","cumin","turmeric","paprika","cinnamon","nutmeg","clove","cardamom","parsley","dill","sage","tarragon","sumac","za'atar","bay leaf","fennel","anise","chives","mint","marjoram","caraway","coriander","ginger","allspice","saffron","vanilla","sesame","mustard seed","celery seed","fenugreek","star anise","lemongrass","chili powder","cayenne","garlic powder","onion powder","smoked paprika","herbes de provence","lovage","savory","asafoetida","nigella"],

  // flowers
  ["rose","tulip","daisy","lily","orchid","sunflower","daffodil","peony","lavender","marigold","hibiscus","iris","poppy","gardenia","chrysanthemum","camellia","magnolia","zinnia","cosmos","petunia","snapdragon","delphinium","hydrangea","ranunculus","anemone","gladiolus","phlox","aster","begonia","bluebell","buttercup","carnation","columbine","foxglove","geranium","heather","hollyhock","jasmine","lotus","morning glory","nasturtium","primrose","salvia","verbena","wisteria"],

  // countries
  ["France","Germany","Italy","Spain","Portugal","Netherlands","Belgium","Sweden","Norway","Denmark","Finland","Poland","Austria","Greece","Ireland","Iceland","Romania","Hungary","Croatia","Serbia","Slovakia","Slovenia","Estonia","Latvia","Lithuania","Switzerland","Ukraine","Albania","Andorra","Belarus","Bosnia","Bulgaria","Cyprus","Czech Republic","Luxembourg","Malta","Moldova","Montenegro","North Macedonia","San Marino","Kosovo","Liechtenstein","Monaco","Turkey","Vatican City"],

  // US states
  ["alabama","alaska","arizona","arkansas","california","colorado","connecticut","delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa","kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan","minnesota","mississippi","missouri","montana","nebraska","nevada","new hampshire","new jersey","new mexico","new york","north carolina","north dakota","ohio","oklahoma","oregon","pennsylvania","rhode island","south carolina","south dakota","tennessee","texas","utah","vermont"],

  // office items
  ["printer","stapler","notebook","pen","pencil","monitor","keyboard","mouse","desk","chair","whiteboard","calendar","folder","binder","paper clips","tape","scissors","highlighter","envelope","sticky notes","scanner","phone","lamp","filing cabinet","push pins","rubber bands","clipboard","hole punch","label maker","shredder","desk pad","mail tray","eraser","ruler","extension cord","surge protector","dry erase marker","bulletin board","ink cartridge
