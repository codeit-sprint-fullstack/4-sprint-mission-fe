const delay = (timeToDelay) => {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
};

export default delay;
