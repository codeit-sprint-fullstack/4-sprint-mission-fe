const delay = (timeToDelay) => {
  console.log('start delay!!');
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
};

export default delay;
