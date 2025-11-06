// NumberConverter - Convert whole numbers between different bases
// Converted from NumberConverter.cs

import { Util } from './util.js';

export class NumberConverter {
  constructor() {
    this.numberType = 'Binary';
    this.inputNumber = '';
    this.binary = null;
    this.decimal = null;
    this.octal = null;
    this.hexadecimal = null;
  }

  calculate() {
    if (!this.inputNumber || !this.inputNumber.trim()) {
      return;
    }

    const numberTypeEnum = this.numberType;

    switch (numberTypeEnum) {
      case 'Binary':
        this.binary = this.inputNumber;
        this.decimal = Util.decimalFromBinary(this.binary);
        this.octal = Util.octalFromDecimal(this.decimal);
        this.hexadecimal = Util.hexaDecimalFromDecimal(this.decimal);
        break;
      case 'Decimal':
        this.decimal = this.inputNumber;
        this.binary = Util.binaryFromDecimal(this.decimal);
        this.octal = Util.octalFromDecimal(this.decimal);
        this.hexadecimal = Util.hexaDecimalFromDecimal(this.decimal);
        break;
      case 'Octal':
        this.octal = this.inputNumber;
        this.decimal = Util.decimalFromOctal(this.octal);
        this.binary = Util.binaryFromDecimal(this.decimal);
        this.hexadecimal = Util.hexaDecimalFromDecimal(this.decimal);
        break;
      case 'Hexadecimal':
        this.hexadecimal = this.inputNumber;
        this.decimal = Util.decimalFromHexaDecimal(this.hexadecimal);
        this.binary = Util.binaryFromDecimal(this.decimal);
        this.octal = Util.octalFromDecimal(this.decimal);
        break;
    }
  }

  clear() {
    this.inputNumber = '';
    this.octal = null;
    this.decimal = null;
    this.binary = null;
    this.hexadecimal = null;
  }
}

