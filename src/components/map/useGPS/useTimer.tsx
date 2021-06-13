const useTimer = (waitTime?: number) => {
  const timerList: Array<NodeJS.Timeout> = [];

  const run: (waitTime: number) => Promise<void> = (waitTime: number) => new Promise(resolve => {
    clear();
    timerList.push(setTimeout(() => {
      clear();
      resolve();
    }, waitTime));
  });

  const clear = () => {
    timerList.forEach(clearTimeout);
    timerList.length = 0;
  }


  return ({
    run,
    clear,
  });
}

export default useTimer;