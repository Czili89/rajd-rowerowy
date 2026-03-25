// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ zaloguj }) {
  const [email, setEmail] = useState("");
  const [haslo, setHaslo] = useState("");
  const [capsLock, setCapsLock] = useState(false);
  const [pokazHaslo, setPokazHaslo] = useState(false);
  const [blad, setBlad] = useState(""); // do wyświetlania błędów logowania

  const sprawdz = async (e) => {
    e.preventDefault();
    setBlad("");
    try {
      // logowanie w Firebase
      await signInWithEmailAndPassword(auth, email, haslo);
      zaloguj(true);
    } catch (error) {
      setBlad("Nieprawidłowy login lub hasło");
    }
  };

  const sprawdzCaps = (e) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "320px" }}>
        <h3 className="text-center mb-3">Panel Admina</h3>

        <form onSubmit={sprawdz}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
          />

          <div className="mb-2 position-relative">
            <input
              type={pokazHaslo ? "text" : "password"}
              placeholder="Hasło"
              value={haslo}
              onChange={(e) => setHaslo(e.target.value)}
              onKeyUp={sprawdzCaps}
              onKeyDown={sprawdzCaps}
              className="form-control"
            />
            <button
              type="button"
              onClick={() => setPokazHaslo(!pokazHaslo)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer"
              }}
            >
              {pokazHaslo ? "🙈" : "👁️"}
            </button>
          </div>

          {capsLock && (
            <div className="form-text text-danger mb-2">
              ⚠ Masz włączony Caps Lock
            </div>
          )}

          {blad && (
            <div className="form-text text-danger mb-2">
              {blad}
            </div>
          )}

          <button className="btn btn-primary w-100 mt-3" type="submit">
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;