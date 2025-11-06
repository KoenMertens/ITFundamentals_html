// Veitch-Karnaugh Generator page
import { VKGenerator } from '../VKGenerator.js';

let calc = new VKGenerator();

export function loadVeitchKarnaughGenerator() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="page-header">
                        <h1><i class="fas fa-diagram-project"></i> Veitch-Karnaugh Generator</h1>
                        <p class="lead">Disjunctive Normal Form (DNF), Conjunctive Normal Form (CNF), KD-diagram and minimal expression calculator of Boolean functions</p>
                    </div>
                    
                    <div class="alert alert-info">
                        <h5><i class="fas fa-info-circle"></i> How it works:</h5>
                        <p>This page builds the DNF, CNF and Veitch-Karnaugh diagram and minimal expression for a given boolean function</p>
                        <p>The use of the proposition letters <strong>x, y, z, v, w, u</strong> and their complements are allowed. <strong>Note the case sensitivity!</strong></p>
                        <p>Use of the following operators is allowed: <strong>"." or "*" or nothing</strong> for multiplication and <strong>"+"</strong> for addition and use the <strong>"~"</strong> symbol for complement</p>
                        <p><strong>Enter a valid Boolean function</strong>, and the DNF, CNF, KD-diagram and minimal expression will be generated</p>
                        <p><strong>Please note that the top left and bottom right corners of the rectangles are indicated in different colours to easily extract the minimal expression</strong></p>
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
                            <form id="vkForm">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="booleanFunction" class="form-label">Boolean Function</label>
                                        <input type="text" id="booleanFunction" class="form-control" placeholder="Enter a boolean function (e.g., x*y + ~x*z)" />
                                        <div class="text-danger" id="booleanFunctionError"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="nbVariables" class="form-label">Number of Variables</label>
                                        <select id="nbVariables" class="form-select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                        <div class="text-danger" id="nbVariablesError"></div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="fas fa-calculator"></i> Generate Diagram
                                    </button>
                                </div>
                            </form>

                            <!-- Variable Detection and Validation -->
                            <div class="mt-4" id="validationContainer" style="display: none;">
                                <div class="alert alert-info" id="detectionAlert">
                                    <h6><i class="fas fa-search"></i> Variable Detection</h6>
                                    <p class="mb-1" id="detectionText"></p>
                                </div>
                                
                                <div class="alert" id="validationAlert" style="display: none;">
                                    <h6 id="validationTitle"></h6>
                                    <p class="mb-0" id="validationText"></p>
                                </div>
                            </div>
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
                                <label class="form-label fw-bold">DNF (Disjunctive Normal Form):</label>
                                <div class="result-value" id="resultDNF">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">CNF (Conjunctive Normal Form):</label>
                                <div class="result-value" id="resultCNF">N/A</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Minimal Expression:</label>
                                <div class="result-value" id="resultMinimalExpression">N/A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4" id="diagramContainer" style="display: none;">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-th"></i> Veitch-Karnaugh Diagram</h3>
                            <p class="mb-0"><small>Please note that the top left and bottom right corners of the rectangles are indicated in different colours to easily extract the minimal expression</small></p>
                        </div>
                        <div class="card-body">
                            <div class="veitch-karnaugh-container">
                                <table class="table table-bordered veitch-karnaugh-table" id="vkTable">
                                    <thead id="vkTableHead"></thead>
                                    <tbody id="vkTableBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup form handler
    const form = document.getElementById('vkForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleGenerate();
    });

    // Update validation on input change
    const booleanFunctionInput = document.getElementById('booleanFunction');
    const nbVariablesSelect = document.getElementById('nbVariables');
    
    booleanFunctionInput.addEventListener('input', updateValidation);
    nbVariablesSelect.addEventListener('change', updateValidation);
}

function updateValidation() {
    const booleanFunction = document.getElementById('booleanFunction').value.trim();
    if (!booleanFunction) {
        document.getElementById('validationContainer').style.display = 'none';
        return;
    }

    calc.booleanFunction = booleanFunction;
    calc.nbVariables = document.getElementById('nbVariables').value;
    
    document.getElementById('validationContainer').style.display = 'block';
    document.getElementById('detectionText').textContent = calc.getDetectedVariablesString();
    
    const validationAlert = document.getElementById('validationAlert');
    const validationTitle = document.getElementById('validationTitle');
    const validationText = document.getElementById('validationText');
    
    if (!calc.validateVariableCountBeforeCalculation()) {
        validationAlert.className = 'alert alert-danger';
        validationTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Validation Error';
        validationText.textContent = calc.getVariableCountError();
        validationAlert.style.display = 'block';
    } else {
        validationAlert.className = calc.isVariableCountMatching() ? 'alert alert-success' : 'alert alert-warning';
        validationTitle.innerHTML = '<i class="fas fa-check-circle"></i> Validation';
        validationText.textContent = calc.getVariableCountValidationMessage();
        validationAlert.style.display = 'block';
    }
}

