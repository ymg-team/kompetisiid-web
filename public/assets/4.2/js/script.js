let showSearch = false;
let showNavTop = false;

document.addEventListener('DOMContentLoaded', () => {
  //show/hide search box
  const btnSearchEl = document.getElementById('btn-search');
  if(btnSearchEl)
  {
    btnSearchEl.addEventListener('click', (e) => {
      toggleSearch();
    })
    document.getElementById('btn-closesearch').addEventListener('click', (e) => {
      toggleSearch();
    })
    //togle nav menu
    document.getElementById('btn-show-nav').addEventListener('click', (e) => {
        toggleNavTop();
    })
    document.getElementById('btn-hide-nav').addEventListener('click', (e) => {
        toggleNavTop();
    })
  }

  // dropdown
  window.onclick = (e) => {
      // show hide modal
      if(e.target.matches('.btn.btn-white.btn-close-modal.btn-sm.fas.fa-times'))
      {
        let {id} = e.target.parentNode.parentNode;
        if(!id) id = e.target.parentNode.parentNode.parentNode.id;
        modal('close', id);
      }

      // close all active dropdown
      const dropdowns = document.getElementsByClassName("dropdown-items");
      for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }

      const target = e.target.getAttribute('data-target');
      if(target) document.getElementById(target).classList.toggle('show');
  }
})

// togle nav top
function toggleNavTop()
{
  showNavTop = !showNavTop;
  const el = document.getElementById('top-menu');
  el.style.left=(showNavTop ? '0' : '-50%');
}

// check is el has class
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

// add class to el
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else if (!hasClass(el, className)) 
    el.className += " " + className;
}

// remove class from el
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
}

// modal
function modal(act, target)
{
  const el = document.getElementById(target);
  if(act=='open') {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    addClass(el, 'open');
  }
  if(act=='close') {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    removeClass(el, 'open');
  } 
}
