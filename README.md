🚴 Rajd Rowerowy 

Prosty projekt szkolny umożliwiający zarządzanie rajdami rowerowymi.
Aplikacja została stworzona w React i spełnia wszystkie wymagania projektowe: od responsywności po panel admina i eksport danych.

📋 Wymagania projektu i realizacja
Wymóg	Realizacja w projekcie
a) Responsywność	Aplikacja działa na różnych rozdzielczościach, menu mobilne w formie hamburgera.
b) Możliwość instalacji	Możliwe publikowanie repozytorium na GitHub; projekt można pakować do aplikacji webowej, a przez narzędzia typu Electron lub PWA uruchomić na Windows i Android.
c) Panel administracyjny	Uproszczony panel do tworzenia rajdów, dodawania i usuwania uczestników.
d) Dane w chmurze	Wszystkie dane są przechowywane w Firebase Realtime Database.
e) Ochrona danych	Logowanie do panelu admina, dane przechowywane w Firebase z ograniczonym dostępem.
f) Czytelny interfejs zapisów	Formularz uczestnika z polami: imię, nazwisko, data urodzenia, numer telefonu z walidacją.
g) Zarządzanie uczestnikami	Możliwość dopisywania i usuwania zawodników z listy rajdu.
h) Eksport list uczestników	Możliwość drukowania listy na ekranie oraz eksport do CSV i PDF.
i) Ostylowany interfejs	Przyjazny layout, kolory, elementy menu dla urządzeń mobilnych.
j) Repozytorium GitHub i README	Projekt opublikowany w repo: rajd-rowerowy
 wraz z tym plikiem README.
k) Paczka instalacyjna	Możliwe utworzenie paczki ZIP do instalacji i publikacji projektu.
l) Routing	Aplikacja korzysta z React Router do nawigacji między ekranami (Login, Panel admina, Lista rajdów).

🧩 Funkcje projektu
Dodawanie rajdów z możliwością importu danych z PDF i CSV
Dodawanie i usuwanie uczestników rajdu
Walidacja numeru telefonu i poprawności danych uczestnika
Wyświetlanie listy uczestników w czytelnej tabeli
Eksport listy do PDF lub CSV oraz drukowanie na ekranie
Responsywny i ostylowany interfejs z hamburger menu
Logowanie do panelu admina i ograniczenie dostępu do danych
Routing między ekranami w aplikacji

📦 Struktura projektu
public/
  ├── index.html
  ├── manifest.json
  └── robots.txt
src/
  ├── App.js           # główny komponent
  ├── Formularz.js     # formularz dodawania uczestników
  ├── Lista.js         # lista uczestników i rajdów
  ├── Login.js         # logowanie do panelu
  ├── ModalRajd.js     # modal szczegółów rajdu
  ├── Navbar.js        # pasek nawigacji + hamburger menu
  ├── Navbar.css
  ├── firebase.js      # konfiguracja Firebase
  ├── index.js
  └── index.css
.env                   # zmienne środowiskowe Firebase
.gitignore
package.json
package-lock.json
README.md
🚀 Uruchomienie lokalne
Sklonuj repozytorium:
git clone https://github.com/Czili89/rajd-rowerowy.git
cd rajd-rowerowy
Zainstaluj zależności:
npm install
Utwórz plik .env z konfiguracją Firebase.
Uruchom aplikację:
npm start

Otwórz przeglądarkę pod adresem http://localhost:3000.

🛠️ Technologie
React (frontend)
React Router (routing)
Firebase Realtime Database (przechowywanie danych)
JavaScript / JSX / CSS
CSV i PDF export
📄 Licencja

Projekt dostępny na licencji MIT.
