// CRCCalculator - Calculate CRC checksum
// Converted from CRCCalculator.cs

import { Util } from './util.js';

export class CRCCalculator {
  constructor() {
    this.bitSeries = '';
    this.polynomial = '';
    this.crcResult = '';
    this.bitSeriesVariant = '';
    this.remainder = '';
    this.calculationSteps = [];
  }

  get inputData() {
    return this.bitSeries;
  }

  set inputData(value) {
    this.bitSeries = value;
  }

  get crcChecksum() {
    return this.crcResult;
  }

  set crcChecksum(value) {
    this.crcResult = value;
  }

  get dataWithCRC() {
    return this.bitSeriesVariant;
  }

  set dataWithCRC(value) {
    this.bitSeriesVariant = value;
  }

  calculate() {
    if (!this.polynomial) {
      this.crcResult = 'Fill in polynomial';
      return;
    }
    if (this.polynomial.length > this.bitSeries.length) {
      this.crcResult = 'Polynomial too long';
      return;
    }

    this.bitSeriesVariant = this.bitSeries;
    for (let i = 0; i < this.polynomial.length - 1; i++) {
      this.bitSeriesVariant += '0';
    }
    this.crcResult = this.calculateCRC(this.bitSeries, this.polynomial);
    this.remainder = this.crcResult;
  }

  calculateCRC(bitSeries, polynomial) {
    const bitArray1 = Util.convertToBitArray(bitSeries);
    const bitArray2 = Util.convertToBitArray(polynomial);
    const bitArray3 = new Array(bitArray2.length).fill(false);
    
    let index1 = 0;
    while (index1 <= bitArray1.length - bitArray2.length) {
      while (index1 < bitArray1.length && !bitArray1[index1]) {
        index1++;
      }
      if (index1 <= bitArray1.length - bitArray2.length) {
        for (let index2 = 0; index2 < bitArray3.length; index2++) {
          bitArray3[index2] = bitArray1[index1 + index2];
        }
        // XOR operation
        for (let index3 = 0; index3 < bitArray3.length; index3++) {
          bitArray3[index3] = bitArray3[index3] !== bitArray2[index3];
        }
        for (let index3 = 0; index3 < bitArray3.length; index3++) {
          bitArray1[index1 + index3] = bitArray3[index3];
        }
      } else {
        break;
      }
    }
    
    let crc = '';
    for (let index4 = 0; index4 < bitArray2.length - 1; index4++) {
      const num = bitArray1[bitArray1.length - 1 - index4] ? 1 : 0;
      crc = num.toString() + crc;
    }
    if (!crc || crc.trim() === '') {
      crc = '0';
    }
    return crc;
  }

  clear() {
    this.bitSeries = '';
    this.polynomial = '';
    this.crcResult = '';
    this.calculationSteps = [];
  }
}

