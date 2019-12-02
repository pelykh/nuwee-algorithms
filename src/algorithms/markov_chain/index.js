const markovChain = (matrix, callback, speed) => {
  let state = 0;
  const length = matrix.length - 1;

  const interval = setInterval(() => {
    //change state by using matrix

    const random = Math.random();
    let prev = 0;

    for (let i = 0; i <= length; i++) {
      const next = prev + matrix[state][i];

      if (random >= prev && random < next) {
        state = i;
        return callback(state);
      }

      prev = next;
    }
  }, speed);
  return () => clearInterval(interval);
};

export default markovChain;
