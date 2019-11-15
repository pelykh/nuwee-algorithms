import Population from './Population';

export default (id) => {
  const div = document.getElementById(id);

  div.innerHTML = `
    <div id="genetic-demo">
      <small>Score</small>
      <div id="generation-score"></div>
      <div id="generation-title">generation</div>
      <div id="generation-counter"></div>
      <div id="complete-genetic">solution found️</div>
    </div>
  `;

  const counter = document.getElementById('generation-counter');
  const score = document.getElementById(('generation-score'));
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

  population.setOnNewGeneration(() => {
    score.innerHTML = population.getBestScore();
    counter.innerHTML = population.generationNumber;
  });

  population.setOnSolutionFound(() => {
    document.getElementById('complete-genetic').style.display = 'inline-block';
  });

  population.findSolution(50);
}
