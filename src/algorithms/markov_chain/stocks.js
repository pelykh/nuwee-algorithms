class Stocks {
  constructor(id) {
    this.container = document.getElementById(id);
    this.container.style.backgroundColor = '#1e2128';

    this.container.innerHTML = `
      <div id="stocks">
        <canvas id="stocks-canvas"></canvas>
        <div class="title">Supa Trades</div>
        <div class="controls">
            <div id ="cash" class="cash">500$</div>
            <div id="up" class="button">Up ⬆️</div>
            <div id="down" class="button">Down ⬇️</div>
        </div>
      </div>
    `;

    this.canvas = document.getElementById('stocks-canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    // Interactivity params
    this.cash = 500;
    this.prediction = null;
    this.stepsToNextPrediction = 10;
    this.cashCounter = document.getElementById('cash');

    document.getElementById('up')
      .addEventListener('click', () => this.prediction = 'higher');
    document.getElementById('down')
      .addEventListener('click', () => this.prediction = 'lower');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderPredictionOverlay() {
    if(!this.prediction) {
      return false;
    }

    let from;

    if (this.prediction === 'higher') {
      this.ctx.fillStyle = '#60914e';
      from = 0;
    } else {
      this.ctx.fillStyle = '#e94a5f';
      from = this.canvas.height / 2;
    }

    this.ctx.globalAlpha = 0.2;
    this.ctx.fillRect(0,from,this.canvas.width,this.canvas.height / 2);
    this.ctx.globalAlpha = 1.0;
  }

  renderZeroLine() {
    const {ctx, canvas, stepsToNextPrediction} = this;
    const width = canvas.width / 2 + 50 * stepsToNextPrediction;

    ctx.strokeStyle = "#4f5972";
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(width, canvas.height);
    ctx.stroke();
  }

  render(states) {
    const {ctx, clear, canvas} = this;
    const {width, height} = canvas;

    const statesToRender = states.length > 20
      ? states.slice(states.length - 20)
      : states;

    const length = statesToRender.length - 1;
    this.clear();

    if (this.stepsToNextPrediction <= 0) {
      this.cashTime(states);
      this.stepsToNextPrediction = 10;
    } else {
      this.stepsToNextPrediction--;
    }

    this.renderPredictionOverlay();



    ctx.strokeStyle = "#c78147";
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - 200 + 100 * statesToRender[length]);

    for (let i = length - 1; i >= 0; i--) {
      ctx.lineTo(width / 2 * i / length, height / 2 - 200 + 100 * statesToRender[i]);
    }

    ctx.stroke();

    this.renderZeroLine();
  }

  cashTime(states) {
    const length = states.length - 1;
    const rightPrediction = states[length] > states[length - 1]
      ? 'higher'
      : 'lower';

    if (this.prediction) {
      if (this.prediction === rightPrediction) {
        this.cash += 100;
      } else {
        this.cash -= 100;
      }
    }

    this.cashCounter.innerHTML = `${this.cash}$`;
    this.prediction = null;
  }
}

export default Stocks;
