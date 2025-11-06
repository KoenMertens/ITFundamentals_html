// Coordinate class for Veitch-Karnaugh diagrams
export class Coordinate {
  constructor(r, c) {
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      // Copy constructor
      const co = arguments[0];
      this.row = co.row || co.Row;
      this.column = co.column || co.Column;
    } else {
      this.row = r;
      this.column = c;
    }
  }

  get Row() { return this.row; }
  set Row(value) { this.row = value; }
  get Column() { return this.column; }
  set Column(value) { this.column = value; }
}

