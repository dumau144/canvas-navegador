import CanvasNavigator from "./CanvasNavigator.js";

const canvasNavigator = new CanvasNavigator(1);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight
  updateRender();
};

window.addEventListener("resize", resizeCanvas);

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

  resetControl() {
    this.button.left = false;
    this.button.middle = false;
    this.button.right = false;
  },

  updadeMouse(event) {
    if(event.type === "mousemove") {
      this.position.x = event.offsetX;
      this.position.y = event.offsetY;
    };

    if(event.type === "mousedown") {
      const keys = Object.keys(this.button);
      const indexButton = keys[event.button];
      this.button[indexButton] = true;
    };

    if(event.type === "mouseup") {
      const keys = Object.keys(this.button);
      const indexButton = keys[event.button];
      this.button[indexButton] = false;
    };
  },

  getMouseInputOf(element) {
    element.addEventListener("mousemove", event => this.updadeMouse(event));
    element.addEventListener("mousedown", event => this.updadeMouse(event));
    element.addEventListener("mouseup", event => {this.updadeMouse(event)});
    element.addEventListener("mouseleave", event => this.resetControl(event));
  },
};

mouse.getMouseInputOf(canvas);

canvas.addEventListener("mousemove", event => {
  if(mouse.button.right) {
    canvas.setAttribute("oncontextmenu", "return false;");
    updateRender();
  } else {
    canvas.setAttribute("oncontextmenu", "return true;");
  };
  if(mouse.button.left) {
    canvasNavigator.move(event.movementX, event.movementY);
    updateRender();
  }
});

canvas.addEventListener("wheel", event => {
  canvasNavigator.zoom(event.deltaY < 0? 0.15 : -0.15, mouse.position.x, mouse.position.y);
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
  ctx.fillRect(30, 30, 50, 50)

  ctx.fillStyle = '#ff8000';

  for(let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(i * 8 + 40, Math.sin(i / 2) * 20 + 100, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
};

const updateRender = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.scale(canvasNavigator.scale, canvasNavigator.scale);
  ctx.translate(canvasNavigator.translate.x, canvasNavigator.translate.y);

  draw();

  ctx.resetTransform();
};

resizeCanvas();

canvasNavigator.move(canvas.width / 2, canvas.height / 2);

updateRender();
