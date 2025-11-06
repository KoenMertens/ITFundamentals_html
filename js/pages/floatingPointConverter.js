// Floating Point Converter page
import { IEEE754Converter } from '../IEEE754Converter.js';

let calc = new IEEE754Converter();

export function loadFloatingPointConverter() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-water"></i> IEEE-754 Floating Point Converter</h1>
                        <p class="lead">Converter between a decimal and its IEEE-754 floating point single precision binary representation in both directions</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p class="mb-0">
                            A decimal is represented as a binary number in IEEE-754 format with 32 bits.<br>
                            Often these bits are represented as an 8 digit hexadecimal for readability.<br>
                            The first bit represents the sign: a 0 corresponds to a positive number, a 1 to negative numbers.<br>
                            The next 8 bits represents the exponent in Excess-127 format to facilitate negative exponents<br>
                            The next 23 bits represents the mantissa. This is the part behind the binary separator (e.g. 1, or 1.) of a number in its scientific binary representation<br>
                            i.e. a number is converted to its standard "1.xxxxxxxxxxxxxxxxxxxxxxx" pow(2,exp) where the sequence of x's represent the mantissa, and exp the exponent<br>
                            <strong>Please note we are using the "," as separator</strong>
                        </p>
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
                                    <div class="col-12">
                                        <label for="inputNumber" class="form-label">Input Number</label>
                                        <input type="text" id="inputNumber" class="form-control" placeholder="Enter a decimal number" />
                                        <div class="text-danger" id="inputNumberError"></div>
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
                                <label class="form-label fw-bold">Sign Bit:</label>
                                <div class="result-value" id="resultSignBit">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Exponent:</label>
                                <div class="result-value" id="resultExponent">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Mantissa:</label>
                                <div class="result-value" id="resultMantissa">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Binary Representation:</label>
                                <div class="result-value" id="resultBinary">N/A</div>
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

    // Clear errors
    document.getElementById('inputNumberError').textContent = '';

    // Validation
    if (!inputNumber) {
        document.getElementById('inputNumberError').textContent = 'Input number is required';
        return;
    }

    // Set values and calculate
    calc.inputNumber = inputNumber;
    calc.calculate();

    // Update results
    document.getElementById('resultSignBit').textContent = calc.signBit || 'N/A';
    document.getElementById('resultExponent').textContent = calc.exponent || 'N/A';
    document.getElementById('resultMantissa').textContent = calc.mantissa || 'N/A';
    document.getElementById('resultBinary').textContent = calc.binary || 'N/A';
}

