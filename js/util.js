// Utility functions for number conversions
// Converted from Util.cs

export const Util = {
  convertToBitArray(polynoom) {
    const bitArray = [];
    for (let i = 0; i < polynoom.length; i++) {
      bitArray[i] = parseInt(polynoom[i]) === 1;
    }
    return bitArray;
  },

  decimalFromBinary(binary) {
    return parseInt(binary, 2).toString();
  },

  binaryFromDecimal(decimalN) {
    return parseInt(decimalN, 10).toString(2);
  },

  decimalFromHexaDecimal(hexadecimal) {
    return parseInt(hexadecimal, 16).toString();
  },

  hexaDecimalFromDecimal(decimalN) {
    return parseInt(decimalN, 10).toString(16);
  },

  decimalFromOctal(octal) {
    return parseInt(octal, 8).toString();
  },

  decimalFromIEEEFloatingPointBinary(binary) {
    // Convert 32-bit binary to IEEE-754 float
    const intValue = parseInt(binary, 2);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, intValue, false); // big-endian
    const floatValue = view.getFloat32(0, false);
    return floatValue.toString();
  },

  IEEEFloatingPointBinaryFromDecimal(decN) {
    // Handle comma as decimal separator (nl-be locale)
    const normalized = decN.replace(',', '.');
    const floatValue = parseFloat(normalized);
    
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, floatValue, false); // big-endian
    
    let binary = '';
    for (let i = 0; i < 4; i++) {
      const byte = view.getUint8(i);
      binary += byte.toString(2).padStart(8, '0');
    }
    return binary;
  },

  signMagnitudeFromDecimal(dec) {
    const num = parseInt(dec, 10);
    if (num < -127 || num > 127) return '';
    const sign = num < 0 ? '1' : '0';
    return sign + this.binaryFromDecimal(Math.abs(num).toString()).padStart(7, '0');
  },

  decimalFromSignMagnitude(signMagnitude) {
    if (signMagnitude.length !== 8) return '';
    const sign = signMagnitude.substring(0, 1);
    const decimal = this.decimalFromBinary(signMagnitude.substring(1, 8));
    return sign === '1' ? '-' + decimal : decimal;
  },

  complement2FromDecimal(dec) {
    const num = parseInt(dec, 10);
    if (num < -128 || num > 127) return '';
    const binary = this.binaryFromDecimal(Math.abs(num).toString()).padStart(8, '0');
    if (num >= 0) return binary.padStart(8, '0');
    const complement = this.addBinaries(this.complementBinary(binary), '00000001');
    return complement.length > 8 ? '' : complement;
  },

  decimalFromComplement2(binary) {
    if (binary === '10000000') return '-128';
    if (binary.length !== 8) return '';
    if (binary.substring(0, 1) === '1') {
      const complement = this.addBinaries(this.complementBinary(binary), '00000001');
      return '-' + this.decimalFromComplement2(complement);
    }
    return this.decimalFromBinary(binary.substring(1, 8));
  },

  addBinaries(a, b) {
    if (!this.assertBinary(a) || !this.assertBinary(b)) return '';
    const totalWidth = Math.max(a.length, b.length);
    const sum = parseInt(a, 2) + parseInt(b, 2);
    return sum.toString(2).padStart(totalWidth, '0');
  },

  assertBinary(s) {
    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      if (char !== '0' && char !== '1') return false;
    }
    return true;
  },

  complementBinary(binary) {
    if (!this.assertBinary(binary)) return '';
    let result = '';
    for (let i = 0; i < binary.length; i++) {
      result += binary[i] === '0' ? '1' : '0';
    }
    return result;
  },

  decimalFromExcess127(excess127) {
    if (excess127.length !== 8) return '';
    return (parseInt(this.decimalFromBinary(excess127), 10) - 127).toString();
  },

  excess127FromDecimal(dec) {
    const num = parseInt(dec, 10);
    if (num < -127 || num > 128) return '';
    return this.binaryFromDecimal((num + 127).toString()).padStart(8, '0');
  },

  octalFromDecimal(decimalN) {
    return parseInt(decimalN, 10).toString(8);
  },

  decimalFromBinaryFractional(s) {
    if (!s || s.trim() === '' || s === '0') return '0';
    let num1 = 0.5;
    let num2 = 0.0;
    for (let i = 0; i < s.length; i++) {
      const num3 = parseInt(s.substring(i, i + 1), 10);
      num2 += num3 * num1;
      num1 /= 2.0;
    }
    return num2.toString().substring(2);
  },

  binaryFromDecimalFractional(fraction) {
    if (!fraction || fraction.trim() === '' || fraction === '0') return '0';
    // Handle comma as decimal separator
    const normalized = '0.' + fraction.replace(',', '');
    const single = parseFloat(normalized);
    let num = 0.5;
    let result = '';
    let remaining = single;
    while (remaining > 0.0 && result.length < 32) { // Limit to prevent infinite loops
      if (remaining >= num) {
        result += '1';
        remaining -= num;
      } else {
        result += '0';
      }
      num /= 2.0;
    }
    return result;
  },

  octalFromBinaryFractional(fraction) {
    if (!fraction || fraction.trim() === '' || fraction === '0') return '0';
    let str = fraction;
    let result = '';
    while (str.length % 3 > 0) {
      str += '0';
    }
    while (str.length > 0) {
      result += this.octalFromDecimal(this.decimalFromBinary(str.substring(0, 3)));
      str = str.substring(3);
    }
    return result;
  },

  binaryFromOctalFractional(fraction) {
    if (!fraction || fraction.trim() === '' || fraction === '0') return '0';
    let str = this.binaryFromDecimal(this.decimalFromOctal(fraction));
    while (str.length < fraction.length * 3) {
      str = '0' + str;
    }
    return str;
  },

  hexaDecimalFromBinaryFractional(fraction) {
    if (!fraction || fraction.trim() === '' || fraction === '0') return '0';
    let str = fraction;
    let result = '';
    while (str.length % 4 > 0) {
      str += '0';
    }
    while (str.length > 0) {
      result += this.hexaDecimalFromDecimal(this.decimalFromBinary(str.substring(0, 4)));
      str = str.substring(4);
    }
    return result;
  },

  binaryFromHexaDecimalFractional(fraction) {
    if (!fraction || fraction.trim() === '' || fraction === '0') return '0';
    let str = this.binaryFromDecimal(this.decimalFromHexaDecimal(fraction));
    while (str.length < fraction.length * 4) {
      str = '0' + str;
    }
    return str;
  }
};

