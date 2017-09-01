import TransformHandler from './TransformHandler';

class RotateHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable.parent.dom);
    this.draggable = draggable;
    this.config = config;
  }

  onStart = (event, dragStart) => {
    console.log('on rotate start'); // eslint-disable-line no-console
    this.dragStart = dragStart;
    this.originalMatrx = this.getTransformMatrix();
  }

  onEnd = () => {
    // nothing to do here;
    console.log('on rotate end'); // eslint-disable-line no-console
  }

  onGoing = (event, dragOver) => {
    console.log('on rotating'); // eslint-disable-line no-console

    const om = this.originalMatrx;
    const offsetX = dragOver.x - this.dragStart.x;
    const offsetY = dragOver.y - this.dragStart.y;

    this.opTarget.style.transform
      = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
  }
}

export default RotateHandler;