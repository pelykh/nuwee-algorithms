import markovChain from './index';
import Stocks from './stocks';

export default (id) => {
  const stocks = new Stocks(id);
  const states = [];

  for(let i=0; i < 20; i++) {
    states.push(2);
  }

  const matrix = [
    [0.2, 0.3, 0.2, 0.2, 0.1],
    [0.3, 0.2, 0.3, 0.1, 0.1],
    [0.1, 0.3, 0.2, 0.3, 0.1],
    [0.1, 0.1, 0.3, 0.2, 0.3],
    [0.1, 0.1, 0.3, 0.3, 0.2],
  ];

  const unsubscribe = markovChain(matrix, (state) => {
    states.push(state);

    stocks.render(states);
  }, 500);

  // setTimeout(() => {
  //   unsubscribe();
  // }, 5000)
};
