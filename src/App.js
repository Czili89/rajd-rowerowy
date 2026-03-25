// src/App.js
import React, { useState, useEffect } from "react";
import Formularz from "./Formularz";
import Lista from "./Lista";
import Login from "./Login";
import Navbar from "./Navbar";
import ModalRajd from "./ModalRajd";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Firebase
import { db } from "./firebase";
import { ref, set, get, onValue, push, remove } from "firebase/database";

function App() {
  const usunPolskieZnaki = (text) => {
    if (!text) return "";
    const map = { 'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z','Ą':'A','Ć':'C','Ę':'E','Ł':'L','Ń':'N','Ó':'O','Ś':'S','Ź':'Z','Ż':'Z' };
    return text.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, m => map[m]);
  };

  const [uczestnicy, setUczestnicy] = useState([]);
  const [uczestnicyMap, setUczestnicyMap] = useState({}); // {id: dane}
  const [rajdInfo, setRajdInfo] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [pokazModal, setPokazModal] = useState(false);
  const [czyWymaganyRajd, setCzyWymaganyRajd] = useState(false);

  // 🔹 Wczytaj dane z Firebase
  useEffect(() => {
    const rajdRef = ref(db, "rajdInfo");
    get(rajdRef).then(snapshot => {
      if(snapshot.exists()) setRajdInfo(snapshot.val());
    });

    const uczestnicyRef = ref(db, "uczestnicy");
    onValue(uczestnicyRef, snapshot => {
      const data = snapshot.val() || {};
      setUczestnicyMap(data);
      setUczestnicy(Object.entries(data).map(([key, val]) => ({ id: key, ...val })));
    });
  }, []);

  const zaloguj = (status) => {
    setAdmin(status);
    if(status && !rajdInfo){
      setCzyWymaganyRajd(true);
      setPokazModal(true);
    }
  };
  const wyloguj = () => setAdmin(false);

  // 🔹 Dodawanie uczestnika
  const dodaj = (osoba) => {
    const uczestnicyRef = ref(db, "uczestnicy");
    push(uczestnicyRef, osoba);
  };

  // 🔹 Usuwanie uczestnika po ID
  const usun = (id) => {
    const uczestnikRef = ref(db, `uczestnicy/${id}`);
    remove(uczestnikRef);
  };

  const dodajRajd = () => { setCzyWymaganyRajd(false); setPokazModal(true); };
  const zapiszRajd = (dane) => {
    setRajdInfo(dane);
    set(ref(db,"rajdInfo"), dane);
    set(ref(db,"uczestnicy"), {}); // reset uczestników
  };

  const zamknijModal = (wylogujUser=false) => { setPokazModal(false); if(wylogujUser) setAdmin(false); };

  const eksportCSV = () => {
    if(!rajdInfo) return;
    let csv = `Rajd:;${usunPolskieZnaki(rajdInfo.nazwa || "")}\n`;
    csv += `Data:;${rajdInfo.data || ""} ${rajdInfo.godzina || ""}\n`;
    csv += `Miejsce:;${usunPolskieZnaki(rajdInfo.miejsce || "")}\n`;
    csv += `Dlugosc:;${rajdInfo.dlugosc || ""} km\n\n`;
    csv += "Lp.;Imie;Nazwisko;Data urodzenia;Telefon\n";
    uczestnicy.forEach((u,i)=>{ 
      csv+=`${i+1};${usunPolskieZnaki(u.imie)};${usunPolskieZnaki(u.nazwisko)};${u.data};${u.telefon}\n`; 
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv"}));
    a.download = "uczestnicy.csv";
    a.click();
  };

  const eksportPDF = () => {
    if(!rajdInfo) return;
    const doc = new jsPDF();
    doc.setFont("helvetica","bold"); doc.setFontSize(16); doc.text(`Rajd: ${usunPolskieZnaki(rajdInfo.nazwa || "")}`,14,20);
    doc.setFont("helvetica","normal"); doc.setFontSize(12);
    doc.text(`Data: ${rajdInfo.data || ""} ${rajdInfo.godzina || ""}`,14,28);
    doc.text(`Miejsce: ${usunPolskieZnaki(rajdInfo.miejsce || "")}`,14,36);
    doc.text(`Dlugosc: ${rajdInfo.dlugosc || ""} km`,14,44);
    autoTable(doc,{
      startY:55,
      head:[["Lp.","Imie","Nazwisko","Data urodzenia","Telefon"]],
      body:uczestnicy.map((u,i)=>[i+1,usunPolskieZnaki(u.imie),usunPolskieZnaki(u.nazwisko),u.data,u.telefon])
    });
    doc.save("uczestnicy.pdf");
  };

  return (
    <Router>
      <Navbar admin={admin} wyloguj={wyloguj} dodajRajd={dodajRajd} />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={admin ? <Navigate to="/uczestnicy" /> : <Login zaloguj={zaloguj} />} />
          <Route path="/uczestnicy" element={!admin ? <Navigate to="/login" /> : (
            <>
              {rajdInfo && (
                <div className="card mb-4 shadow text-center">
                  <div className="card-body">
                    <h4>{rajdInfo.nazwa}</h4>
                    <p>📅 {rajdInfo.data} ⏰ {rajdInfo.godzina}</p>
                    <p>📍 {rajdInfo.miejsce}</p>
                    <p>🚴 {rajdInfo.dlugosc} km</p>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-12 col-md-6 mb-3"><Formularz dodaj={dodaj} /></div>
                <div className="col-12 col-md-6 mb-3"><Lista uczestnicy={uczestnicy} usun={usun} /></div>
              </div>
              <div className="text-center mb-4">
                <button className="btn btn-success me-2" onClick={eksportCSV}>Eksport CSV</button>
                <button className="btn btn-warning" onClick={eksportPDF}>Eksport PDF</button>
              </div>
            </>
          )}/>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <ModalRajd pokaz={pokazModal} zamknij={zamknijModal} zapisz={zapiszRajd} czyWymagany={czyWymaganyRajd} />
    </Router>
  );
}

export default App;