[hidden] {
    display: none !important;
}

:root {
    --ink:#171717;
    ...
const designs=[
 {title:"Eid Mubarak — Urdu Typography",cat:"urdu",type:"free",price:"Free",thumb:"t1",lang:"Urdu",author:"Sarah Ahmed"},
 {title:"Punjabi Poetry Poster",cat:"punjabi",type:"premium",price:"$3",thumb:"t2",lang:"Punjabi",author:"Ali Khan"},
 {title:"Minimal Quote Collection",cat:"poster",type:"premium",price:"$5",thumb:"t3",lang:"English",author:"Maha Hussain"},
 {title:"Ramadan Social Media Pack",cat:"template",type:"premium",price:"$7",thumb:"t4",lang:"Urdu",author:"Sarah Ahmed"},
 {title:"Desi Wedding Invitation",cat:"template",type:"free",price:"Free",thumb:"t5",lang:"English",author:"Noor Studio"},
 {title:"Urdu Motivation Series",cat:"urdu",type:"premium",price:"$4",thumb:"t6",lang:"Urdu",author:"Hassan Raza"},
 {title:"Punjabi Culture Print",cat:"punjabi",type:"free",price:"Free",thumb:"t7",lang:"Punjabi",author:"Maha Hussain"},
 {title:"Modern Business Flyer",cat:"poster",type:"premium",price:"$2",thumb:"t8",lang:"English",author:"Ali Khan"}
];
const grid=document.getElementById("designGrid");
function render(list=designs){
 grid.innerHTML=list.map(d=>`<article class="design-card"><div class="thumb ${d.thumb}"><span class="tag">${d.type==="premium"?"PREMIUM":"FREE"} · ${d.lang}</span><span>${d.lang==="Urdu"?"خوبصورت ڈیزائن":d.lang==="Punjabi"?"ਸਿਰਜਣਾ":"DESIGN"}</span></div><div class="card-body"><h3>${escapeHtml(d.title)}</h3><div class="meta"><span>by ${escapeHtml(d.author)}</span><span class="price">${d.price}</span></div></div></article>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
render();
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 const f=b.dataset.filter;render(f==="all"?designs:designs.filter(d=>d.type===f||d.cat===f));
}));
document.getElementById("searchBtn").addEventListener("click",search);
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search()});
function search(){const q=document.getElementById("searchInput").value.trim().toLowerCase();render(q?designs.filter(d=>(d.title+" "+d.lang+" "+d.author+" "+d.cat).toLowerCase().includes(q)):designs);document.getElementById("explore").scrollIntoView({behavior:"smooth"})}
const backdrop=document.getElementById("modalBackdrop");
function openModal(){
  backdrop.hidden=false;
  backdrop.style.display="grid";
  document.body.style.overflow="hidden";
}

function closeModal(){
  backdrop.hidden=true;
  backdrop.style.display="none";
  document.body.style.overflow="";
}
document.getElementById("uploadTop").onclick=openModal;document.getElementById("uploadMain").onclick=openModal;document.getElementById("modalClose").onclick=closeModal;
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"){
    closeModal();
  }
});document.getElementById("uploadForm").addEventListener("submit",e=>{
 e.preventDefault();
 const form=e.currentTarget;
 form.hidden=true;
 document.getElementById("uploadSuccess").hidden=false;
 setTimeout(()=>{
   closeModal();
   form.hidden=false;
   document.getElementById("uploadSuccess").hidden=true;
   form.reset();
 },900);
});
document.getElementById("filterBtn").onclick=()=>document.getElementById("filters").classList.toggle("show");
document.getElementById("menuBtn").onclick=()=>document.getElementById("mobileMenu").classList.toggle("open");
document.querySelectorAll('a[href="#free"],a[href="#premium"]').forEach(a=>a.addEventListener("click",()=>{const target=a.getAttribute("href")==="#free"?"free":"premium";const btn=document.querySelector(`[data-filter="${target}"]`);if(btn)btn.click()}));

document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!backdrop.hidden)closeModal()});
