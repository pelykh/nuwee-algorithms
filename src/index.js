import Colony from './algorithms/aco/Colony';
import Graph from './graph';

const graph = new Graph('canvas');
const counter = document.getElementById('counter');

document.getElementById('start-button')
  .addEventListener('click', () => {
    graph.unsubscribe();
    counter.style.display = 'block';
    const distances = graph.edges;
    const popSize = document.getElementById('pop-size-input').value || 20;
    const maxIterations = document.getElementById('iterations-input').value || 200;
    const alpha = document.getElementById('alpha-input').value || 1;
    const beta = document.getElementById('beta-input').value || 2;
    const pho = document.getElementById('pho-input').value || 0.1;
    const ip = document.getElementById('ip-input').value || 1;
    const q = document.getElementById('q-input').value || 1;

    const colony = new Colony(popSize, maxIterations, distances, alpha, beta, pho, ip, q);
    colony.initialise();
    colony.setOnIteration((x, pheromones) => {
      counter.innerHTML = `Running ${x}`;
      graph.render(pheromones);
    });
    colony.setOnNewBest((x) => {
        counter.innerHTML = `Complete ${x}`;
    });

    colony.iterate();
  });
