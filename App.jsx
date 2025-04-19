import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [moment, setMoment] = useState([]);
  const [form, setForm] = useState({ namn: "", material: "", arbete: "", tillval: false });
  const moms = 0.25;
  const rot = 0.3;
  const marginal = 0.1;

  const addMoment = () => {
    if (!form.namn) return;
    setMoment([
      ...moment,
      {
        namn: form.namn,
        materialkostnad: parseFloat(form.material) || 0,
        arbetskostnad: parseFloat(form.arbete) || 0,
        tillval: form.tillval,
      },
    ]);
    setForm({ namn: "", material: "", arbete: "", tillval: false });
  };

  const removeMoment = (namn) => {
    setMoment(moment.filter((m) => m.namn !== namn));
  };

  const totalMaterial = moment.reduce((sum, m) => sum + m.materialkostnad, 0);
  const totalArbete = moment.reduce((sum, m) => sum + m.arbetskostnad, 0);
  const totalForeMoms = (totalMaterial + totalArbete) * (1 + marginal) - totalArbete * rot;
  const totalInklMoms = totalForeMoms * (1 + moms);

  return (
    <div className="container">
      <h1>Husbygge Kalkyl</h1>
      <p>Lägg till moment och få en kostnadsuppskattning inklusive moms, ROT och marginal.</p>

      <div className="form">
        <input placeholder="Moment" value={form.namn} onChange={(e) => setForm({ ...form, namn: e.target.value })} />
        <input placeholder="Materialkostnad" type="number" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
        <input placeholder="Arbetskostnad" type="number" value={form.arbete} onChange={(e) => setForm({ ...form, arbete: e.target.value })} />
        <label><input type="checkbox" checked={form.tillval} onChange={(e) => setForm({ ...form, tillval: e.target.checked })} /> Tillval</label>
        <button onClick={addMoment}>Lägg till</button>
      </div>

      <ul>
        {moment.map((m, i) => (
          <li key={i}>
            <strong>{m.namn}</strong> {m.tillval ? "(Tillval)" : ""} – Material: {m.materialkostnad} kr, Arbete: {m.arbetskostnad} kr
            <button onClick={() => removeMoment(m.namn)}>Ta bort</button>
          </li>
        ))}
      </ul>

      <div className="result">
        <p>Materialkostnad: {totalMaterial} kr</p>
        <p>Arbetskostnad: {totalArbete} kr</p>
        <p>Totalt före moms: {Math.round(totalForeMoms)} kr</p>
        <p><strong>Totalt inkl. moms: {Math.round(totalInklMoms)} kr</strong></p>
      </div>
    </div>
  );
}

export default App;
