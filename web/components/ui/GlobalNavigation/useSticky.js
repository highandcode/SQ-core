import { useEffect, useState, useRef } from 'react';

function useSticky() {
  const [isSticky, setSticky] = useState(false);
  const element = useRef(null);

  const handleScroll = () => {
    setTimeout(() => {
      if (element.current) {
        window.scrollY > element.current.getBoundingClientRect().top + element.current.getBoundingClientRect().height
          ? setSticky(true)
          : setSticky(false);
      }
    }, 100);
  };

  // This function handles the scroll performance issue
  const debounce = (func, wait = 200, immediate = true) => {
    let timeOut;
    return () => {
      let context = this,
        args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const deboundScroll = debounce(handleScroll);

  useEffect(() => {
    window.addEventListener('scroll', deboundScroll);
    return () => {
      window.removeEventListener('scroll', deboundScroll);
    };
  }, [debounce, handleScroll]);

  return { isSticky, element };
}

export default useSticky;
