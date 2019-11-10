class Graph {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];

    this.onClick = this.onClick.bind(this);
    this.subscribe();
  }

  subscribe() {
    this.canvas.addEventListener('click', this.onClick);
  }

  unsubscribe() {
    this.canvas.removeEventListener('click', this.onClick);
  }

  onClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.add(x, y);
  }

  add(x, y) {
    this.nodes.push({x, y});

    const i = this.nodes.length - 1;
    this.edges[i] = this.edges[i] || [];
    this.edges[i][i] = -1;

    for (let j = 0; j < this.nodes.length - 1; j++) {
      const a = this.nodes[i];
      const b = this.nodes[j];
      const distance = Math.sqrt(Math.pow(a.x - b.x, 2), Math.pow(a.y - b.y, 2));
      // Get distances instead of 1
      this.edges[i][j] = distance;
      this.edges[j][i] = distance;
    }

    this.render();
  }

  render(values) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let maxValue;

    if (values) {
      maxValue = Math.max(...values.flat());
    }

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        this.ctx.beginPath();

        if (values) {
          this.ctx.strokeStyle = this.getColorForPercentage(values[i][j] / maxValue);
        }
        this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
        this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
        this.ctx.stroke();
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.nodes[i].x, this.nodes[i].y, 5, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = '#EE6B5F';
      this.ctx.fill();
      this.ctx.stroke();
    }
  }


  getColorForPercentage(pct) {
    const percentColors = [
      {pct: 0.0, color: {r: 0xff, g: 0xff, b: 0xff}},
      {pct: 1.0, color: {r: 0x10, g: 0x10, b: 0x10}}
    ];

    for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
        break;
      }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }
}

export default Graph;
