const SIZE = 45;
const STORAGE_KEY = "weekly45-real-v2";

/* reuse SAME CATEGORY_BANK above but expanded (copy-paste and extend) */

/* key difference */
function weekKey(){
  const d=new Date();
  const day=d.getDay();
  const monday=new Date(d);
  monday.setDate(d.getDate()-(day===0?6:day-1));
  return `${monday.getFullYear()}-${String(monday.getMonth()+1).padStart(2,"0")}-${String(monday.getDate()).padStart(2,"0")}`;
}

/* use weekKey instead of dayKey */
