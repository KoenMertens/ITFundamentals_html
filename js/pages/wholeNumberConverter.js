// Whole Number Converter page
import { NumberConverter } from '../NumberConverter.js';

let calc = new NumberConverter();

export function loadWholeNumberConverter() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-calculator"></i> Whole Number Converter</h1>
                        <p class="lead">Converter of whole numbers between different number formats</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p class="mb-0">This page converts number representations between binary, decimal, octal, hexadecimal numbers in any direction</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-edit"></i> Try it out</h3>
                        </div>
                        <div class="card-body">
                            <form id="converterForm">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="inputNumber" class="form-label">Input Number</label>
                                        <input type="text" id="inputNumber" class="form-control" placeholder="Enter a number" />
                                        <div class="text-danger" id="inputNumberError"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="numberType" class="form-label">From Base</label>
                                        <select id="numberType" class="form-select">
                                            <option value="Binary">Binary (2)</option>
                                            <option value="Octal">Octal (8)</option>
                                            <option value="Decimal">Decimal (10)</option>
                                            <option value="Hexadecimal">Hexadecimal (16)</option>
                                        </select>
                                        <div class="text-danger" id="numberTypeError"></div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="fas fa-exchange-alt"></i> Convert
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-info-circle"></i> Results</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Binary:</label>
                                <div class="result-value" id="resultBinary">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Octal:</label>
                                <div class="result-value" id="resultOctal">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Decimal:</label>
                                <div class="result-value" id="resultDecimal">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Hexadecimal:</label>
                                <div class="result-value" id="resultHexadecimal">N/A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup form handler
    const form = document.getElementById('converterForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleConvert();
    });
}

function handleConvert() {
    const inputNumber = document.getElementById('inputNumber').value.trim();
    const numberType = document.getElementById('numberType').value;

    // Clear errors
    document.getElementById('inputNumberError').textContent = '';
    document.getElementById('numberTypeError').textContent = '';

    // Validation
    if (!inputNumber) {
        document.getElementById('inputNumberError').textContent = 'Input number is required';
        return;
    }

    // Set values and calculate
    calc.inputNumber = inputNumber;
    calc.numberType = numberType;
    calc.calculate();

    // Update results
    document.getElementById('resultBinary').textContent = calc.binary || 'N/A';
    document.getElementById('resultOctal').textContent = calc.octal || 'N/A';
    document.getElementById('resultDecimal').textContent = calc.decimal || 'N/A';
    document.getElementById('resultHexadecimal').textContent = calc.hexadecimal || 'N/A';
}

