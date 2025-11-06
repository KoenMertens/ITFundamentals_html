// VKGenerator - Veitch-Karnaugh diagram generator
// Converted from VKGenerator.cs
import { Rectangle } from './Rectangle.js';
import { Coordinate } from './Coordinate.js';

export class VKGenerator {
  constructor() {
    this.operators = [];
    this.operands = [];
    this.variables = [];
    this.lastVar = '';
    this.listOfDictKDIndex = [];
    this.listOfKDIndexToVars = [];
    this.nbKDRows = 0;
    this.nbKDCols = 0;
    this.rectanglesDict = {};
    this.nbVariables = '1';
    this.outputTable = {};
    this.generateListOfKDIndices();
    this.kdColHeaders = [];
    this.kdRowHeaders = [];
    this.colours = ['green', 'red', 'blue', 'violet', 'white', 'brown', 'pink', 'orange', 'yellow', 'purple'];
  }

  get inputFunc() { return this.booleanFunction; }
  set inputFunc(value) { this.booleanFunction = value; }
  get booleanFunction() { return this._booleanFunction || ''; }
  set booleanFunction(value) { this._booleanFunction = value; }
  get nbVariables() { return this._nbVariables || '1'; }
  set nbVariables(value) { this._nbVariables = value; }
  get NbVariables() { return this.nbVariables; }
  set NbVariables(value) { this.nbVariables = value; }
  get postFix() { return this._postFix || ''; }
  set postFix(value) { this._postFix = value; }
  get PostFix() { return this.postFix; }
  set PostFix(value) { this.postFix = value; }
  get dnv() { return this._dnv || null; }
  set dnv(value) { this._dnv = value; }
  get DNF() { return this.dnv; }
  set DNF(value) { this.dnv = value; }
  get cnv() { return this._cnv || null; }
  set cnv(value) { this._cnv = value; }
  get CNF() { return this.cnv; }
  set CNF(value) { this.cnv = value; }
  get nbRows() { return this._nbRows || 0; }
  set nbRows(value) { this._nbRows = value; }
  get NbRows() { return this.nbRows; }
  set NbRows(value) { this.nbRows = value; }
  get outputTable() { return this._outputTable || {}; }
  set outputTable(value) { this._outputTable = value; }
  get OutputTable() { return this.outputTable; }
  set OutputTable(value) { this.outputTable = value; }
  get kd() { return this._kd || null; }
  set kd(value) { this._kd = value; }
  get KD() { return this.kd; }
  set KD(value) { this.kd = value; }
  get rectangles() { return this._rectangles || []; }
  set rectangles(value) { this._rectangles = value; }
  get Rectangles() { return this.rectangles; }
  set Rectangles(value) { this.rectangles = value; }
  get kdColHeaders() { return this._kdColHeaders || []; }
  set kdColHeaders(value) { this._kdColHeaders = value; }
  get KDColHeaders() { return this.kdColHeaders; }
  set KDColHeaders(value) { this.kdColHeaders = value; }
  get kdRowHeaders() { return this._kdRowHeaders || []; }
  set kdRowHeaders(value) { this._kdRowHeaders = value; }
  get KDRowHeaders() { return this.kdRowHeaders; }
  set KDRowHeaders(value) { this.kdRowHeaders = value; }
  get minExpression() { return this._minExpression; }
  set minExpression(value) { this._minExpression = value; }
  get MinimalExpression() { return this.minExpression; }
  set MinimalExpression(value) { this.minExpression = value; }

  generateListOfKDIndices() {
    this.listOfDictKDIndex = [];
    this.listOfKDIndexToVars = [];
    
    // 1 variable
    const dict1 = { '1': 0, '0': 1 };
    const list1 = ['1', '0'];
    this.listOfDictKDIndex.push(dict1);
    this.listOfKDIndexToVars.push(list1);
    
    // 2 variables
    const dict2 = { '11': 0, '10': 1, '00': 2, '01': 3 };
    const list2 = ['11', '10', '00', '01'];
    this.listOfDictKDIndex.push(dict2);
    this.listOfKDIndexToVars.push(list2);
    
    // 3 variables
    const dict3 = { '000': 0, '001': 1, '011': 2, '010': 3, '110': 4, '111': 5, '101': 6, '100': 7 };
    const list3 = ['000', '001', '011', '010', '110', '111', '101', '100'];
    this.listOfDictKDIndex.push(dict3);
    this.listOfKDIndexToVars.push(list3);
  }

  calculate() {
    if (!this.booleanFunction || !this.booleanFunction.trim()) return;
    
    const postfix = this.infixToPostfix(this.cleanInfix(this.booleanFunction));
    this.postFix = postfix.join('');
    this.initTruthTable();
    this.generateOutputTableFromPostfix(postfix);
    this.generateDNVandCNV(this.lastVar);
    this.generateKD(this.lastVar);
  }

  generateKD(lastVar) {
    if (!lastVar || !lastVar.trim()) {
      lastVar = Object.keys(this.outputTable)[0];
    }
    
    const num1 = Math.floor(this.variables.length / 2);
    const num2 = this.variables.length - num1;
    this.nbKDRows = Math.pow(2, num2);
    this.nbKDCols = Math.pow(2, num1);
    
    this.kd = Array(this.nbKDRows).fill(null).map(() => Array(this.nbKDCols).fill(0));
    
    for (let index1 = 0; index1 < this.nbRows; index1++) {
      let indexRowOrColString1 = '';
      let indexRowOrColString2 = '';
      
      for (let index2 = 0; index2 < num2; index2++) {
        indexRowOrColString1 += this.outputTable[this.variables[index2]][index1] ? '1' : '0';
      }
      for (let index3 = 0; index3 < num1; index3++) {
        indexRowOrColString2 += this.outputTable[this.variables[num2 + index3]][index1] ? '1' : '0';
      }
      
      const rowIndex = this.getIndexForKD(num2, indexRowOrColString1);
      const colIndex = this.getIndexForKD(num1, indexRowOrColString2);
      this.kd[rowIndex][colIndex] = this.outputTable[lastVar][index1] ? 1 : 0;
    }
    
    this.generateKDRowsAndColHeaders();
    this.determineMostSimpleExpression();
  }

  determineMostSimpleExpression() {
    this.getNbOnes();
    this.rectanglesDict = {};
    const rectangles = [];
    
    for (let index = 0; index <= this.variables.length; index++) {
      this.rectanglesDict[index] = this.getRectanglesOfSize(Math.pow(2, index));
    }
    
    for (let r = 0; r < this.nbKDRows; r++) {
      for (let c = 0; c < this.nbKDCols; c++) {
        if (this.kd[r][c] === 1) {
          rectangles.push(this.findLargestRectangle(r, c));
        }
      }
    }
    
    this.rectangles = this.removeDoubles(rectangles);
    this.rectanglesToExpression();
  }

