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
                        <p><strong>Sender mode:</strong> Data is padded with (polynomial length - 1) zeros before CRC calculation.</p>
                        <p><strong>Receiver mode:</strong> Data used as-is for CRC calculation.</p>
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
                                    <div class="col-md-3">
                                        <label class="form-label fw-bold">Mode:</label>
                                        <select id="mode" class="form-select">
                                            <option value="receiver">Receiver</option>
                                            <option value="sender">Sender</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="inputData" class="form-label">Input Data</label>
                                        <input type="text" id="inputData" class="form-control" placeholder="e.g., 101101" />
                                        <div class="text-danger" id="inputDataError"></div>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="polynomial" class="form-label">Polynomial</label>
                                        <input type="text" id="polynomial" class="form-control" placeholder="e.g., 1101" />
                                        <div class="text-danger" id="polynomialError"></div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="fas fa-calculator"></i> Calculate CRC
                                    </button>
                                    <button type="button" id="clearBtn" class="btn btn-secondary btn-lg">
                                        <i class="fas fa-eraser"></i> Clear
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
                                <label class="form-label fw-bold">CRC Remainder:</label>
                                <div class="result-value fw-monospace fs-5 p-2 bg-light border rounded" id="resultCRCChecksum">N/A</div>
                            </div>
                            <div class="mb-3" id="senderResultsContainer" style="display: none;">
                                <label class="form-label fw-bold">Data + CRC:</label>
                                <div class="result-value fw-monospace fs-5 p-2 bg-light border rounded" id="resultDataWithCRC" title="Sender: original data concatenated with CRC remainder">N/A</div>
                            </div>
                            <div class="mb-3" id="receiverResultsContainer" style="display: none;">
                                <label class="form-label fw-bold">Conclusion:</label>
                                <div class="result-value fw-monospace fs-5 p-2 bg-light border rounded" id="resultFrame">N/A</div>
                                <small class="form-text text-muted" id="resultFrameHelp"></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Event handlers
    const form = document.getElementById('crcForm');
    const modeSelect = document.getElementById('mode');
    const clearBtn = document.getElementById('clearBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCalculate();
    });

    clearBtn.addEventListener('click', () => {
        calc.clear();
        document.getElementById('inputData').value = '';
        document.getElementById('polynomial').value = '';
        document.getElementById('inputDataError').textContent = '';
        document.getElementById('polynomialError').textContent = '';
        updateResults();
    });

    modeSelect.addEventListener('change', () => {
        // Recalculate if data already present
        if (calc.inputData && calc.polynomial) {
            calc.calculationMode = modeSelect.value;
            calc.calculate();
            updateResults();
        }
    });
}

function handleCalculate() {
    const inputData = document.getElementById('inputData').value.trim();
    const polynomial = document.getElementById('polynomial').value.trim();
    const mode = document.getElementById('mode').value;

    // Clear errors
    document.getElementById('inputDataError').textContent = '';
    document.getElementById('polynomialError').textContent = '';

    // Validation (binary only)
    if (!inputData) {
        document.getElementById('inputDataError').textContent = 'Input data required';
        return;
    }
    if (!/^[01]+$/.test(inputData)) {
        document.getElementById('inputDataError').textContent = 'Only 0s and 1s allowed';
        return;
    }
    if (!polynomial) {
        document.getElementById('polynomialError').textContent = 'Polynomial required';
        return;
    }
    if (!/^[01]+$/.test(polynomial)) {
        document.getElementById('polynomialError').textContent = 'Only 0s and 1s allowed';
        return;
    }

    // Calculate
    calc.inputData = inputData;
    calc.polynomial = polynomial;
    calc.calculationMode = mode;
    calc.calculate();

    updateResults();
}

function updateResults() {
    const mode = calc.calculationMode;
    const crcResultDiv = document.getElementById('resultCRCChecksum');
    const senderContainer = document.getElementById('senderResultsContainer');
    const receiverContainer = document.getElementById('receiverResultsContainer');
    const dataWithCRCDiv = document.getElementById('resultDataWithCRC');
    const frameDiv = document.getElementById('resultFrame');
    const helpDiv = document.getElementById('resultFrameHelp');

    crcResultDiv.textContent = calc.crcChecksum || 'Error';

    if (mode === 'sender') {
        senderContainer.style.display = 'block';
        receiverContainer.style.display = 'none';
        
        // Frame = original data + CRC remainder
        dataWithCRCDiv.textContent = calc.dataWithCRC;
    } else {
        senderContainer.style.display = 'none';
        receiverContainer.style.display = 'block';
        
        // Receiver: check if remainder is all zeros
        const remainder = calc.crcChecksum;
        const isValid = remainder && /^0+$/.test(remainder);
        frameDiv.textContent = isValid ? 'OK' : 'ERROR DETECTED';
        helpDiv.textContent = isValid ? 'Frame is valid (remainder is 0)' : 'Frame is invalid (remainder is not 0)';
        frameDiv.classList.toggle('text-success', isValid);
        frameDiv.classList.toggle('text-danger', !isValid);
    }
}