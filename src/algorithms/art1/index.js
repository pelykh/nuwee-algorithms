class ART1 {
  constructor() {
    this.rho = 0.5; // (0;1)
    this.beta = 1; // beta > 0

    this.prototypes = [];
  }

  classify(array) {
    if (this.prototypes.length < 1) {
      this.prototypes.push(array[0]);
    }

    array.forEach((e) => this.add(e));
  }

  findSimilar(e) {
    const length = this.prototypes.length;

    if(!e) {
      return [null, -1];
    }

    for (let i = 0; i < length; i++) {
      const p = this.prototypes[i];

      if (this.similarityTest(e, p) && this.attentionTest(e, p)) {
        return [this.addVectors(e, p), i];
      }
    }
  }

  add(e) {
    const a = this.findSimilar(e) || [];
    const b = this.findSimilar(a[0]);

    if (b[0]) {
      this.prototypes[b[1]] = b[0];
    } else if(a[0]) {
      this.prototypes[a[1]] = a[0];
    } else {
      this.prototypes.push(e);
    }
  }

  similarityTest(e, p) {
    const {value, addVectors, beta} = this;
    const d = p.length;
    return value(addVectors(p, e)) / (beta + value(p)) > value(e) / (beta + d);
  }

  attentionTest(e, p) {
    const {value, addVectors, rho} = this;
    return value(addVectors(e, p)) / value(e) >= rho;
  }

  addVectors(a, b) {
    return a.map((x, i) => x && b[i]);
  }

  value(vector) {
    return vector.reduce((value, a) => value + (a ? 1 : 0), 0)
  }
}

export default ART1;
