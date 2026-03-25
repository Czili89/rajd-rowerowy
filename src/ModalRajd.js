import React, { useState } from "react";

function ModalRajd({ pokaz, zamknij, zapisz, czyWymagany }) {
  const dzis = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    nazwa: "",
    data: "",
    miejsce: "",
    godzina: "",
    dlugosc: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (Object.values(form).some(v => !v)) {
      alert("Uzupełnij wszystkie pola");
      return;
    }

    zapisz(form);
    zamknij(false); // zamykamy modal normalnie
  };

  const anuluj = () => {
    // jeśli rajd jest wymagany (pierwszy raz), wyloguj
    if (czyWymagany) {
      zamknij(true); // true → wyloguj
    } else {
      zamknij(false); // normalne zamknięcie modala
    }
  };

  if (!pokaz) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "#00000088" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Nowy rajd</h5>
            <button className="btn-close" onClick={anuluj}></button>
          </div>

          <form onSubmit={submit}>
            <div className="modal-body">
              <input name="nazwa" className="form-control mb-2" placeholder="Nazwa rajdu" onChange={handleChange} />
              <input name="data" type="date" min={dzis} className="form-control mb-2" onChange={handleChange} />
              <input name="miejsce" className="form-control mb-2" placeholder="Miejsce" onChange={handleChange} />
              <input name="godzina" type="time" className="form-control mb-2" onChange={handleChange} />
              <input name="dlugosc" type="number" className="form-control" placeholder="Długość (km)" onChange={handleChange} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={anuluj}>Anuluj</button>
              <button type="submit" className="btn btn-success">Zapisz</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalRajd;