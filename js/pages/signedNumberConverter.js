// Signed Number Converter page
import { SignNumberConverter } from '../SignNumberConverter.js';

let calc = new SignNumberConverter();

export function loadSignedNumberConverter() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-plus-minus"></i> Signed Number Converter</h1>
                        <p class="lead">Converter of signed numbers between different number representation formats</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p>This page converts number representations between decimal, sign-magnitude, Excess-127 en 2-complement numbers in any direction</p>
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
                                        <input type="text" id="inputNumber" class="form-control" placeholder="Enter a signed number" />
                                        <div class="text-danger" id="inputNumberError"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="numberType" class="form-label">Representation Type</label>
                                        <select id="numberType" class="form-select">
                                            <option value="Decimal">Decimal</option>
                                            <option value="Sign_Magnitude">Sign-Magnitude</option>
                                            <option value="Excess_127">Excess-127</option>
                                            <option value="_2_Complement">Two's Complement</option>
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
                                <label class="form-label fw-bold">Decimal:</label>
                                <div class="result-value" id="resultDecimal">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Sign-Magnitude:</label>
                                <div class="result-value" id="resultSignMagnitude">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Excess-127:</label>
                                <div class="result-value" id="resultExcess127">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Two's Complement:</label>
                                <div class="result-value" id="resultComplement2">N/A</div>
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
    document.getElementById('resultDecimal').textContent = calc.decimal || 'N/A';
    document.getElementById('resultSignMagnitude').textContent = calc.signMagnitude || 'N/A';
    document.getElementById('resultExcess127').textContent = calc.excess127 || 'N/A';
    document.getElementById('resultComplement2').textContent = calc.complement2 || 'N/A';
}

