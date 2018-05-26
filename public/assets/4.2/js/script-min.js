let showSearch = false;
let showNavTop = false;

document.addEventListener('DOMContentLoaded', () => {
  // on click full alert
  const fullalertEl = document.getElementById('fullalert');
  if(fullalertEl)
  {
    fullalertEl.addEventListener('click', (e) => {
      if(fullalertEl.firstChild) fullalertEl.removeChild(fullalertEl.firstChild);//clear child node
    })
  }
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
      if(e.target.matches('.btn.btn-white.btn-close-modal.btn-sm.fa.fa-close'))
      {
        let {id} = e.target.parentNode.parentNode;
        if(!id) id = e.target.parentNode.parentNode.parentNode.id;
        modal('close', id);
      }

      //hide or show dropdown
      if(!e.target.matches('.dropdown-button'))
      {
          const dropdowns = document.getElementsByClassName("dropdown-items");
          for (let i = 0; i < dropdowns.length; i++) {
              let openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
              }
          }
      }else 
      {
          const target = e.target.getAttribute('data-target');
          document.getElementById(target).classList.toggle('show');
      }
  }
})

// toggle header search
function toggleSearch()
{
    showSearch = !showSearch;
    const headerEl = document.getElementsByClassName('nav-header')[0];
    const searchEl = document.getElementsByClassName('nav-search')[0];
    headerEl.style.top=(showSearch? '-50px' : '0px');
    if(showSearch) searchEl.childNodes[1].focus();
}

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
    document.getElementsByTagName('body')[0].style.overflow = 'scroll';
    removeClass(el, 'open');
  } 
}

// fullalert
window.fullalert = (type, text) => {
  const fullalertEl = document.getElementById('fullalert');
  if(fullalertEl.firstChild) fullalertEl.removeChild(fullalertEl.firstChild);//clear child node
  if(type == 'close') return true;
  // extends alert child
  const divEl = document.createElement('div');
  divEl.className = `fullalert fullalert-${type}`;
  const textNode = document.createTextNode(text);
  divEl.appendChild(textNode);
  return fullalertEl.appendChild(divEl);
}
