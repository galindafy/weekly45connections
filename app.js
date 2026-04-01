const SIZE = 45;
const STORAGE_KEY = "weekly45";

const board = document.getElementById("board");
const mistakesEl = document.getElementById("mistakes");
const groupsEl = document.getElementById("groups");
const dateEl = document.getElementById("date");

const CATEGORY_BANK = {
  FRUITS:["apple","banana","orange","grape"],
  ANIMALS:["lion","tiger","bear","wolf"],
  DRINKS:["coffee","tea","juice","water"],
  SPORTS:["soccer","tennis","golf","hockey"],
  COLORS:["red","blue","green","yellow"],
  TECH:["Apple","Google","Microsoft","Amazon"],
  FILES:["PDF","CSV","PNG","DOCX"],
  MUSIC:["jazz","rock","pop","blues"],
  FLOWERS:["rose","tulip","lily","daisy"],
  CITIES:["Toronto","Paris","London","Tokyo"],
  COUNTRIES:["Canada","France","Japan","Brazil"],
  FOODS:["pizza","burger","pasta","salad"]
};

function weekKey(){
  const d=new Date();
  const day=d.getDay();
  const monday=new Date(d);
  monday.setDate(d.getDate()-(day===0?6:day-1));
  return `${monday.getFullYear()}-${monday.getMonth()+1}-${monday.getDate()}`;
}

function formatWord(w){
  if(/^[A-Z0-9]+$/.test(w)) return w;
  if(/[A-Z]/.test(w) && w!==w.toUpperCase()) return w;
  return w.toLowerCase();
}

function preview(words){
  const w=words.map(formatWord);
  if(w.length<=2) return w.join(", ");
  return `${w[0]}, ${w[1]}, ... [${w.length}]`;
}

function build(){
  const entries=Object.entries(CATEGORY_BANK).slice(0,SIZE);
  let groups=[], lookup={};

  entries.forEach(([name,words])=>{
    words.forEach(w=>{
      groups.push({words:[w]});
      lookup[w]=name;
    });
  });

  return {groups,lookup,mistakes:0,selected:null,key:weekKey()};
}

let state=JSON.parse(localStorage.getItem(STORAGE_KEY));
if(!state || state.key!==weekKey()) state=build();

function save(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}

function shake(i){
  const t=board.children[i];
  if(!t) return;
  t.classList.add("shake");
  setTimeout(()=>t.classList.remove("shake"),250);
}

function same(words){
  const c=state.lookup[words[0]];
  return words.every(w=>state.lookup[w]===c);
}

function merge(a,b){
  const A=state.groups[a];
  const B=state.groups[b];
  const words=[...A.words,...B.words];

  if(!same(words)){
    state.mistakes++;
    shake(b);
    return;
  }

  const merged={words};

  const newGroups=state.groups.filter((_,i)=>i!==a&&i!==b);
  newGroups.splice(b>a?b-1:b,0,merged);
  state.groups=newGroups;
}

function click(i){
  if(state.selected===null){
    state.selected=i;
    render();
    return;
  }

  if(state.selected===i){
    state.selected=null;
    render();
    return;
  }

  merge(state.selected,i);
  state.selected=null;
  save();
  render();
}

function render(){
  board.innerHTML="";
  dateEl.textContent=state.key;
  mistakesEl.textContent=state.mistakes;
  groupsEl.textContent=state.groups.length;

  state.groups.forEach((g,i)=>{
    if(!g || !g.words) return;

    const div=document.createElement("div");
    div.className="tile";

    if(g.words.length>1) div.classList.add("merged");
    if(state.selected===i) div.classList.add("selected");

    if(g.words.length>=3){
      div.classList.add("hoverable");

      const hover=document.createElement("div");
      hover.className="hover-content";
      hover.textContent=g.words.map(formatWord).join(", ");
      div.appendChild(hover);
    }

    const label=document.createElement("div");
    label.textContent=preview(g.words);
    div.appendChild(label);

    div.onclick=()=>click(i);
    board.appendChild(div);
  });
}

render();
