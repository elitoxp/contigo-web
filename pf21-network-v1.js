(function(){
'use strict';
if(window.PF21NetworkContactLoaded)return;
var script=document.currentScript;
var profile=script?.getAttribute('data-pf21-profile')||'';
var expected=script?.getAttribute('data-pf21-site')||'';
var title=script?.getAttribute('data-pf21-title')||'este portal';
var hostname=(location.hostname||'').toLowerCase().replace(/^www\./,'');
if(!profile||hostname!==expected)return;
window.PF21NetworkContactLoaded=true;
function start(){
 if(document.getElementById('pf21-network-contact'))return;
 var isMobile=profile==='planmovil';
 var url='https://planfibra.cl/formulario-perfiles/contact.php?perfil='+encodeURIComponent(profile);
 var style=document.createElement('style');
 style.id='pf21-network-contact-style';
 style.textContent='#pf21-network-contact{box-sizing:border-box;max-width:100%;width:100%;margin:30px auto 20px;padding:12px 14px;background:#effbf9;color:#124351;font:inherit;clear:both}'+
 '#pf21-network-contact *{box-sizing:border-box}'+
 '#pf21-network-contact .pf21-n-inner{width:min(100%,840px);margin:0 auto;padding:14px 17px;border-radius:15px;background:#fff;border:1px solid #c6e5e3;box-shadow:0 5px 22px rgba(20,60,70,.07)}'+
 '#pf21-network-contact h2{font:800 clamp(20px,3vw,24px)/1.25 system-ui,sans-serif;color:#145365;margin:0 0 6px}'+
 '#pf21-network-contact p{font:400 13px/1.5 system-ui,sans-serif;color:#486872;margin:0 0 10px}'+
 '#pf21-network-contact button{border:0;min-height:43px;border-radius:10px;padding:10px 16px;background:#087b7d;color:#fff;font:700 14px/1.3 system-ui,sans-serif;cursor:pointer}'+
 '#pf21-network-contact iframe[hidden]{display:none!important}'+
 '#pf21-network-contact iframe{width:100%;max-width:100%;height:710px;min-height:420px;display:block;margin:14px auto 0;border:0;background:white;border-radius:12px}'+
 '#pf21-network-contact .pf21-n-link{font:400 12px/1.5 system-ui,sans-serif;margin:9px 0 0}'+
 '#pf21-network-contact a{color:#076b77;text-decoration:underline}'+
 '@media(max-width:600px){#pf21-network-contact{padding:10px;margin:15px 0}#pf21-network-contact .pf21-n-inner{padding:11px}}';
 document.head.appendChild(style);
 var box=document.createElement('section');box.id='pf21-network-contact';
 box.setAttribute('aria-label','Contacto oficial del portal');
 var h=document.createElement('div');h.className='pf21-n-inner';
 var titleEl=document.createElement('h2');titleEl.textContent=isMobile?'Consulta planes y portabilidad Movistar':'¿Necesitas ayuda con '+title+'?';
 var intro=document.createElement('p');intro.textContent=isMobile?'Consulta sobre planes móviles, portabilidad, fibra o televisión Movistar. Sin precios inventados ni solicitudes de documentos.':'Envíanos una consulta sobre este portal o solicita orientación para contratar Internet. Es opcional y no modifica los servicios de esta página.';
 var btn=document.createElement('button');btn.type='button';btn.textContent='Escribir consulta';btn.setAttribute('aria-expanded','false');
 var frame=document.createElement('iframe');frame.id='pf21-network-frame';frame.title='Formulario de contacto de '+title;frame.referrerPolicy='strict-origin-when-cross-origin';frame.hidden=true;frame.loading=isMobile?'eager':'lazy';frame.src='about:blank';
 var link=document.createElement('p');link.className='pf21-n-link';
 var a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Abrir el formulario en PlanFibra.cl';link.appendChild(a);
 h.appendChild(titleEl);h.appendChild(intro);h.appendChild(btn);h.appendChild(frame);h.appendChild(link);box.appendChild(h);
 var footer=document.querySelector('footer');
 if(footer&&footer.parentNode)footer.parentNode.insertBefore(box,footer);else document.body.appendChild(box);
 var opened=false,ready=false;
 function open(){
   if(!opened){frame.src=url;opened=true;}
   frame.hidden=false;btn.setAttribute('aria-expanded','true');btn.textContent='Ocultar formulario';
 }
 function close(){frame.hidden=true;btn.setAttribute('aria-expanded','false');btn.textContent='Escribir consulta';}
 btn.addEventListener('click',function(){if(frame.hidden)open();else close();});
 window.addEventListener('message',function(ev){
   if(ev.origin!=='https://planfibra.cl'||ev.source!==frame.contentWindow||!ev.data||ev.data.type!=='pf21-network-resize')return;
   var height=Number(ev.data.height);if(height>=420&&height<=2800)frame.style.height=Math.ceil(height)+'px';
   if(isMobile&&!ready){
      ready=true;
      var legacy=document.getElementById('quick-lead');
      if(legacy){legacy.hidden=true;legacy.inert=true;legacy.style.setProperty('display','none','important');}
      document.querySelectorAll('a[href="#quick-lead"],a[href="#cotizar"],a[href="#contacto"]').forEach(function(n){n.href='#pf21-network-contact';});
   }
 });
 if(isMobile){open();}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
