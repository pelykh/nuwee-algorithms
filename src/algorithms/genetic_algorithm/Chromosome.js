const sample = arr => arr[Math.floor(Math.random() * arr.length)];

class Chromosome {
  constructor(props) {
    this.weight = 0;
    this.value = 0;
    this.score = null;
    this.maxWeight = 1000;
    this.mutationRate = 0.7;


    this.members = {};
    const elements = Object.keys(props.members);

    elements.forEach((element) => {
      this.members[element] = {...props.members[element]};
      if (typeof this.members[element]['active'] == 'undefined') {
        this.members[element]['active'] = Math.round(Math.random());
      }
    });

    this.mutate();
    this.calculateScore();
  }

  mateWith(other) {
    const elements = Object.keys(this.members);
    const child1 = {};
    const child2 = {};
    const pivot = Math.round(Math.random() * (elements.length - 1));
    let i = 0;

    elements.forEach((element) => {
      if (i > pivot) {
        child1[element] = {...this.members[element]};
        child2[element] = {...other.members[element]};
      } else {
        child1[element] = {...other.members[element]};
        child2[element] = {...this.members[element]};
      }
      i++;
    });

    return [
      new Chromosome({members: child1}),
      new Chromosome({members: child2}),
    ];
  }


  mutate() {
    if (Math.random() > this.mutationRate) {
      return false;
    }
    const element = sample(Object.keys(this.members));
    this.members[element].active = Number(!this.members[element].active);

  }

  calculateScore() {
    if (this.score) return this.score;
    this.value = 0;
    this.weight = 0;
    this.score = 0;

    Object.entries(this.members).forEach(([key, value]) => {
      if (value.active) {
        this.value += value.value;
        this.weight += value.weight;
      }

      this.score = this.value;

      if (this.weight > this.maxWeight) {
        this.score -= (this.weight - this.maxWeight) * 50;
      }
    });

    return this.score;
  }
}

export default Chromosome;
