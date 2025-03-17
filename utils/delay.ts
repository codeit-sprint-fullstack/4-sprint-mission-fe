const delay = (timeToDelay: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
};

export default delay;