function handleGenerate() {
    const booleanFunction = document.getElementById('booleanFunction').value.trim();
    const nbVariables = document.getElementById('nbVariables').value;

    // Clear errors
    document.getElementById('booleanFunctionError').textContent = '';
    document.getElementById('nbVariablesError').textContent = '';

    // Validation
    if (!booleanFunction) {
        document.getElementById('booleanFunctionError').textContent = 'Boolean function is required';
        return;
    }

    // Validate variable count before calculation
    calc.booleanFunction = booleanFunction;
    calc.nbVariables = nbVariables;
    
    if (!calc.validateVariableCountBeforeCalculation()) {
        document.getElementById('booleanFunctionError').textContent = calc.getVariableCountError();
        return;
    }

    try {
        // Set values and calculate
        calc.calculate();

        // Update results
        document.getElementById('resultDNF').textContent = calc.DNF || 'N/A';
        document.getElementById('resultCNF').textContent = calc.CNF || 'N/A';
        document.getElementById('resultMinimalExpression').textContent = calc.MinimalExpression || 'N/A';

        // Generate diagram
        if (calc.KD && calc.KD.length > 0) {
            generateDiagram(calc);
            document.getElementById('diagramContainer').style.display = 'block';
        } else {
            document.getElementById('diagramContainer').style.display = 'none';
        }
    } catch (error) {
        document.getElementById('booleanFunctionError').textContent = error.message || 'Invalid boolean function';
        document.getElementById('diagramContainer').style.display = 'none';
    }
}

function generateDiagram(calc) {
    const thead = document.getElementById('vkTableHead');
    const tbody = document.getElementById('vkTableBody');
    
    // Clear existing content
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Create header
    const headerRow = document.createElement('tr');
    const cornerCell = document.createElement('th');
    cornerCell.className = 'veitch-karnaugh-corner';
    headerRow.appendChild(cornerCell);
    
    if (calc.KDColHeaders && calc.KDColHeaders.length > 0) {
        for (const header of calc.KDColHeaders) {
            const th = document.createElement('th');
            th.className = 'veitch-karnaugh-header text-center';
            th.textContent = header;
            headerRow.appendChild(th);
        }
    }
    thead.appendChild(headerRow);

    // Create rows
    if (calc.KD && calc.KD.length > 0) {
        for (let i = 0; i < calc.KD.length; i++) {
            const tr = document.createElement('tr');
            
            // Row header
            if (calc.KDRowHeaders && i < calc.KDRowHeaders.length) {
                const rowHeader = document.createElement('th');
                rowHeader.className = 'veitch-karnaugh-header text-center';
                rowHeader.textContent = calc.KDRowHeaders[i];
                tr.appendChild(rowHeader);
            }
            
            // Cells
            if (calc.KD[i] && calc.KD[i].length > 0) {
                for (let j = 0; j < calc.KD[i].length; j++) {
                    const td = document.createElement('td');
                    const value = calc.KD[i][j];
                    td.className = 'veitch-karnaugh-cell ' + getCellClass(value) + ' text-center';
                    td.textContent = value;
                    
                    // Add rectangle brackets
                    if (calc.Rectangles && calc.Rectangles.length > 0) {
                        for (let rectIndex = 0; rectIndex < calc.Rectangles.length; rectIndex++) {
                            const rect = calc.Rectangles[rectIndex];
                            if (isTopLeftCorner(rect, i, j)) {
                                const bracket = document.createElement('div');
                                bracket.className = `rectangle-bracket rectangle-tl-${rectIndex}`;
                                td.appendChild(bracket);
                            }
                            if (isBottomRightCorner(rect, i, j)) {
                                const bracket = document.createElement('div');
                                bracket.className = `rectangle-bracket rectangle-br-${rectIndex}`;
                                td.appendChild(bracket);
                            }
                        }
                    }
                    
                    tr.appendChild(td);
                }
            }
            
            tbody.appendChild(tr);
        }
    }
}

function getCellClass(value) {
    switch (value) {
        case 1:
            return 'cell-true';
        case 0:
            return 'cell-false';
        default:
            return 'cell-empty';
    }
}

function isTopLeftCorner(rect, row, col) {
    const topLeft = rect.topLeft || rect.TopLeft;
    return topLeft.row === row && topLeft.column === col;
}

function isBottomRightCorner(rect, row, col) {
    const bottomRight = rect.bottomRight || rect.BottomRight;
    return bottomRight.row === row && bottomRight.column === col;
}
