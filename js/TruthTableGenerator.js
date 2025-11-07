// TruthTableGenerator - Generate truth tables from boolean propositions
// Converted from TruthTableGenerator.cs

export class TruthTableGenerator {
  constructor() {
    this.operators = [];
    this.operands = [];
    this.variables = [];
    this.inputProp = '';
    this.postFix = '';
    this.nbRows = 0;
    this.truthTable = {};
  }

  get proposition() {
    return this.inputProp;
  }

  set proposition(value) {
    this.inputProp = value;
  }

  calculate() {
    const postfix = this.infixToPostfix(this.cleanInfix(this.inputProp));
    this.postFix = postfix.join('');
    this.initTruthTable();
    this.generateTruthTableFromPostfix(postfix);
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

  generateTruthTableFromPostfix(postfix) {
    const stringStack = [];
    let operand1 = '';
    let operand2 = '';
    let varName = '';
    
    for (let index = 0; index < postfix.length; index++) {
      if (this.isOperator(postfix[index])) {
        switch (postfix[index]) {
          case '->':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' -> ' + operand2;
            break;
          case '<->':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' <-> ' + operand2;
            break;
          case '^':
          case 'and':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' ^ ' + operand2;
            break;
          case 'nand':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' nand ' + operand2;
            break;
          case 'nor':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + 'nor' + operand2;
            break;
          case 'not':
          case '~':
            operand1 = stringStack.pop();
            operand2 = null;
            varName = '~' + operand1;
            break;
          case 'nxor':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' nxor ' + operand2;
            break;
          case 'or':
          case 'v':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' v ' + operand2;
            break;
          case 'x':
          case 'xor':
            operand2 = stringStack.pop();
            operand1 = stringStack.pop();
            varName = operand1 + ' xor ' + operand2;
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
    if (this.truthTable[varName]) {
      return;
    }
    
    const boolList = new Array(this.nbRows);
    this.truthTable[varName] = boolList;
    
    for (let index = 0; index < this.nbRows; index++) {
      let flag2;
      switch (operand1) {
        case 'F':
        case '0':
          flag2 = false;
          break;
        case 'T':
        case '1':
          flag2 = true;
          break;
        default:
          flag2 = this.truthTable[operand1][index];
          break;
      }
      
      let flag1 = false;
      if (operand2 === null) {
        if (oper !== '~' && oper !== 'not') {
          flag1 = this.truthTable[operand2] ? this.truthTable[operand2][index] : false;
        }
      } else {
        switch (operand2) {
          case 'F':
            flag1 = false;
            break;
          case '0':
            flag1 = false;
            break;
          case 'T':
            flag1 = true;
            break;
          case '1':
            flag1 = true;
            break;
          default:
            flag1 = this.truthTable[operand2] ? this.truthTable[operand2][index] : false;
            break;
        }
      }
      
      if (oper === '~' || oper === 'not') {
        boolList[index] = !flag2;
      } else if (oper === '^' || oper === 'and') {
        boolList[index] = flag2 && flag1;
      } else if (oper === 'v' || oper === 'or') {
        boolList[index] = flag2 || flag1;
      } else {
        switch (oper) {
          case '->':
            boolList[index] = !flag2 || flag1;
            break;
          case '<->':
            boolList[index] = flag2 === flag1;
            break;
          case 'xor':
            boolList[index] = flag2 !== flag1;
            break;
          case 'nxor':
            boolList[index] = flag2 === flag1;
            break;
          case 'nand':
            boolList[index] = !(flag2 && flag1);
            break;
          case 'nor':
            boolList[index] = !(flag2 || flag1);
            break;
        }
      }
    }
  }

  isOperator(token) {
    return token === '<->' || token === '->' || token === '^' || token === 'v' || 
           token === '~' || token === 'not' || token === 'xor' || token === 'or' || 
           token === 'and' || token === 'nand' || token === 'nor' || token === 'nxor' || 
           token === '(' || token === ')';
  }

  priority(y) {
    switch (y) {
      case '(':
        return 0;
      case '->':
        return 2;
      case '<->':
        return 1;
      case '^':
      case 'and':
      case 'nand':
        return 4;
      case 'nor':
      case 'nxor':
      case 'or':
      case 'v':
      case 'xor':
        return 3;
      case 'not':
      case '~':
        return 5;
      default:
        throw new Error('unrecognised operator');
    }
  }

  isOperand(token) {
    return token === 'T' || token === '1' || token === 'F' || token === '0' || 
           token === 'p' || token === 'q' || token === 's' || token === 'y' || token === 'z';
  }

  cleanInfix(propositionS) {
    const stringList = [];
    const str = propositionS.replace(/\s/g, '');
    
    for (let index = 0; index < str.length; index++) {
      const ch = str[index];
      const token = ch.toString();
      
      if (this.isOperand(token)) {
        stringList.push(token);
      } else if (this.isOperator(token)) {
        stringList.push(token);
      } else {
        switch (token) {
          case '-':
            stringList.push('->');
            index++;
            continue;
          case '<':
            stringList.push('<->');
            index += 2;
            continue;
          case 'o':
            stringList.push('or');
            index++;
            continue;
          case 'a':
            stringList.push('and');
            index += 2;
            continue;
          case 'x':
            if (index + 1 < str.length && str[index + 1].toString() === 'o') {
              index += 2;
              stringList.push('xor');
              continue;
            }
            throw new Error('Not a valid proposition');
          case 'n':
            if (index + 1 < str.length) {
              const nextCh = str[index + 1];
              switch (nextCh.toString()) {
                case 'a':
                  stringList.push('nand');
                  index += 3;
                  continue;
                case 'o':
                  if (index + 2 < str.length) {
                    const nextCh2 = str[index + 2];
                    switch (nextCh2.toString()) {
                      case 'r':
                        stringList.push('nor');
                        index += 2;
                        continue;
                      case 't':
                        stringList.push('not');
                        index += 2;
                        continue;
                      default:
                        throw new Error('Not a valid proposition');
                    }
                  }
                  break;
                case 'x':
                  stringList.push('nxor');
                  index += 3;
                  continue;
                default:
                  throw new Error('Not a valid proposition');
              }
            }
            break;
          default:
            throw new Error('Not a valid proposition');
        }
      }
    }
    
    return stringList;
  }

  initTruthTable() {
    this.initVariables();
    this.nbRows = Math.pow(2, this.variables.length);
    let num1 = this.nbRows / 2;
    let num2 = 0;
    this.truthTable = {};
    
    for (const variable of this.variables) {
      let flag = false;
      const boolList = new Array(this.nbRows);
      this.truthTable[variable] = boolList;
      
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
    const strArray = ['p', 'q', 's', 'y', 'z'];
    for (const str of strArray) {
      if (this.inputProp.includes(str)) {
        this.variables.push(str);
      }
    }
  }

  clear() {
    this.inputProp = '';
    this.truthTable = {};
    this.operators = [];
    this.operands = [];
  }
}


