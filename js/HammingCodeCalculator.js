// HammingCodeCalculator - Calculate Hamming code
// Converted from HammingCodeCalculator.cs

import { Util } from './util.js';

export class HammingCodeCalculator {
  constructor() {
    this.nbDBits = 0;
    this.nbPBits = 0;
    this.D = new Array(16).fill(null);
    this.P = new Array(5).fill(null);
    this.bitSeries = '';
    this.result = '';
    this.parityBits = '';
    this.dataBits = '';
  }

  get inputBits() {
    return this.bitSeries;
  }

  set inputBits(value) {
    this.bitSeries = value;
  }

  get hammingCode() {
    return this.result;
  }

  set hammingCode(value) {
    this.result = value;
  }

  get P1() { return this.P[0]; }
  set P1(value) { this.P[0] = value; }
  get P2() { return this.P[1]; }
  set P2(value) { this.P[1] = value; }
  get P3() { return this.P[2]; }
  set P3(value) { this.P[2] = value; }
  get P4() { return this.P[3]; }
  set P4(value) { this.P[3] = value; }
  get P5() { return this.P[4]; }
  set P5(value) { this.P[4] = value; }

  get D1() { return this.D[0]; }
  set D1(value) { this.D[0] = value; }
  get D2() { return this.D[1]; }
  set D2(value) { this.D[1] = value; }
  get D3() { return this.D[2]; }
  set D3(value) { this.D[2] = value; }
  get D4() { return this.D[3]; }
  set D4(value) { this.D[3] = value; }
  get D5() { return this.D[4]; }
  set D5(value) { this.D[4] = value; }
  get D6() { return this.D[5]; }
  set D6(value) { this.D[5] = value; }
  get D7() { return this.D[6]; }
  set D7(value) { this.D[6] = value; }
  get D8() { return this.D[7]; }
  set D8(value) { this.D[7] = value; }
  get D9() { return this.D[8]; }
  set D9(value) { this.D[8] = value; }
  get D10() { return this.D[9]; }
  set D10(value) { this.D[9] = value; }
  get D11() { return this.D[10]; }
  set D11(value) { this.D[10] = value; }
  get D12() { return this.D[11]; }
  set D12(value) { this.D[11] = value; }
  get D13() { return this.D[12]; }
  set D13(value) { this.D[12] = value; }
  get D14() { return this.D[13]; }
  set D14(value) { this.D[13] = value; }
  get D15() { return this.D[14]; }
  set D15(value) { this.D[14] = value; }
  get D16() { return this.D[15]; }
  set D16(value) { this.D[15] = value; }

  calculate() {
    const length = this.bitSeries.length;
    if (length >= 2) this.nbPBits = 3;
    if (length >= 5) this.nbPBits = 4;
    if (length >= 12) this.nbPBits = 5;

    const bitArray = Util.convertToBitArray(this.bitSeries);
    for (let index = 0; index < 16; index++) {
      this.D[index] = index >= length ? null : (bitArray[index] ? 1 : 0);
    }

    // Calculate P1
    this.P[0] = (this.D1 + this.D2 + this.D4 + this.D5 + this.D7 + this.D9 + this.D11 + this.D12 + this.D14 + this.D16) % 2;

    // Calculate P2
    this.P[1] = (this.D1 + this.D3 + this.D4 + this.D6 + this.D7 + this.D10 + this.D11 + this.D13 + this.D14) % 2;

    // Calculate P3
    if (length >= 2) {
      this.P[2] = (this.D2 + this.D3 + this.D4 + this.D8 + this.D9 + this.D10 + this.D11 + this.D15 + this.D16) % 2;
    } else {
      this.P[2] = null;
    }

    // Calculate P4
    if (length >= 5) {
      this.P[3] = (this.D5 + this.D6 + this.D7 + this.D8 + this.D9 + this.D10 + this.D11) % 2;
    } else {
      this.P[3] = null;
    }

    // Calculate P5
    if (length >= 12) {
      this.P[4] = (this.D12 + this.D13 + this.D14 + this.D15 + this.D16) % 2;
    } else {
      this.P[4] = null;
    }

    // Build result string
    this.result = (this.P1 !== null ? this.P1.toString() : '') +
                  (this.P2 !== null ? this.P2.toString() : '') +
                  (this.D1 !== null ? this.D1.toString() : '');

    if (length >= 2) {
      this.result += (this.P3 !== null ? this.P3.toString() : '') + (this.D2 !== null ? this.D2.toString() : '');
    }
    if (length >= 3) {
      this.result += (this.D3 !== null ? this.D3.toString() : '');
    }
    if (length >= 4) {
      this.result += (this.D4 !== null ? this.D4.toString() : '');
    }
    if (length >= 5) {
      this.result += (this.P4 !== null ? this.P4.toString() : '') + (this.D5 !== null ? this.D5.toString() : '');
    }
    if (length >= 6) {
      this.result += (this.D6 !== null ? this.D6.toString() : '');
    }
    if (length >= 7) {
      this.result += (this.D7 !== null ? this.D7.toString() : '');
    }
    if (length >= 8) {
      this.result += (this.D8 !== null ? this.D8.toString() : '');
    }
    if (length >= 9) {
      this.result += (this.D9 !== null ? this.D9.toString() : '');
    }
    if (length >= 10) {
      this.result += (this.D10 !== null ? this.D10.toString() : '');
    }
    if (length >= 11) {
      this.result += (this.D11 !== null ? this.D11.toString() : '');
    }
    if (length >= 12) {
      this.result += (this.P5 !== null ? this.P5.toString() : '') + (this.D12 !== null ? this.D12.toString() : '');
    }
    if (length >= 13) {
      this.result += (this.D13 !== null ? this.D13.toString() : '');
    }
    if (length >= 14) {
      this.result += (this.D14 !== null ? this.D14.toString() : '');
    }
    if (length >= 15) {
      this.result += (this.D15 !== null ? this.D15.toString() : '');
    }
    if (length >= 16) {
      this.result += (this.D16 !== null ? this.D16.toString() : '');
    }

    // Set UI properties
    this.parityBits = this.getParityBitsString();
    this.dataBits = this.bitSeries;
  }

  getParityBitsString() {
    let result = '';
    for (let i = 0; i < this.nbPBits; i++) {
      if (this.P[i] !== null) {
        result += this.P[i].toString();
      }
    }
    return result;
  }

  clear() {
    this.bitSeries = '';
    this.result = '';
    this.P.fill(null);
    this.D.fill(null);
    this.parityBits = '';
    this.dataBits = '';
  }
}

