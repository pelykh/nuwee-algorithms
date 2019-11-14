import Population from './Population';

export default (id) => {
  const data = {};

  for (let i = 0; i < 100; i++) {
    data[Math.random()] = {
      weight: Math.floor(300 * Math.random()),
      value: Math.floor(300 * Math.random()),
    }
  }

  console.log('data', data);

  const population = new Population({
    elements: data,
    size: 100,
  });

  for (let i = 0; i < 1000; i++) {
    population.generation();
  }
}
