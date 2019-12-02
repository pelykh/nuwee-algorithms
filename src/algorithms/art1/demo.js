import ART1 from './index';

const classifiers = [];

const n = 200;
const vn = 10;

const shuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

function factorial(n) {
  return (n !== 1) ? n * factorial(n - 1) : 1;
}

for (let i = 0; i < n; i++) {
  const vector = [];
  for (let j = 0; j < vn; j++) {
    vector[j] = Math.random() > 0.5;
  }

  classifiers.push(vector);
}

for (let i = 0; i < n; i++) {
  const vector = [];
  for (let j = 0; j < vn; j++) {
    vector[j] = Math.random() > 0.2;
  }

  classifiers.push(vector);
}

for (let i = 0; i < n; i++) {
  const vector = [];
  for (let j = 0; j < vn; j++) {
    vector[j] = Math.random() > 0.8;
  }

  classifiers.push(vector);
}



export default (id) => {
  const div = document.getElementById(id);

  div.innerHTML = `
      <div id="art1-demo">
      </div>
    `;

  const art1 = new ART1();

  art1.classify(shuffleArray(classifiers));
  console.log(`Amount of elements ${n * 3}`);
  console.log(`Length of element ${vn}`);
  console.log(`Possible different elements ${factorial(vn)}`);
  console.log(`amount of classes: ${art1.prototypes.length}`, art1.prototypes);

};
