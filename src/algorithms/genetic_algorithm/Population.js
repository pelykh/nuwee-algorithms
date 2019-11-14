import Chromosome from './Chromosome';

class Population {
  constructor(props) {
    this.generationNumber = 0;
    this.elements = props.elements || false;
    this.size = props.size || 10;
    this.elitism = 0.2;
    this.chromosomes = [];

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

  generation() {
    this.generationNumber += 1;
    this.sort();
    this.kill();
    this.mate();
    this.fill();
    this.sort();
    console.log(`Next generation ${this.generationNumber} with score ${this.chromosomes[0].score}`, this.chromosomes);
  }
}

export default Population;