  rectanglesToExpression() {
    this.minExpression = '';
    const nbVarsInRowsOrCol1 = Math.floor(this.variables.length / 2);
    const nbVarsInRowsOrCol2 = this.variables.length - nbVarsInRowsOrCol1;
    
    for (const rectangle of this.rectangles) {
      let str = '';
      
      // Process row variables
      const stringList1 = [];
      const rowDiff = (rectangle.bottomRight.row - rectangle.topLeft.row + this.nbKDRows) % this.nbKDRows;
      for (let index = 0; index <= rowDiff; index++) {
        stringList1.push(this.getVarStringForIndex(nbVarsInRowsOrCol2, (rectangle.topLeft.row + index) % this.nbKDRows));
      }
      
      for (let i = 0; i < nbVarsInRowsOrCol2; i++) {
        const stringList2 = [];
        for (const varString of stringList1) {
          // Extract the i-th character from each varString
          if (varString && varString.length > i) {
            stringList2.push(varString[i]);
          }
        }
        if (stringList2.includes('1') && !stringList2.includes('0')) {
          if (i < this.variables.length && this.variables[i]) {
            str += this.variables[i];
          }
        }
        if (stringList2.includes('0') && !stringList2.includes('1')) {
          if (i < this.variables.length && this.variables[i]) {
            str = str + '~' + this.variables[i];
          }
        }
      }
      
      // Process column variables
      const stringList3 = [];
      const colDiff = (rectangle.bottomRight.column - rectangle.topLeft.column + this.nbKDCols) % this.nbKDCols;
      for (let index = 0; index <= colDiff; index++) {
        stringList3.push(this.getVarStringForIndex(nbVarsInRowsOrCol1, (rectangle.topLeft.column + index) % this.nbKDCols));
      }
      
      for (let j = 0; j < nbVarsInRowsOrCol1; j++) {
        const stringList4 = [];
        for (const varString of stringList3) {
          // Extract the j-th character from each varString
          if (varString && varString.length > j) {
            stringList4.push(varString[j]);
          }
        }
        if (stringList4.includes('1') && !stringList4.includes('0')) {
          const varIndex = nbVarsInRowsOrCol2 + j;
          if (varIndex < this.variables.length && this.variables[varIndex]) {
            str += this.variables[varIndex];
          }
        }
        if (stringList4.includes('0') && !stringList4.includes('1')) {
          const varIndex = nbVarsInRowsOrCol2 + j;
          if (varIndex < this.variables.length && this.variables[varIndex]) {
            str = str + '~' + this.variables[varIndex];
          }
        }
      }
      
      if (str && str.trim() !== '') {
        if (this.minExpression && this.minExpression.trim() !== '') {
          this.minExpression += ' + ';
        }
        this.minExpression += str;
      }
    }
  }

  removeDoubles(rectangles) {
    rectangles = rectangles.filter(r => r !== null);
    rectangles.sort((a, b) => b.size - a.size);
    
    for (let index1 = 0; index1 < rectangles.length - 1; index1++) {
      for (let index2 = rectangles.length - 1; index2 > index1; index2--) {
        let flag = true;
        const rectangle1 = rectangles[index1];
        const rectangle2 = rectangles[index2];
        const rowDiff = (rectangle2.bottomRight.row - rectangle2.topLeft.row + this.nbKDRows) % this.nbKDRows;
        
        for (let index3 = 0; index3 <= rowDiff && flag; index3++) {
          const colDiff = (rectangle2.bottomRight.column - rectangle2.topLeft.column + this.nbKDCols) % this.nbKDCols;
          for (let index4 = 0; index4 <= colDiff; index4++) {
            if (!this.rectangleContainsCoordinate(rectangle1, 
                (rectangle2.topLeft.row + index3) % this.nbKDRows, 
                (rectangle2.topLeft.column + index4) % this.nbKDCols)) {
              flag = false;
              break;
            }
          }
        }
        
        if (flag) {
          rectangles.splice(index2, 1);
        }
      }
    }
    
    return rectangles;
  }

  findLargestRectangle(r, c) {
    const keys = Object.keys(this.rectanglesDict).map(k => parseInt(k)).sort((a, b) => b - a);
    for (const key of keys) {
      for (const rect of this.rectanglesDict[key]) {
        if (this.rectangleContainsCoordinate(rect, r, c)) {
          return rect;
        }
      }
    }
    return null;
  }

  rectangleContainsCoordinate(rect, r, c) {
    const rectangle = new Rectangle(rect);
    while (rectangle.topLeft.row > rectangle.bottomRight.row) {
      rectangle.topLeft.row = (rectangle.topLeft.row + 1) % this.nbKDRows;
      rectangle.bottomRight.row = (rectangle.bottomRight.row + 1) % this.nbKDRows;
      r = (r + 1) % this.nbKDRows;
    }
    while (rectangle.topLeft.column > rectangle.bottomRight.column) {
      rectangle.topLeft.column = (rectangle.topLeft.column + 1) % this.nbKDCols;
      rectangle.bottomRight.column = (rectangle.bottomRight.column + 1) % this.nbKDCols;
      c = (c + 1) % this.nbKDCols;
    }
    return rectangle.topLeft.row <= r && rectangle.topLeft.column <= c && 
           rectangle.bottomRight.row >= r && rectangle.bottomRight.column >= c;
  }

