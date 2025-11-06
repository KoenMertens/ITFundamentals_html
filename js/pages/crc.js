// CRC Calculator page
import { CRCCalculator } from '../CRCCalculator.js';

let calc = new CRCCalculator();

export function loadCRC() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-check-circle"></i> CRC Calculator</h1>
                        <p class="lead">Custom CRC checksum calculator</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p>This page calculates the CRC checksum given a binary number and a custom binary polynomial.</p>
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
                            <form id="crcForm">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="inputData" class="form-label">Input Data</label>
                                        <input type="text" id="inputData" class="form-control" placeholder="Enter data bits (e.g., 101101)" />
                                        <div class="text-danger" id="inputDataError"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="polynomial" class="form-label">Polynomial</label>
                                        <input type="text" id="polynomial" class="form-control" placeholder="Enter polynomial (e.g., 1101)" />
                                        <div class="text-danger" id="polynomialError"></div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="fas fa-calculator"></i> Calculate CRC
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
                                <label class="form-label fw-bold">CRC Checksum:</label>
                                <div class="result-value" id="resultCRCChecksum">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Data with CRC:</label>
                                <div class="result-value" id="resultDataWithCRC">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Remainder:</label>
                                <div class="result-value" id="resultRemainder">N/A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup form handler
    const form = document.getElementById('crcForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCalculate();
    });
}

function handleCalculate() {
    const inputData = document.getElementById('inputData').value.trim();
    const polynomial = document.getElementById('polynomial').value.trim();

    // Clear errors
    document.getElementById('inputDataError').textContent = '';
    document.getElementById('polynomialError').textContent = '';

    // Validation
    if (!inputData) {
        document.getElementById('inputDataError').textContent = 'Input data is required';
        return;
    }

    if (!/^[01]+$/.test(inputData)) {
        document.getElementById('inputDataError').textContent = 'Only 0s and 1s are allowed';
        return;
    }

    if (!polynomial) {
        document.getElementById('polynomialError').textContent = 'Polynomial is required';
        return;
    }

    if (!/^[01]+$/.test(polynomial)) {
        document.getElementById('polynomialError').textContent = 'Only 0s and 1s are allowed';
        return;
    }

    // Set values and calculate
    calc.inputData = inputData;
    calc.polynomial = polynomial;
    calc.calculate();

    // Update results
    document.getElementById('resultCRCChecksum').textContent = calc.crcChecksum || 'N/A';
    document.getElementById('resultDataWithCRC').textContent = calc.dataWithCRC || 'N/A';
    document.getElementById('resultRemainder').textContent = calc.remainder || 'N/A';
}

