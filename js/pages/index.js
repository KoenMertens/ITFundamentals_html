// Index/Home page
export function loadIndex() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('App element not found in loadIndex');
        return;
    }
    app.innerHTML = `
        <div class="hero-section">
            <h1 class="display-4">IT Fundamentals for maths and coding lovers</h1>
            <p class="lead">This is an educational website from HOGent for the IT Fundamentals course, taught in the first bachelor year.</p>
        </div>

        <div class="content-section">
            <div class="row">
                <div class="col-md-8">
                    <p>
                        This website is built in HTML and JavaScript and the content is provided by the HOGent lecturers IT Fundamentals.
                        <br>Thanks for visiting and feel free to try the functionality on this site and please provide feedback to 
                        <a href="mailto:koen.mertens@hogent.be">koen.mertens@hogent.be</a>
                    </p>
                    
                    <h3>Available Tools</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Number Converters</h5>
                                    <p class="card-text">Convert between binary, decimal, octal, and hexadecimal numbers.</p>
                                    <a href="#/WholeNumberConverter" class="btn btn-primary">Whole Numbers</a>
                                    <a href="#/SignedNumberConverter" class="btn btn-primary">Signed Numbers</a>
                                    <a href="#/FractionalConverter" class="btn btn-primary">Fractional Numbers</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Advanced Tools</h5>
                                    <p class="card-text">IEEE-754 floating point conversion, truth tables, and Boolean functions.</p>
                                    <a href="#/FloatingPointConverter" class="btn btn-primary">Floating Point</a>
                                    <a href="#/TruthTableGenerator" class="btn btn-primary">Truth Tables</a>
                                    <a href="#/VeitchKarnaughGenerator" class="btn btn-primary">Veitch-Karnaugh</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Error Detection</h5>
                                    <p class="card-text">Hamming codes and CRC calculations for error detection and correction.</p>
                                    <a href="#/HammingCode" class="btn btn-primary">Hamming Code</a>
                                    <a href="#/CRC" class="btn btn-primary">CRC Calculator</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