  getRectanglesOfSize(nbOnesInRectangle) {
    const rectanglesOfSize = [];
    
    switch (nbOnesInRectangle) {
      case 1:
        for (let index1 = 0; index1 < this.nbKDRows; index1++) {
          for (let index2 = 0; index2 < this.nbKDCols; index2++) {
            if (this.kd[index1][index2] === 1) {
              rectanglesOfSize.push(new Rectangle(index1, index2, index1, index2, 1));
            }
          }
        }
        break;
      case 2:
        for (let index3 = 0; index3 < this.nbKDRows; index3++) {
          for (let index4 = 0; index4 < this.nbKDCols; index4++) {
            if (this.kd[index3][index4] + this.kd[index3][(index4 + 1) % this.nbKDCols] === 2) {
              rectanglesOfSize.push(new Rectangle(index3, index4, index3, (index4 + 1) % this.nbKDCols, 2));
            }
            if (this.kd[(index3 + 1) % this.nbKDRows][index4] + this.kd[index3][index4] === 2) {
              rectanglesOfSize.push(new Rectangle(index3, index4, (index3 + 1) % this.nbKDRows, index4, 2));
            }
          }
        }
        break;
      case 4:
        for (let index5 = 0; index5 < this.nbKDRows; index5++) {
          for (let index6 = 0; index6 < this.nbKDCols; index6++) {
            if (this.nbKDRows >= 2 && this.nbKDCols >= 2 && 
                this.kd[index5][index6] + this.kd[index5][(index6 + 1) % this.nbKDCols] + 
                this.kd[(index5 + 1) % this.nbKDRows][index6] + 
                this.kd[(index5 + 1) % this.nbKDRows][(index6 + 1) % this.nbKDCols] === 4) {
              rectanglesOfSize.push(new Rectangle(index5, index6, (index5 + 1) % this.nbKDRows, (index6 + 1) % this.nbKDCols, 4));
            }
            if (this.nbKDCols >= 4 && 
                this.kd[index5][index6] + this.kd[index5][(index6 + 1) % this.nbKDCols] + 
                this.kd[index5][(index6 + 2) % this.nbKDCols] + 
                this.kd[index5][(index6 + 3) % this.nbKDCols] === 4) {
              rectanglesOfSize.push(new Rectangle(index5, index6, index5, (index6 + 3) % this.nbKDCols, 4));
            }
            if (this.nbKDRows >= 4 && 
                this.kd[index5][index6] + this.kd[(index5 + 1) % this.nbKDRows][index6] + 
                this.kd[(index5 + 2) % this.nbKDRows][index6] + 
                this.kd[(index5 + 3) % this.nbKDRows][index6] === 4) {
              rectanglesOfSize.push(new Rectangle(index5, index6, (index5 + 3) % this.nbKDRows, index6, 4));
            }
          }
        }
        break;
      case 8:
        for (let index7 = 0; index7 < this.nbKDRows; index7++) {
          for (let index8 = 0; index8 < this.nbKDCols; index8++) {
            if (this.nbKDCols >= 8) {
              let sum = 0;
              for (let i = 0; i < 8; i++) {
                sum += this.kd[index7][(index8 + i) % this.nbKDCols];
              }
              if (sum === 8) {
                rectanglesOfSize.push(new Rectangle(index7, index8, index7, (index8 + 7) % this.nbKDCols, 8));
              }
            }
            if (this.nbKDRows >= 8) {
              let sum = 0;
              for (let i = 0; i < 8; i++) {
                sum += this.kd[(index7 + i) % this.nbKDRows][index8];
              }
              if (sum === 8) {
                rectanglesOfSize.push(new Rectangle(index7, index8, (index7 + 7) % this.nbKDRows, index8, 8));
              }
            }
            if (this.nbKDCols >= 4 && this.nbKDRows >= 2) {
              let sum = 0;
              for (let r = 0; r < 2; r++) {
                for (let c = 0; c < 4; c++) {
                  sum += this.kd[(index7 + r) % this.nbKDRows][(index8 + c) % this.nbKDCols];
                }
              }
              if (sum === 8) {
                rectanglesOfSize.push(new Rectangle(index7, index8, (index7 + 1) % this.nbKDRows, (index8 + 3) % this.nbKDCols, 8));
              }
            }
            if (this.nbKDRows >= 4 && this.nbKDCols >= 2) {
              let sum = 0;
              for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 2; c++) {
                  sum += this.kd[(index7 + r) % this.nbKDRows][(index8 + c) % this.nbKDCols];
                }
              }
              if (sum === 8) {
                rectanglesOfSize.push(new Rectangle(index7, index8, (index7 + 3) % this.nbKDRows, (index8 + 1) % this.nbKDCols, 8));
              }
            }
          }
        }
        break;
      case 16:
        for (let topRow = 0; topRow < this.nbKDRows; topRow++) {
          for (let leftCol = 0; leftCol < this.nbKDCols; leftCol++) {
            if (this.nbKDCols >= 8 && this.nbKDRows >= 2) {
              let sum = 0;
              for (let r = 0; r < 2; r++) {
                for (let c = 0; c < 8; c++) {
                  sum += this.kd[(topRow + r) % this.nbKDRows][(leftCol + c) % this.nbKDCols];
                }
              }
              if (sum === 16) {
                rectanglesOfSize.push(new Rectangle(topRow, leftCol, (topRow + 1) % this.nbKDRows, (leftCol + 7) % this.nbKDCols, 16));
              }
            }
            if (this.nbKDRows >= 8 && this.nbKDCols >= 2) {
              let sum = 0;
              for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 2; c++) {
                  sum += this.kd[(topRow + r) % this.nbKDRows][(leftCol + c) % this.nbKDCols];
                }
              }
              if (sum === 16) {
                rectanglesOfSize.push(new Rectangle(topRow, leftCol, (topRow + 7) % this.nbKDRows, (leftCol + 1) % this.nbKDCols, 16));
              }
            }
            if (this.nbKDCols >= 4 && this.nbKDRows >= 4) {
              let sum = 0;
              for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                  sum += this.kd[(topRow + r) % this.nbKDRows][(leftCol + c) % this.nbKDCols];
                }
              }
              if (sum === 16) {
                rectanglesOfSize.push(new Rectangle(topRow, leftCol, (topRow + 3) % this.nbKDRows, (leftCol + 3) % this.nbKDCols, 16));
              }
            }
          }
        }
        break;
    }
    
    return rectanglesOfSize;
  }

  getNbOnes() {
    let nbOnes = 0;
    for (let index1 = 0; index1 < this.nbKDRows; index1++) {
      for (let index2 = 0; index2 < this.nbKDCols; index2++) {
        nbOnes += this.kd[index1][index2];
      }
    }
    return nbOnes;
  }

  generateKDRowsAndColHeaders() {
    this.kdColHeaders = [];
    this.kdRowHeaders = [];
    const num = Math.floor(this.variables.length / 2);
    const index = this.variables.length - num;
    
    switch (index) {
      case 1:
        this.kdRowHeaders.push(this.variables[0]);
        this.kdRowHeaders.push('~' + this.variables[0]);
        break;
      case 2:
        this.kdRowHeaders.push(this.variables[0] + this.variables[1]);
        this.kdRowHeaders.push(this.variables[0] + '~' + this.variables[1]);
        this.kdRowHeaders.push('~' + this.variables[0] + '~' + this.variables[1]);
        this.kdRowHeaders.push('~' + this.variables[0] + this.variables[1]);
        break;
      case 3:
        this.kdRowHeaders.push('~' + this.variables[0] + '~' + this.variables[1] + '~' + this.variables[2]);
        this.kdRowHeaders.push('~' + this.variables[0] + '~' + this.variables[1] + this.variables[2]);
        this.kdRowHeaders.push('~' + this.variables[0] + this.variables[1] + this.variables[2]);
        this.kdRowHeaders.push('~' + this.variables[0] + this.variables[1] + '~' + this.variables[2]);
        this.kdRowHeaders.push(this.variables[0] + this.variables[1] + '~' + this.variables[2]);
        this.kdRowHeaders.push(this.variables[0] + this.variables[1] + this.variables[2]);
        this.kdRowHeaders.push(this.variables[0] + '~' + this.variables[1] + this.variables[2]);
        this.kdRowHeaders.push(this.variables[0] + '~' + this.variables[1] + '~' + this.variables[2]);
        break;
    }
    
    switch (num) {
      case 1:
        this.kdColHeaders.push(this.variables[index]);
        this.kdColHeaders.push('~' + this.variables[index]);
        break;
      case 2:
        this.kdColHeaders.push(this.variables[index] + this.variables[index + 1]);
        this.kdColHeaders.push(this.variables[index] + '~' + this.variables[index + 1]);
        this.kdColHeaders.push('~' + this.variables[index] + '~' + this.variables[index + 1]);
        this.kdColHeaders.push('~' + this.variables[index] + this.variables[index + 1]);
        break;
      case 3:
        this.kdColHeaders.push('~' + this.variables[index] + '~' + this.variables[index + 1] + '~' + this.variables[index + 2]);
        this.kdColHeaders.push('~' + this.variables[index] + '~' + this.variables[index + 1] + this.variables[index + 2]);
        this.kdColHeaders.push('~' + this.variables[index] + this.variables[index + 1] + this.variables[index + 2]);
        this.kdColHeaders.push('~' + this.variables[index] + this.variables[index + 1] + '~' + this.variables[index + 2]);
        this.kdColHeaders.push(this.variables[index] + this.variables[index + 1] + '~' + this.variables[index + 2]);
        this.kdColHeaders.push(this.variables[index] + this.variables[index + 1] + this.variables[index + 2]);
        this.kdColHeaders.push(this.variables[index] + '~' + this.variables[index + 1] + this.variables[index + 2]);
        this.kdColHeaders.push(this.variables[index] + '~' + this.variables[index + 1] + '~' + this.variables[index + 2]);
        break;
    }
  }

  getIndexForKD(nbVarsInRowsOrCol, indexRowOrColString) {
    if (nbVarsInRowsOrCol === 0) return 0;
    return this.listOfDictKDIndex[nbVarsInRowsOrCol - 1][indexRowOrColString];
  }

  getVarStringForIndex(nbVarsInRowsOrCol, index) {
    if (nbVarsInRowsOrCol === 0) return '';
    const list = this.listOfKDIndexToVars[nbVarsInRowsOrCol - 1];
    if (!list || index >= list.length) return '';
    return list[index] || '';
  }

  detectVariablesFromInput() {
    const detectedVars = [];
    if (!this.booleanFunction || !this.booleanFunction.trim()) {
      return detectedVars;
    }
    
    const allowedVars = ['x', 'y', 'z', 'u', 'v', 'w'];
    for (const v of allowedVars) {
      if (this.booleanFunction.includes(v)) {
        detectedVars.push(v);
      }
    }
    return detectedVars;
  }

  getDetectedVariablesString() {
    const detectedVars = this.detectVariablesFromInput();
    if (detectedVars.length === 0) {
      return 'No variables detected';
    }
    return `Detected: ${detectedVars.join(', ')} (${detectedVars.length} variables)`;
  }

  isVariableCountMatching() {
    const detectedVars = this.detectVariablesFromInput();
    const selectedCount = parseInt(this.nbVariables, 10);
    return detectedVars.length === selectedCount;
  }

  getVariableCountValidationMessage() {
    const detectedVars = this.detectVariablesFromInput();
    const selectedCount = parseInt(this.nbVariables, 10);
    
    if (detectedVars.length === selectedCount) {
      return '✅ Variables match! Ready to generate.';
    }
    
    if (detectedVars.length > selectedCount) {
      const extraVars = detectedVars.slice(selectedCount);
      return `⚠️ Too many variables: You selected ${selectedCount} but found ${detectedVars.length}. Extra variables: ${extraVars.join(', ')}. Consider selecting '${detectedVars.length}' or remove variables from input.`;
    } else {
      const allVars = ['x', 'y', 'z', 'u', 'v', 'w'];
      const missingVars = allVars.filter(v => !detectedVars.includes(v)).slice(0, selectedCount - detectedVars.length);
      return `⚠️ Too few variables: You selected ${selectedCount} but only found ${detectedVars.length}. Consider adding: ${missingVars.join(', ')} or select '${detectedVars.length}' variables.`;
    }
  }

  validateVariableCountBeforeCalculation() {
    const detectedVars = this.detectVariablesFromInput();
    const selectedCount = parseInt(this.nbVariables, 10);
    return detectedVars.length <= selectedCount;
  }

  getVariableCountError() {
    const detectedVars = this.detectVariablesFromInput();
    const selectedCount = parseInt(this.nbVariables, 10);
    
    if (detectedVars.length > selectedCount) {
      const extraVars = detectedVars.slice(selectedCount);
      return `Error: Expression contains ${detectedVars.length} variables (${detectedVars.join(', ')}) but you selected only ${selectedCount}. Please select '${detectedVars.length}' variables or remove ${extraVars.join(', ')} from your expression.`;
    }
    
    return null;
  }

  infixToPostfix(infix) {
    const stringStack = [];
    const postfix = [];
    
    for (let index = 0; index < infix.length; index++) {
      const str1 = infix[index];
      if (!this.isOperator(str1)) {
        postfix.push(str1);
      } else if (str1 === ')') {
        let str2 = stringStack.pop();
        while (str2 !== '(') {
          postfix.push(str2);
          str2 = stringStack.pop();
        }
      } else if (stringStack.length === 0 || str1 === '(') {
        stringStack.push(str1);
      } else {
        let y = stringStack[stringStack.length - 1];
        while (this.priority(y) >= this.priority(str1) && stringStack.length !== 0) {
          postfix.push(y);
          stringStack.pop();
          if (stringStack.length !== 0) {
            y = stringStack[stringStack.length - 1];
          }
        }
        stringStack.push(str1);
      }
    }
    
    while (stringStack.length !== 0) {
      postfix.push(stringStack.pop());
    }
    
    return postfix;
  }

  generateOutputTableFromPostfix(postfix) {
    const stringStack = [];
    let operand1 = '';
    let operand2 = '';
    let varName = null;
    
    for (let index = 0; index < postfix.length; index++) {
      if (this.isOperator(postfix[index])) {
        switch (postfix[index]) {
          case '~':
            operand1 = stringStack.pop();
            operand2 = null;
            varName = '~' + operand1;
            break;
          case '+':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + '+' + operand2;
            break;
          case '*':
          case '.':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + '*' + operand2;
            break;
        }
        varName = '(' + varName + ')';
        stringStack.push(varName);
        this.addVarToTruthTable(varName, postfix[index], operand1, operand2);
      } else {
        if (!this.isOperand(postfix[index])) {
          throw new Error('Not a valid proposition');
        }
        stringStack.push(postfix[index]);
      }
    }
    stringStack.pop();
  }

  addVarToTruthTable(varName, oper, operand1, operand2) {
    this.lastVar = varName;
    if (this.outputTable[varName]) {
      return;
    }
    
    const boolList = new Array(this.nbRows);
    this.outputTable[varName] = boolList;
    
    for (let index = 0; index < this.nbRows; index++) {
      const flag2 = this.outputTable[operand1][index];
      let flag1 = false;
      if (oper !== '~') {
        flag1 = this.outputTable[operand2][index];
      }
      
      if (oper === '~') {
        boolList[index] = !flag2;
      } else if (oper === '*' || oper === '.') {
        boolList[index] = flag2 && flag1;
      } else if (oper === '+') {
        boolList[index] = flag2 || flag1;
      }
    }
  }

  isOperator(token) {
    return token === '~' || token === '+' || token === '*' || token === '.' || token === '(' || token === ')';
  }

  priority(y) {
    switch (y) {
      case '(':
        return 0;
      case '+':
        return 1;
      case '*':
      case '.':
        return 2;
      case '~':
        return 3;
      default:
        throw new Error('unrecognised operator');
    }
  }

  isOperand(token) {
    return token === 'x' || token === 'y' || token === 'z' || token === 'v' || token === 'w' || token === 'u';
  }

  cleanInfix(propositionS) {
    const stringList = [];
    let str1 = propositionS.replace(/\s/g, '');
    let str2 = str1;
    
    // Insert implicit multiplication
    for (let index = str1.length - 1; index > 0; index--) {
      const token1 = str1[index - 1];
      const token2 = str1[index];
      if ((this.isOperand(token1) || token1 === ')') && (this.isOperand(token2) || token2 === '~' || token2 === '(')) {
        str2 = str2.slice(0, index) + '*' + str2.slice(index);
      }
    }
    
    for (let index = 0; index < str2.length; index++) {
      const token = str2[index];
      if (this.isOperand(token)) {
        stringList.push(token);
      } else {
        if (!this.isOperator(token)) {
          throw new Error('Not a valid proposition');
        }
        stringList.push(token);
      }
    }
    
    return stringList;
  }

  initTruthTable() {
    this.initVariables();
    this.nbRows = Math.pow(2, this.variables.length);
    let num1 = this.nbRows / 2;
    let num2 = 0;
    this.outputTable = {};
    
    for (const variable of this.variables) {
      let flag = true;
      const boolList = new Array(this.nbRows);
      this.outputTable[variable] = boolList;
      
      for (let index = 0; index < this.nbRows; index++) {
        boolList[index] = flag;
        num2++;
        if (num2 >= num1) {
          flag = !flag;
          num2 = 0;
        }
      }
      num1 /= 2;
    }
  }

  initVariables() {
    this.variables = [];
    const stringList = ['x', 'y', 'z', 'u', 'v', 'w'];
    
    // First, detect variables from input
    for (const str of stringList) {
      if (this.booleanFunction && this.booleanFunction.includes(str)) {
        this.variables.push(str);
      }
    }
    
    const detectedCount = this.variables.length;
    const selectedCount = parseInt(this.nbVariables, 10);
    
    // If user selected more variables than detected, add unused ones
    if (detectedCount < selectedCount) {
      let index = 0;
      while (this.variables.length < selectedCount && index < stringList.length) {
        if (!this.variables.includes(stringList[index])) {
          this.variables.push(stringList[index]);
        }
        index++;
      }
    }
    // If user selected fewer variables than detected, use only the first N
    else if (detectedCount > selectedCount) {
      this.variables = this.variables.slice(0, selectedCount);
    }
  }

  generateDNVandCNV(lastVar) {
    let str1 = '';
    let str2 = '';
    if (!lastVar || !lastVar.trim()) {
      lastVar = Object.keys(this.outputTable)[0];
    }
    
    for (let index = 0; index < this.nbRows; index++) {
      if (this.outputTable[lastVar][index]) {
        let str3 = str1 + '(';
        for (const variable of this.variables) {
          str3 += this.outputTable[variable][index] ? variable + '*' : '~' + variable + '*';
        }
        str1 = str3.slice(0, -1) + ')' + '+';
      } else {
        let str4 = str2 + '(';
        for (const variable of this.variables) {
          str4 += this.outputTable[variable][index] ? '~' + variable + '+' : variable + '+';
        }
        str2 = str4.slice(0, -1) + ')' + '*';
      }
    }
    
    if (str1.endsWith('+')) {
      str1 = str1.slice(0, -1);
    }
    if (str2.endsWith('*')) {
      str2 = str2.slice(0, -1);
    }
    
    this.cnv = str2;
    this.dnv = str1;
  }

  clear() {
    this.booleanFunction = '';
    this.outputTable = {};
    this.operators = [];
    this.operands = [];
  }
}

