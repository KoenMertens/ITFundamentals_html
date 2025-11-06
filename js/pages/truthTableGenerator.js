// Truth Table Generator page
import { TruthTableGenerator } from '../TruthTableGenerator.js';

let calc = new TruthTableGenerator();

export function loadTruthTableGenerator() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-table"></i> Truth Table Generator</h1>
                        <p class="lead">Truth table generator</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p>This page builds the truth table for the entered proposition</p>
                        <p>The use of the proposition letters <strong>p, q, s, y and z</strong> and the constant values either <strong>"T" or "1"</strong> for true and either <strong>"F" or "0"</strong> for false are allowed. <strong>Note the case sensitivity!</strong></p>
                        <p>Use of the following operators is allowed: <strong>"^" and "and"</strong> both, <strong>"v" and "or"</strong> both, <strong>"~" and "not"</strong>, <strong>"->"</strong> for implication, <strong>"&lt;-&gt;"</strong> for equivalence, and the operators <strong>"xor", "nand", "nor", "nxor"</strong></p>
                        <p><strong>Priority rules are:</strong> "not" has higher priority over "and", which has higher priority over "or". The variants with "x-" or "n-" prefix have the same priority as their prefixless version</p>
                        <p>The intermediate steps are calculated for clarity of the user when checking own calculations. The last column is the final result</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-calculator"></i> Enter Proposition</h3>
                        </div>
                        <div class="card-body">
                            <form id="generatorForm">
                                <div class="mb-3">
                                    <label for="inputProp" class="form-label">Proposition</label>
                                    <input type="text" id="inputProp" class="form-control" placeholder="Enter a valid proposition (e.g., p and q and not s)" />
                                    <div class="text-danger" id="inputPropError"></div>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-calculate"></i> Generate Truth Table
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
                                <label class="form-label fw-bold">Variables:</label>
                                <div class="result-value" id="resultVariables">0</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Number of Rows:</label>
                                <div class="result-value" id="resultNbRows">0</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Postfix:</label>
                                <div class="result-value" id="resultPostFix">N/A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4" id="truthTableContainer" style="display: none;">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-table"></i> Truth Table</h3>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover truth-table" id="truthTable">
                                    <thead id="truthTableHead"></thead>
                                    <tbody id="truthTableBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup form handler
    const form = document.getElementById('generatorForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleGenerate();
    });
}

function handleGenerate() {
    const inputProp = document.getElementById('inputProp').value.trim();

    // Clear errors
    document.getElementById('inputPropError').textContent = '';

    // Validation
    if (!inputProp) {
        document.getElementById('inputPropError').textContent = 'Proposition is required';
        return;
    }

    try {
        // Set values and calculate
        calc.inputProp = inputProp;
        calc.calculate();

        // Update results
        document.getElementById('resultVariables').textContent = calc.variables.length;
        document.getElementById('resultNbRows').textContent = calc.nbRows;
        document.getElementById('resultPostFix').textContent = calc.postFix || 'N/A';

        // Generate truth table
        if (calc.truthTable && Object.keys(calc.truthTable).length > 0) {
            generateTruthTableHTML(calc.truthTable);
            document.getElementById('truthTableContainer').style.display = 'block';
        } else {
            document.getElementById('truthTableContainer').style.display = 'none';
        }
    } catch (error) {
        document.getElementById('inputPropError').textContent = error.message || 'Invalid proposition';
        document.getElementById('truthTableContainer').style.display = 'none';
    }
}

function generateTruthTableHTML(truthTable) {
    const thead = document.getElementById('truthTableHead');
    const tbody = document.getElementById('truthTableBody');
    
    // Clear existing content
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Get column names
    const columns = Object.keys(truthTable);
    const firstColumn = columns[0];
    const rowCount = truthTable[firstColumn] ? truthTable[firstColumn].length : 0;

    // Create header
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.className = 'text-center' + (col === columns[columns.length - 1] ? ' final-result' : '');
        th.textContent = col;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create rows
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const tr = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            const value = truthTable[col] && truthTable[col][rowIndex];
            td.className = 'text-center ' + (value ? 'true-value' : 'false-value');
            td.textContent = value ? 'T' : 'F';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
}

