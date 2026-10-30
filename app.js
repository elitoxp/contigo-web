'use strict';
const $=(selector)=>document.querySelector(selector);
let projects=[],selection='Todos',query='';
const palette=[['#334377','#122340'],['#425454','#142e46'],['#553b75','#22183d'],['#5b3a52','#1c2343'],['#41695e','#132d32'],['#3b486b','#17243c'],['#614568','#182a53']];
const colors=(i)=>{const [a,b]=palette[i%palette.length];return '--g1:'+a+';--g2:'+b};
const safe=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=(p)=>'images/'+encodeURIComponent(p.slug)+'.webp';
const hostname=(p)=>{try {return new URL(p.url).hostname} catch {return ''}};
function pic(p,first=false){return '<img src="'+image(p)+'" alt="Vista previa de '+safe(p.name)+'" '+(first?'fetchpriority="high"':'loading="lazy"')+' onerror="this.remove()">'}
function feature(p,i){
 return '<a class="feature-card" href="'+safe(p.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Visitar '+safe(p.name)+'">'
 +'<div class="feature-visual" style="'+colors(i)+'">'+pic(p,i===0)+'</div>'
 +'<span class="feature-number">EL UNIVERSO / '+String(i+1).padStart(2,'0')+'</span>'
 +'<div class="feature-body"><span class="feature-icon" aria-hidden="true">'+p.emoji+'</span><h3>'+safe(p.name)+'</h3><p>'+safe(p.description)+'</p></div>'
 +'<span class="feature-arrow" aria-hidden="true">↗</span></a>';
}
function tile(p,i){
 return '<a class="project-card" href="'+safe(p.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Explorar '+safe(p.name)+'">'
 +'<div class="project-image" style="'+colors(i)+'">'+pic(p)+'<span class="project-emoji" aria-hidden="true">'+p.emoji+'</span><span class="project-cat">'+safe(p.category)+'</span></div>'
 +'<div class="project-info"><h3>'+safe(p.name)+'</h3><p>'+safe(p.description)+'</p>'
 +'<div class="project-link"><span>'+safe(hostname(p))+'</span><span aria-hidden="true">↗</span></div></div></a>';
}
function lab(p){return '<article class="lab-card"><span class="lab-emoji" aria-hidden="true">'+p.emoji+'</span><h3>'+safe(p.name)+'</h3><p>'+safe(p.description)+'</p><span class="lab-status">Acceso interno · protegido</span></article>'}
function renderFilters(){
 const cats=['Todos',...new Set(projects.filter(p=>p.kind==='public').map(p=>p.category))];
 $('#filters').innerHTML=cats.map(c=>'<button class="filter'+(selection===c?' active':'')+'" type="button" data-category="'+safe(c)+'" aria-pressed="'+(selection===c)+'">'+safe(c)+(c==='Todos'?' ('+projects.filter(x=>x.kind==='public').length+')':'')+'</button>').join('');
 $('#filters').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selection=b.dataset.category;renderFilters();renderProjects()}));
}
function renderProjects(){
 const publicSites=projects.filter(p=>p.kind==='public');
 const q=query.trim().toLocaleLowerCase('es');
 const results=publicSites.filter(p=>(selection==='Todos'||p.category===selection)&&[p.name,p.description,p.category,p.url].join(' ').toLocaleLowerCase('es').includes(q));
 $('#projectsGrid').innerHTML=results.map((p,i)=>tile(p,i)).join('');
 $('#resultCount').textContent=results.length+' '+(results.length===1?'proyecto':'proyectos')+' encontrados';
 $('#empty').hidden=results.length!==0;
}
async function start(){
 try{
  const response=await fetch('site-data.json',{cache:'no-cache'});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();projects=data.projects;
  const pubs=projects.filter(p=>p.kind==='public');
  const feat=pubs.filter(p=>p.featured).slice(0,8);
  $('#siteCount').textContent=pubs.length;
  $('#areaCount').textContent=new Set(projects.map(p=>p.category)).size;
  $('#featuredGrid').innerHTML=feat.map(feature).join('');
  $('#labGrid').innerHTML=projects.filter(p=>p.kind==='internal').map(lab).join('');
  $('#search').addEventListener('input',e=>{query=e.target.value;renderProjects()});
  renderFilters();renderProjects();
 }catch(e){
  console.error('Directorio no disponible',e);
  $('#featuredGrid').innerHTML='<p>El directorio está temporalmente no disponible.</p>';
  $('#projectsGrid').innerHTML='<p>No se pudo cargar la lista de proyectos. Intenta nuevamente.</p>';
 }
}
document.addEventListener('DOMContentLoaded',start);

