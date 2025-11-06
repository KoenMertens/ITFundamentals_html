// IEEE754Converter - Convert between decimal and IEEE-754 floating point
// Converted from IEEE754Converter.cs

import { Util } from './util.js';

export class IEEE754Converter {
  constructor() {
    this.binary = '';
    this.decimal = '';
    this.hexadecimal = '';
    this.sign = '';
    this.exponent = '';
    this.mantissa = '';
    this.standardForm = '';
  }

  get inputNumber() {
    return this.decimal;
  }

  set inputNumber(value) {
    this.decimal = value;
  }

  get signBit() {
    return this.sign;
  }

  set signBit(value) {
    this.sign = value;
  }

  get binaryRepresentation() {
    return this.binary;
  }

  set binaryRepresentation(value) {
    this.binary = value;
  }

  calculate() {
    if (this.binary && this.binary.trim()) {
      this.calculateDecimal();
    } else if (this.decimal && this.decimal.trim()) {
      this.calculateBinary();
    }
  }

  calculateDecimal() {
    try {
      if (!this.binary || !this.binary.trim()) {
        return;
      }
      this.decimal = Util.decimalFromIEEEFloatingPointBinary(this.binary);
    } catch (ex) {
      // Error handling
    }
  }

  calculateBinary() {
    try {
      if (!this.decimal || !this.decimal.trim()) {
        return;
      }
      this.decimal = this.decimal.replace('.', ',');
      this.binary = Util.IEEEFloatingPointBinaryFromDecimal(this.decimal);
      const hexDecimal = Util.decimalFromBinary(this.binary);
      this.hexadecimal = Util.hexaDecimalFromDecimal(hexDecimal).padStart(8, '0');
      this.sign = this.binary.substring(0, 1);
      this.exponent = this.binary.substring(1, 9);
      this.mantissa = this.binary.substring(9);
      const expValue = parseInt(Util.decimalFromBinary(this.exponent), 10) - 127;
      const mantissaDecimal = Util.decimalFromBinaryFractional(this.mantissa.replace(/0+$/, ''));
      this.standardForm = (this.sign === '1' ? '-' : '') + '1,' + mantissaDecimal + ' * power(2,' + expValue + ')';
    } catch (ex) {
      // Error handling
    }
  }

  calculateBinaryFromHex() {
    try {
      if (!this.hexadecimal || !this.hexadecimal.trim()) {
        return;
      }
      this.binary = Util.binaryFromDecimal(Util.decimalFromHexaDecimal(this.hexadecimal)).padStart(32, '0');
      this.sign = this.binary.substring(0, 1);
      this.exponent = this.binary.substring(1, 9);
      this.mantissa = this.binary.substring(9);
      const expValue = parseInt(Util.decimalFromBinary(this.exponent), 10) - 127;
      const mantissaDecimal = Util.decimalFromBinaryFractional(this.mantissa.replace(/0+$/, ''));
      this.standardForm = (this.sign === '1' ? '-' : '') + '1,' + mantissaDecimal + ' * power(2,' + expValue + ')';
    } catch (ex) {
      // Error handling
    }
  }

  clear() {
    this.decimal = '';
    this.binary = '';
    this.hexadecimal = '';
    this.sign = '';
    this.exponent = '';
    this.mantissa = '';
    this.standardForm = '';
  }
}

