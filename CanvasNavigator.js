class CanvasNavigator {
  constructor(scale = 1, canvasTranslateX = 0, canvasTranslateY = 0) {
    this.transform = {
      translate: {
        x: canvasTranslateX,
        y: canvasTranslateY
      },
      scale: scale
    };
  };

  get translate () {
    return {
      x: this.transform.translate.x,
      y: this.transform.translate.y,
    }
  };

  get scale () {
    return this.transform.scale;
  };

  getWorldSpaceCoordinates(x, y) {
    return {
      x: x / this.transform.scale - this.transform.translate.x,
      y: y / this.transform.scale - this.transform.translate.y,
    }
  };

  zoom(x, y, step) {
    if(step > 0) {
      this.transform.scale *= 1 + step;
      this.transform.translate.x -= (x / this.transform.scale) * step;
      this.transform.translate.y -= (y / this.transform.scale) * step;
    } else {
      this.transform.translate.x += (x / this.transform.scale) * -step;
      this.transform.translate.y += (y / this.transform.scale) * -step;
      this.transform.scale /= 1 + -step;
    };
  };

  move(movementX, movementY) {
    this.transform.translate.x += movementX / this.transform.scale;
    this.transform.translate.y += movementY / this.transform.scale;
  };
};

export default CanvasNavigator;
