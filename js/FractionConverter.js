// FractionConverter - Convert fractional numbers between different bases
// Converted from FractionConverter.cs

import { Util } from './util.js';

export class FractionConverter {
  constructor() {
    this.numberType = 'Binary';
    this.inputNumber = '';
    this.binary = null;
    this.decimal = null;
    this.octal = null;
    this.hexadecimal = null;
  }

  calculate() {
    try {
      if (!this.inputNumber || !this.inputNumber.trim()) {
        return;
      }

      let wholePart = '';
      let fractionalPart = '';
      
      if (this.inputNumber.includes('.')) {
        const parts = this.inputNumber.split('.');
        wholePart = parts[0];
        fractionalPart = parts[1] || '';
      } else if (this.inputNumber.includes(',')) {
        const parts = this.inputNumber.split(',');
        wholePart = parts[0];
        fractionalPart = parts[1] || '';
      } else {
        wholePart = this.inputNumber;
      }

      const numberTypeEnum = this.numberType;

      switch (numberTypeEnum) {
        case 'Binary':
          this.binary = this.inputNumber.replace('.', ',');
          const decimalN1 = Util.decimalFromBinary(wholePart);
          this.decimal = decimalN1 + ',' + Util.decimalFromBinaryFractional(fractionalPart);
          this.octal = Util.octalFromDecimal(decimalN1) + ',' + Util.octalFromBinaryFractional(fractionalPart);
          this.hexadecimal = Util.hexaDecimalFromDecimal(decimalN1) + ',' + Util.hexaDecimalFromBinaryFractional(fractionalPart);
          break;
        case 'Decimal':
          this.decimal = this.inputNumber.replace('.', ',');
          const fraction = Util.binaryFromDecimalFractional(fractionalPart);
          this.binary = Util.binaryFromDecimal(wholePart) + ',' + fraction;
          this.octal = Util.octalFromDecimal(wholePart) + ',' + Util.octalFromBinaryFractional(fraction);
          this.hexadecimal = Util.hexaDecimalFromDecimal(wholePart) + ',' + Util.hexaDecimalFromBinaryFractional(fraction);
          break;
        case 'Octal':
          this.octal = this.inputNumber.replace('.', ',');
          const str3 = Util.binaryFromOctalFractional(fractionalPart);
          const decimalN2 = Util.decimalFromOctal(wholePart);
          this.binary = Util.binaryFromDecimal(decimalN2) + ',' + str3;
          this.decimal = decimalN2 + ',' + Util.decimalFromBinaryFractional(str3);
          this.hexadecimal = Util.hexaDecimalFromDecimal(decimalN2) + ',' + Util.hexaDecimalFromBinaryFractional(str3);
          break;
        case 'Hexadecimal':
          this.hexadecimal = this.inputNumber.replace('.', ',');
          const decimalN3 = Util.decimalFromHexaDecimal(wholePart);
          const str4 = Util.binaryFromHexaDecimalFractional(fractionalPart);
          this.binary = Util.binaryFromDecimal(decimalN3) + ',' + str4;
          this.decimal = decimalN3 + ',' + Util.decimalFromBinaryFractional(str4);
          this.octal = Util.octalFromDecimal(decimalN3) + ',' + Util.octalFromBinaryFractional(str4);
          break;
      }
    } catch (ex) {
      // Error handling
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

