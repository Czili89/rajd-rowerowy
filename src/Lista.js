import React from "react";

function Lista({ uczestnicy, usun }) {
  if (!uczestnicy.length) return <p className="text-center">Brak uczestników</p>;

  return (
    <div className="card shadow p-3 mb-3">
      <h5 className="card-title text-center mb-3">Lista uczestników</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Data</th>
              <th>Telefon</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {uczestnicy.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.imie}</td>
                <td>{u.nazwisko}</td>
                <td>{u.data}</td>
                <td>{u.telefon}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => usun(u.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lista;