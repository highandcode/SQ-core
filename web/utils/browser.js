const _body = document.body;

const order = ['xs', 'sm', 'md', 'lg', 'xlg'];

const breakpoints = {
  current: () => {
    var styles = window.getComputedStyle(_body, ':after');
    var content = styles['content'];
    return (content || 'xs').replace(/"/g, '').replace(/'/g, '');
  },
  down: (breakpoint) => {
    const current = breakpoints.current();
    const currentIdx = order.indexOf(current);
    const breakIdx = order.indexOf(breakpoint);
    if (currentIdx <= breakIdx) {
      return true;
    }
    return false;
  },
  up: (breakpoint) => {
    const current = breakpoints.current();
    const currentIdx = order.indexOf(current);
    const breakIdx = order.indexOf(breakpoint);
    if (currentIdx >= breakIdx) {
      return true;
    }
    return false;
  }
};

export default { breakpoints };
