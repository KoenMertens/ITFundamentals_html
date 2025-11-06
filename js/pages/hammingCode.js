// Hamming Code page
import { HammingCodeCalculator } from '../HammingCodeCalculator.js';

let calc = new HammingCodeCalculator();

export function loadHammingCode() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-shield-alt"></i> Hamming Code Calculator</h1>
                        <p class="lead">Hamming code calculator</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p>This page demonstrates and explains how the Hamming code works for a bit sequence of length 16.</p>
                        <p>Let's define the data bits as <strong>d1 to d16</strong>, and the control bits, called parity bits as <strong>p1 to p5</strong>, with indices depending on their position</p>
                        <p><strong>Enter a bitseries of max length 16</strong>, and the Hamming code will be calculated</p>
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
                            <form id="hammingForm">
                                <div class="row mb-3">
                                    <div class="col-12">
                                        <label for="inputBits" class="form-label">Input Data Bits</label>
                                        <input type="text" id="inputBits" class="form-control" placeholder="Enter data bits (e.g., 1011)" />
                                        <div class="text-danger" id="inputBitsError"></div>
                                        <div class="form-text">Enter binary data (0s and 1s only)</div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="fas fa-calculator"></i> Calculate Hamming Code
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
                                <label class="form-label fw-bold">Hamming Code:</label>
                                <div class="result-value" id="resultHammingCode">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Data Bits:</label>
                                <div class="result-value" id="resultDataBits">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Parity Bits:</label>
                                <div class="result-value" id="resultParityBits">N/A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4" id="visualizationContainer" style="display: none;">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-th"></i> Hamming Code Visualization</h3>
                        </div>
                        <div class="card-body">
                            <div class="hamming-grid" id="hammingGrid"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup form handler
    const form = document.getElementById('hammingForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCalculate();
    });
}

function handleCalculate() {
    const inputBits = document.getElementById('inputBits').value.trim();

    // Clear errors
    document.getElementById('inputBitsError').textContent = '';

    // Validation
    if (!inputBits) {
        document.getElementById('inputBitsError').textContent = 'Input bits are required';
        return;
    }

    if (!/^[01]+$/.test(inputBits)) {
        document.getElementById('inputBitsError').textContent = 'Only 0s and 1s are allowed';
        return;
    }

    if (inputBits.length > 16) {
        document.getElementById('inputBitsError').textContent = 'Maximum length is 16 bits';
        return;
    }

    // Set values and calculate
    calc.inputBits = inputBits;
    calc.calculate();

    // Update results
    document.getElementById('resultHammingCode').textContent = calc.hammingCode || 'N/A';
    document.getElementById('resultDataBits').textContent = calc.dataBits || 'N/A';
    document.getElementById('resultParityBits').textContent = calc.parityBits || 'N/A';

    // Generate visualization
    if (calc.hammingCode) {
        generateVisualization(calc.hammingCode);
        document.getElementById('visualizationContainer').style.display = 'block';
    } else {
        document.getElementById('visualizationContainer').style.display = 'none';
    }
}

function generateVisualization(hammingCode) {
    const grid = document.getElementById('hammingGrid');
    grid.innerHTML = '';

    for (let i = 0; i < hammingCode.length; i++) {
        const cell = document.createElement('div');
        const position = i + 1;
        const isParityBit = (position & (position - 1)) === 0; // Check if position is power of 2
        cell.className = 'hamming-cell ' + (isParityBit ? 'parity-bit' : 'data-bit');
        cell.textContent = hammingCode[i];
        grid.appendChild(cell);
    }
}

