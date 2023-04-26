const clickOutsideEvents = {};

function bind(el, binding, vnode) {
  clickOutsideEvents[vnode.key] = (event) => {
    if (!(el.parentElement === event.target || el.parentElement.contains(event.target))) {
      binding.value();
    }
  };

  document.documentElement.addEventListener('click', clickOutsideEvents[vnode.key]);
}

function unbind(el, binding, vnode) {
  document.documentElement.removeEventListener('click', clickOutsideEvents[vnode.key]);
  delete clickOutsideEvents[vnode.key];
}

const directive = {
  bind,
  unbind,
};

export default directive;
