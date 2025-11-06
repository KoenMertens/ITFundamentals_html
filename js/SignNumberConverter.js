// SignNumberConverter - Convert signed numbers between different representations
// Converted from SignNumberConverter.cs

import { Util } from './util.js';

export class SignNumberConverter {
  constructor() {
    this.numberType = 'Sign_Magnitude';
    this.inputNumber = '';
    this.decimal = null;
    this.signMagnitude = null;
    this.excess127 = null;
    this.complement2 = null;
  }

  calculate() {
    try {
      if (!this.inputNumber || !this.inputNumber.trim()) {
        return;
      }

      const representationEnum = this.numberType;

      switch (representationEnum) {
        case 'Decimal':
          this.decimal = this.inputNumber;
          this.signMagnitude = Util.signMagnitudeFromDecimal(this.decimal);
          this.excess127 = Util.excess127FromDecimal(this.decimal);
          this.complement2 = Util.complement2FromDecimal(this.decimal);
          break;
        case 'Sign_Magnitude':
          this.signMagnitude = this.inputNumber;
          this.decimal = Util.decimalFromSignMagnitude(this.signMagnitude);
          this.excess127 = Util.excess127FromDecimal(this.decimal);
          this.complement2 = Util.complement2FromDecimal(this.decimal);
          break;
        case 'Excess_127':
          this.excess127 = this.inputNumber;
          this.decimal = Util.decimalFromExcess127(this.excess127);
          this.signMagnitude = Util.signMagnitudeFromDecimal(this.decimal);
          this.complement2 = Util.complement2FromDecimal(this.decimal);
          break;
        case '_2_Complement':
          this.complement2 = this.inputNumber;
          this.decimal = Util.decimalFromComplement2(this.complement2);
          this.excess127 = Util.excess127FromDecimal(this.decimal);
          this.signMagnitude = Util.signMagnitudeFromDecimal(this.decimal);
          break;
      }
    } catch (ex) {
      // Clear results on error
      this.signMagnitude = null;
      this.excess127 = null;
      this.complement2 = null;
      this.decimal = null;
    }
  }

  clear() {
    this.inputNumber = '';
    this.complement2 = null;
    this.decimal = null;
    this.excess127 = null;
    this.signMagnitude = null;
  }
}

