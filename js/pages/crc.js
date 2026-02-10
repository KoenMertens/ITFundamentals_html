// CRC Calculator page
import { CRCCalculator } from '../CRCCalculator.js';

let calc = new CRCCalculator();

export function loadCRC() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Custom CRC checksum calculator</h1>
    <p>This page calculates the CRC checksum given a binary number and a custom binary polynomial.</p>

    <label>Mode:
      <select id="mode">
        <option value="receiver">Receiver (check frame)</option>
        <option value="sender">Sender (create frame)</option>
      </select>
    </label>
    <span title="Sender: data is internally padded with (polynomial length - 1) zeros before CRC is calculated. Receiver: data is used as received.">
      [?]
    </span>

    <div>
      <label>Data bits:
        <input id="data" type="text" />
      </label>
    </div>

    <div>
      <label>Polynomial:
        <input id="poly" type="text" />
      </label>
    </div>

    <button id="calc">Calculate</button>
    <button id="clear">Clear</button>

    <h2>Result</h2>
    <div id="crcResult"></div>
    <div id="frameResult"></div>
  `;

  const dataInput = document.getElementById('data');
  const polyInput = document.getElementById('poly');
  const modeSelect = document.getElementById('mode');
  const crcResultDiv = document.getElementById('crcResult');
  const frameResultDiv = document.getElementById('frameResult');

  document.getElementById('calc').addEventListener('click', () => {
    calc.inputData = dataInput.value.trim();
    calc.polynomial = polyInput.value.trim();
    calc.calculationMode = modeSelect.value;
    calc.calculate();
    
    crcResultDiv.textContent = `CRC remainder (${calc.calculationMode}): ${calc.crcChecksum}`;
    
    if (calc.calculationMode === 'sender') {
      frameResultDiv.textContent = `Frame to send (data + CRC): ${calc.dataWithCRC}`;
        frameResultDiv.title = 'Sender: CRC computed over data padded with (poly length - 1) zeros, remainder appended to original data.';
    } else {
        frameResultDiv.textContent = `Check: remainder of received frame: ${calc.crcChecksum}`;
        frameResultDiv.title = 'Receiver: correct frame should yield remainder 0.';
    }
  });

  document.getElementById('clear').addEventListener('click', () => {
    calc.clear();
    dataInput.value = '';
    polyInput.value = '';
    crcResultDiv.textContent = '';
    frameResultDiv.textContent = '';
  });

}