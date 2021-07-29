import animateScrollTo from 'animated-scroll-to';
import { QueryString } from './query-string';
import { events } from './app-events';
let history;
let urlMapping = {};
let customHandlers = {};

export const setUrlMapping = (newMap) => {
  urlMapping = {
    ...urlMapping,
    ...newMap
  };
};

export const setHistory = (newHistory) => {
  history = newHistory;
};

export const setCustomHandlers = (newHandlers) => {
  customHandlers = {
    ...customHandlers,
    ...newHandlers
  };
};

export const redirectTo = (screen, params = {}, { target = '', ...options } = {}) => {
  if (!screen) {
    return;
  }
  events.emit('beforeRedirect', screen, params, { target });
  if (params.handler === 'custom') {
    customHandlers[params.handlerType] && customHandlers[params.handlerType](screen, params, options);
  } else {
    const url = urlMapping[screen];
    const query = new QueryString(params).toString();
    let matchedRegex;
    Object.keys(urlMapping).forEach((key) => {
      if (screen.match(new RegExp(key, 'g'))) {
        matchedRegex = key;
      }
    });
    if (url) {
      if (target === '_blank') {
        window.open(url + query);
      } else {
        setTimeout(() => {
          history.push(url + query);
        });
      }
      animateScrollTo(0);
    } else if (matchedRegex) {
      const processEdUrl = screen.replace(new RegExp(matchedRegex, 'g'), urlMapping[matchedRegex]);
      if (target === '_blank') {
        window.open(processEdUrl + query);
      } else {
        setTimeout(() => {
          history.push(processEdUrl + query);
          animateScrollTo(0);
        });
      }
    } else {
      if (target === '_blank') {
        window.open(screen + query);
      } else {
        location.href = screen + query;
      }
    }
  }
};
