const dialog=document.querySelector('dialog');
for(const button of document.querySelectorAll('[data-lightbox]')) button.addEventListener('click',()=>{const source=button.querySelector('img');dialog.querySelector('img').src=source.src;dialog.querySelector('img').alt=source.alt;dialog.querySelector('p').textContent=source.alt;dialog.showModal();document.body.style.overflow='hidden';});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>document.body.style.overflow='');
document.querySelector('[data-top]').addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
const dishData=document.getElementById('dish-data');
if(dishData){
 const dishes=JSON.parse(dishData.textContent);let selected=0;const choices=[...document.querySelectorAll('[data-dish]')];const answer=document.getElementById('dish-answer');const reveal=document.getElementById('reveal-dish');
 function chooseDish(i){selected=i;const d=dishes[i];choices.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));document.getElementById('dish-number').textContent=String(i+1).padStart(2,'0')+' / 08';document.getElementById('dish-emoji').textContent=d[2];document.getElementById('dish-title').textContent=d[0];document.getElementById('dish-chinese').textContent=d[1];document.getElementById('dish-ingredients').textContent=d[3];document.getElementById('dish-story').textContent=d[4];const art=document.getElementById('dish-artwork');art.src=art.src.replace(/cuisine-\d+\.webp/,`cuisine-${i}.webp`);art.alt=`Original ${d[0]} menu artwork`;answer.hidden=true;reveal.setAttribute('aria-expanded','false');reveal.textContent='Reveal the dish +';document.getElementById('menu-status').textContent=`${d[0]} selected. Reveal what’s on the plate.`;}
 choices.forEach((b,i)=>b.addEventListener('click',()=>chooseDish(i)));reveal.addEventListener('click',()=>{answer.hidden=!answer.hidden;reveal.setAttribute('aria-expanded',String(!answer.hidden));reveal.textContent=answer.hidden?'Reveal the dish +':'Hide the answer −';});document.getElementById('surprise-dish').addEventListener('click',()=>chooseDish((selected+1+Math.floor(Math.random()*(dishes.length-1)))%dishes.length));chooseDish(0);
}
