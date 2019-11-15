import Chromosome from './Chromosome';

class Population {
  constructor(props) {
    this.generationNumber = 0;
    this.elements = props.elements || false;
    this.size = props.size || 10;
    this.elitism = 0.2;
    this.chromosomes = [];
    this.onNewGeneration = null;
    this.onSolutionFound = null;

    this.fill();
  }

  fill() {
    // console.log('Fill chromosomes');
    while (this.chromosomes.length < this.size) {
      if (this.chromosomes.length < this.size / 3) {
        this.chromosomes.push(new Chromosome({members: this.elements}));
      } else {
        this.mate()
      }
    }
  }

  sort() {
    this.chromosomes.sort((a, b) => b.calculateScore() - a.calculateScore());
  }

  kill() {
    // console.log('Kill chromosomes');
    const target = Math.floor(this.elitism * this.chromosomes.length);
    while (this.chromosomes.length > target) {
      this.chromosomes.pop();
    }
  };

  mate() {
    const key1 = Math.floor(Math.random() * (this.chromosomes.length));
    let key2 = key1;

    while (key2 === key1) {
      key2 = Math.floor(Math.random() * (this.chromosomes.length));

      const children = this.chromosomes[key1].mateWith(this.chromosomes[key2]);
      this.chromosomes = this.chromosomes.concat(children);
    }
  }

  getBestScore() {
    return this.chromosomes[0].score;
  }

  setOnNewGeneration(value) {
    this.onNewGeneration = value;
  }

  setOnSolutionFound(value) {
    this.onSolutionFound = value;
  }

  generation() {
    this.generationNumber += 1;
    this.sort();
    this.kill();
    this.mate();
    this.fill();
    this.sort();

    this.onNewGeneration && this.onNewGeneration(this);
  }

  recursiveGeneration(bestGeneration, bestScore, timeout = 100) {
    setTimeout(() => {
      this.generation();

      if (this.generationNumber - bestGeneration >= 100) {
        this.onSolutionFound && this.onSolutionFound(this);
        return true;
      }

      const currentBestScore = this.getBestScore();

      if (bestScore < currentBestScore) {
        this.recursiveGeneration(this.generationNumber, currentBestScore, timeout);
      } else {
        this.recursiveGeneration(bestGeneration, bestScore, timeout)
      }
    }, timeout);
  }

  findSolution(timeout = 100) {
    this.recursiveGeneration(0, 0, timeout);
  }
}

export default Population;
