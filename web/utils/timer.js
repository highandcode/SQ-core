const timer = {
  delay: (ms) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }
};

export { timer };
