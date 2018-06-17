let showSearch=!1;let showNavTop=!1;document.addEventListener('DOMContentLoaded',()=>{const btnSearchEl=document.getElementById('btn-search');if(btnSearchEl)
{btnSearchEl.addEventListener('click',(e)=>{toggleSearch()})
document.getElementById('btn-closesearch').addEventListener('click',(e)=>{toggleSearch()})
document.getElementById('btn-show-nav').addEventListener('click',(e)=>{toggleNavTop()})
document.getElementById('btn-hide-nav').addEventListener('click',(e)=>{toggleNavTop()})}
window.onclick=(e)=>{if(e.target.matches('.btn.btn-white.btn-close-modal.btn-sm.fas.fa-times'))
{let{id}=e.target.parentNode.parentNode;if(!id)id=e.target.parentNode.parentNode.parentNode.id;modal('close',id)}
if(!e.target.matches('.dropdown-button'))
{const dropdowns=document.getElementsByClassName("dropdown-items");for(let i=0;i<dropdowns.length;i++){let openDropdown=dropdowns[i];if(openDropdown.classList.contains('show')){openDropdown.classList.remove('show')}}}else{const target=e.target.getAttribute('data-target');document.getElementById(target).classList.toggle('show')}}})
function toggleNavTop()
{showNavTop=!showNavTop;const el=document.getElementById('top-menu');el.style.left=(showNavTop?'0':'-50%')}
function hasClass(el,className){if(el.classList)
return el.classList.contains(className);else return!!el.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))}
function addClass(el,className){if(el.classList)
el.classList.add(className);else if(!hasClass(el,className))
el.className+=" "+className}
function removeClass(el,className){if(el.classList)
el.classList.remove(className);else if(hasClass(el,className)){var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');el.className=el.className.replace(reg,' ')}}
function modal(act,target)
{const el=document.getElementById(target);if(act=='open'){document.getElementsByTagName('body')[0].style.overflow='hidden';addClass(el,'open')}
if(act=='close'){document.getElementsByTagName('body')[0].style.overflow='auto';removeClass(el,'open')}}
