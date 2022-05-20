import CanvasNavigator from "./CanvasNavigator.js";

const canvasNavigator = new CanvasNavigator();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", () => {
  resizeCanvas();
  updateRender();
});

const mouse = {
  position: {
    x: 0,
    y: 0,
  },

  button: {
    left: false,
    middle: false,
    right: false,
  },

  case: {
    mousedown: true,
    mouseup: false,
  },

  updateButton(event) {
    const keys = Object.keys(this.button);
    this.button[keys[event.button]] = this.case[event.type];
  },

  updatePosition(event) {
    this.position.x = event.offsetX;
    this.position.y = event.offsetY;
  },
};

canvas.addEventListener("mousedown", event => {
  mouse.updateButton(event);
});

canvas.addEventListener("mouseup", event => {
  mouse.updateButton(event);
});

canvas.addEventListener("mousemove", event => {
  mouse.updatePosition(event);
  if(mouse.button.left) {
    canvasNavigator.move(event.movementX, event.movementY);
    updateRender();
  };
});

canvas.addEventListener("wheel", event => {
  canvasNavigator.zoom(mouse.position.x, mouse.position.y, -0.2 * Math.sign(event.deltaY));
  updateRender();
});

const draw = () => {
  ctx.fillStyle = '#808080';
  ctx.beginPath();
  ctx.arc(0, 0, Math.sqrt(2), 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.fillRect(-1, -1, 2, 2);

  ctx.fillStyle = '#ff00ff';
  ctx.fillRect(-1, -1, 1, 1);
  ctx.fillRect(0, 0, 1, 1);

  ctx.fillStyle = '#ff000080';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = '#0000ff80';
  ctx.fillRect(30, 30, 50, 50);

  ctx.fillStyle = '#ff8000';

  for(let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(i * 8 + 40, Math.sin(i / 2) * 20 + 100, 2, 0, 2 * Math.PI);
    ctx.fill();
  };
};

const updateRender = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.scale(canvasNavigator.scale, canvasNavigator.scale);
  ctx.translate(canvasNavigator.translate.x, canvasNavigator.translate.y);

  draw();

  ctx.resetTransform();
};

resizeCanvas();

updateRender();
