import React, { useState } from "react";

function Formularz({ dodaj }) {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [data, setData] = useState("");
  const [telefon, setTelefon] = useState("");

  const wyslij = (e) => {
    e.preventDefault();
    if (!imie.trim() || !nazwisko.trim() || !data || !telefon.trim()) {
      alert("Wszystkie pola muszą być wypełnione!");
      return;
    }
    const numerValid = /^\d{9}$/;
    if (!numerValid.test(telefon)) {
      alert("Numer telefonu musi mieć dokładnie 9 cyfr!");
      return;
    }
    const dzis = new Date();
    const najstarszaData = new Date("1900-01-01");
    const wpisanaData = new Date(data);
    if (wpisanaData > dzis || wpisanaData < najstarszaData) {
      alert("Niepoprawna data!");
      return;
    }
    dodaj({ imie, nazwisko, data, telefon });
    setImie(""); setNazwisko(""); setData(""); setTelefon("");
  };

  return (
    <div className="card shadow p-3 mb-3">
      <h5 className="card-title text-center mb-3">Dodaj uczestnika</h5>
      <form onSubmit={wyslij}>
        <div className="mb-2 input-group">
          <span className="input-group-text">👤</span>
          <input type="text" className="form-control" placeholder="Imię" value={imie} onChange={e=>setImie(e.target.value)} required/>
        </div>
        <div className="mb-2 input-group">
          <span className="input-group-text">👥</span>
          <input type="text" className="form-control" placeholder="Nazwisko" value={nazwisko} onChange={e=>setNazwisko(e.target.value)} required/>
        </div>
        <div className="mb-2 input-group">
          <span className="input-group-text">📅</span>
          <input type="date" className="form-control" value={data} onChange={e=>setData(e.target.value)} required min="1900-01-01" max={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="mb-2 input-group">
          <span className="input-group-text">📞</span>
          <input type="tel" className="form-control" placeholder="Telefon (9 cyfr)" value={telefon} onChange={e=>setTelefon(e.target.value)} pattern="\d{9}" title="Numer telefonu musi mieć dokładnie 9 cyfr" required/>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-2">Dodaj uczestnika</button>
      </form>
    </div>
  );
}

export default Formularz;