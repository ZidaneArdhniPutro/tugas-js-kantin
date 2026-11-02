var CATS=["Makanan","Minuman","Snack"],COL={Makanan:"var(--c1)",Minuman:"var(--c2)",Snack:"var(--c3)"};
var ID={weekdays:{shorthand:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],longhand:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]},months:{shorthand:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],longhand:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]},firstDayOfWeek:1,rangeSeparator:" - "};
var WD=ID.weekdays.shorthand,MO=ID.months.shorthand;
var DV=[220,164,198,220,194,154,260].map(function(v){return v*1000}),TXD=[3,2,3,3,3,3,4];
function rnd(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function share(total,i){
  var w=DV.map(function(v,j){return v*(.7+.6*rnd(i*9+j))}),s=w.reduce(function(a,b){return a+b},0),
  ex=w.map(function(x){return x/s*total}),q=ex.map(function(x){return Math.floor(x)}),
  rem=total-q.reduce(function(a,b){return a+b},0),
  ord=ex.map(function(x,j){return[x-q[j],j]}).sort(function(a,b){return b[0]-a[0]});
  for(var k=0;k<rem;k++)q[ord[k][1]]++;return q}
var P=[["Nasi Goreng","Makanan",10000,38],["Mie Ayam","Makanan",8000,23],["Nasi Uduk","Makanan",7000,23],["Air Mineral","Minuman",4000,34],["Es Teh Manis","Minuman",3000,42],["Es Jeruk","Minuman",5000,18],["Pisang Goreng Coklat","Snack",3000,30],["Roti Bakar","Snack",8000,14],["Risoles","Snack",3000,32],["Kentang Goreng","Snack",5000,7]].map(function(a,i){return{name:a[0],cat:a[1],price:a[2],q:share(a[3],i)}});
var sel=CATS.slice(),sk="omzet",sd=-1,qs="",pg=1,PER=5,r0=new Date(2026,9,17),r1=new Date(2026,9,23),DAYS=[];
var rp=function(n){return"Rp"+Math.round(n).toLocaleString("id-ID")},$=function(i){return document.getElementById(i)};
var inSel=function(p){return sel.indexOf(p.cat)>-1},sum=function(a){return a.reduce(function(x,y){return x+y},0)};
function calc(){
  DAYS=[];var d=new Date(r0);while(d<=r1){DAYS.push(new Date(d));d.setDate(d.getDate()+1)}
  var di=DAYS.map(function(d){var i=d.getDate()-17;return d.getFullYear()===2026&&d.getMonth()===9&&i>=0&&i<7?i:-1});
  P.forEach(function(p){p.day=di.map(function(i){return i<0?0:p.q[i]});p.qty=sum(p.day);p.omzet=p.qty*p.price});
  return di}
function bar(dv){
  var n=dv.length,W=640,rot=n>10,B=rot?46:24,T=8,H=rot?252:230,L=44,h=H-B-T,mx=Math.max.apply(null,dv.concat([1])),
  steps=[1e4,2e4,5e4,1e5,2e5,5e5,1e6,2e6,5e6],st=steps[steps.length-1];
  for(var k=0;k<steps.length;k++){if(mx/steps[k]<=6){st=steps[k];break}}
  var top=Math.ceil(mx/st)*st,s="<svg viewBox='0 0 "+W+" "+H+"' width='100%' style='display:block'>";
  for(var v=0;v<=top;v+=st){var y=T+h-v/top*h;s+="<line x1='"+L+"' x2='"+W+"' y1='"+y+"' y2='"+y+"' stroke='var(--bd)'/><text x='"+(L-8)+"' y='"+(y+3)+"' text-anchor='end' font-size='10' fill='var(--mu)'>"+(v?v/1000+"rb":"0rb")+"</text>"}
  var step=(W-L)/n,bw=Math.min(30,step*.62);
  dv.forEach(function(v,i){
    var bh=v/top*h,x=L+step*i+(step-bw)/2,cx=x+bw/2,d=DAYS[i],lb=WD[d.getDay()]+", "+d.getDate(),ty=rot?T+h+12:H-8;
    s+="<rect x='"+x+"' y='"+(T+h-bh)+"' width='"+bw+"' height='"+bh+"' rx='3' fill='var(--c1)'><title>"+lb+": "+rp(v)+"</title></rect>";
    s+="<text x='"+cx+"' y='"+ty+"' text-anchor='"+(rot?"end":"middle")+"' font-size='"+(rot?9.5:10)+"' fill='var(--mu)'"+(rot?" transform='rotate(-45 "+cx+" "+ty+")'":"")+">"+lb+"</text>"});
  $("bar").innerHTML=s+"</svg>"}
function donut(vs){
  var sm={};CATS.forEach(function(c){sm[c]=0});vs.forEach(function(p){sm[p.cat]+=p.qty});
  var tot=sum(CATS.map(function(c){return sm[c]})),a=-Math.PI/2,r=62,sw=16,cx=100,cy=100,s="<svg viewBox='0 0 200 200' width='100%' height='200' style='display:block'>";
  if(!tot){s+="<circle cx='100' cy='100' r='"+r+"' fill='none' stroke='var(--bd)' stroke-width='"+sw+"'/>"}
  else CATS.forEach(function(c){if(!sm[c])return;var f=sm[c]/tot;
    if(f>=.9999){s+="<circle cx='100' cy='100' r='"+r+"' fill='none' stroke='"+COL[c]+"' stroke-width='"+sw+"'/>";return}
    var b=a+f*2*Math.PI,g=.012,x1=cx+r*Math.cos(a+g),y1=cy+r*Math.sin(a+g),x2=cx+r*Math.cos(b-g),y2=cy+r*Math.sin(b-g);
    s+="<path d='M"+x1+" "+y1+" A"+r+" "+r+" 0 "+(f>.5?1:0)+" 1 "+x2+" "+y2+"' fill='none' stroke='"+COL[c]+"' stroke-width='"+sw+"'><title>"+c+": "+sm[c]+" porsi</title></path>";a=b});
  $("donut").innerHTML=s+"</svg>";
  $("leg").innerHTML=CATS.filter(function(c){return sel.indexOf(c)>-1}).map(function(c){return"<span><i style='background:"+COL[c]+"'></i>"+c+"</span>"}).join("")}
function btn(l,p,dis,act){return"<button class='pb"+(act?" act":"")+"' data-p='"+p+"'"+(dis?" disabled":"")+" aria-label='Halaman "+p+"'>"+l+"</button>"}
function table(){
  var rows=P.filter(inSel).filter(function(p){return p.name.toLowerCase().indexOf(qs.toLowerCase())>-1});
  rows.sort(function(a,b){var x=a[sk],y=b[sk];return(x<y?-1:x>y?1:0)*sd});
  var pages=Math.max(1,Math.ceil(rows.length/PER));pg=Math.min(pg,pages);
  var part=rows.slice((pg-1)*PER,pg*PER);
  $("tb").innerHTML=part.length?part.map(function(p){return"<tr><td>"+p.name+"</td><td><span class='tag t-"+p.cat+"'>"+p.cat.toUpperCase()+"</span></td><td>"+p.qty+"</td><td class='r'>"+rp(p.omzet)+"</td><td class='r' style='width:40px'><button class='del' data-n='"+p.name+"' aria-label='Hapus "+p.name+"'><svg class='i' viewBox='0 0 24 24'><path d='M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6'/></svg></button></td></tr>"}).join(""):"<tr><td colspan='5' class='empty'>Tidak ada produk yang cocok.</td></tr>";
  $("pc").textContent=rows.length+" produk";
  document.querySelectorAll("th[data-k]").forEach(function(t){var on=t.dataset.k===sk;t.classList.toggle("sorted",on);t.querySelector(".ar").textContent=on?(sd>0?"▲":"▼"):"▲"});
  var h=btn("«",1,pg===1)+btn("‹",pg-1,pg===1);
  for(var i=1;i<=pages;i++)h+=btn(i,i,false,i===pg);
  $("pg").innerHTML=h+btn("›",pg+1,pg===pages)+btn("»",pages,pg===pages)}
function cat(){
  var h=sel.map(function(c){return"<span class='chip'>"+c+"<button data-c='"+c+"' aria-label='Hapus "+c+"'>×</button></span>"}).join("");
  var rest=CATS.filter(function(c){return sel.indexOf(c)<0});
  h+="<div class='menu' id='mn'>"+(rest.length?rest.map(function(c){return"<div data-a='"+c+"'>"+c+"</div>"}).join(""):"<div style='cursor:default'>Semua kategori dipilih</div>")+"</div>";
  $("cat").innerHTML=h}
function render(){
  var di=calc(),vs=P.filter(inSel),n=DAYS.length,fm=function(d){return d.getDate()+" "+MO[d.getMonth()]};
  var dv=DAYS.map(function(_,k){return sum(vs.map(function(p){return p.day[k]*p.price}))}),
  da=DAYS.map(function(_,k){return sum(P.map(function(p){return p.day[k]*p.price}))}),
  om=sum(dv),q=sum(vs.map(function(p){return p.qty})),tx=0;
  di.forEach(function(i,k){if(i>=0&&da[k])tx+=TXD[i]*dv[k]/da[k]});
  $("sub").textContent=fm(r0)+" – "+fm(r1)+" · "+sel.length+" kategori · "+vs.length+" produk";
  $("k1").textContent=rp(om);$("k1s").textContent="Rata-rata "+rp(om/n)+" per hari";
  $("k2").textContent=q;$("k2s").textContent="Dari "+vs.length+" produk yang laku";
  $("k3").textContent=Math.round(tx);$("k3s").textContent="Dalam "+n+" hari";
  bar(dv);donut(vs);table();cat()}
document.addEventListener("click",function(e){
  var t=e.target,d=t.closest(".del"),th=t.closest("th[data-k]"),b=t.closest("[data-c]"),a=t.closest("[data-a]"),pb=t.closest("[data-p]");
  if(d){P=P.filter(function(p){return p.name!==d.dataset.n});render();return}
  if(pb){if(!pb.disabled){pg=+pb.dataset.p;table()}return}
  if(th){var k=th.dataset.k;if(sk===k)sd=-sd;else{sk=k;sd=k==="name"||k==="cat"?1:-1}pg=1;table();return}
  if(b){sel=sel.filter(function(c){return c!==b.dataset.c});pg=1;render();e.stopPropagation();return}
  if(a){sel.push(a.dataset.a);sel.sort(function(x,y){return CATS.indexOf(x)-CATS.indexOf(y)});pg=1;render();return}
  if(t.closest("#cat")){var m=$("mn");if(m)m.classList.toggle("show");return}
  var m2=$("mn");if(m2)m2.classList.remove("show")});
$("q").addEventListener("input",function(e){qs=e.target.value;pg=1;table()});
function isDark(){var r=document.documentElement;return r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
function paint(){var d=isDark();$("tl").textContent=d?"Mode terang":"Mode gelap";$("tg").textContent=d?"☀️ Terang":"🌙 Malam"}
function flip(){document.documentElement.dataset.theme=isDark()?"light":"dark";paint()}
$("theme").addEventListener("click",flip);$("tg").addEventListener("click",flip);
document.documentElement.dataset.theme=isDark()?"dark":"light";paint();
var fp=null;
if(window.flatpickr){
  fp=flatpickr($("dt"),{mode:"range",locale:ID,dateFormat:"d M Y",defaultDate:[r0,r1],disableMobile:true,onChange:function(d){if(d.length===2){r0=d[0];r1=d[1];pg=1;render()}}});
  $("dt").parentNode.addEventListener("click",function(){fp.open()})}
render();
