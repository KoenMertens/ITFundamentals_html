// Rectangle class for Veitch-Karnaugh diagrams
import { Coordinate } from './Coordinate.js';

export class Rectangle {
  constructor(topRow, leftCol, bottomRow, rightCol, size) {
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      // Copy constructor
      const rect = arguments[0];
      this.topLeft = new Coordinate(rect.topLeft || rect.TopLeft);
      this.bottomRight = new Coordinate(rect.bottomRight || rect.BottomRight);
      this.size = rect.size || rect.Size;
    } else {
      this.topLeft = new Coordinate(topRow, leftCol);
      this.bottomRight = new Coordinate(bottomRow, rightCol);
      this.size = size;
    }
  }

  get Size() { return this.size; }
  set Size(value) { this.size = value; }
  get TopLeft() { return this.topLeft; }
  set TopLeft(value) { this.topLeft = value; }
  get BottomRight() { return this.bottomRight; }
  set BottomRight(value) { this.bottomRight = value; }
}

