# 🧪 LaboratoireCHU — Gestion de laboratoire du CHU

Application web frontend développée avec **Vue.js** pour la gestion du **laboratoire clinique du CHU Tambohobe Fianarantsoa**.

Elle permet aux utilisateurs d’interagir avec un backend (CRUD, consultation) pour gérer les informations du laboratoire (analyses, équipements, personnel, etc.).

---

## 🚀 Présentation

LaboratoireCHU est une application web conçue pour faciliter la gestion des opérations du laboratoire clinique d’un Centre Hospitalier Universitaire (CHU) : visualisation des entrées, maintenance des données, interaction avec une API backend pour stocker et récupérer les informations.  
Elle est construite avec **Vue.js**, offrant une interface réactive et moderne pour les professionnels de santé.

---

## 🧰 Technologies utilisées

✔ **Vue.js** — Framework JavaScript pour interfaces réactives  
✔ **Vue CLI** — Outils de scaffolding & développement  
✔ **Axios** — Pour les appels API  
✔ **HTML / CSS** — UI & styles  
✔ **Node.js** (backend connecté séparément)  
✔ **API REST** pour la communication avec le serveur

---

## 📁 Structure du projet

LaboratoireCHU/
├── public/ # Fichiers publics (index.html, favicon)
├── src/ # Code source Vue.js
│ ├── assets/ # Images & styles
│ ├── components/ # Composants réutilisables
│ ├── views/ # Pages & vues
│ ├── router/ # Vue Router (routes)
│ ├── store/ # Vuex 
│ ├── App.vue # Composant racine
│ └── main.js # Entrée de l’application
├── babel.config.js # Configuration Babel
├── jsconfig.json # Config JS
├── package.json # Dépendances & scripts
├── vue.config.js # Config Vue CLI
└── README.md # Documentation du projet


---

## 🛠️ Installation

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/KennyhSedera/LaboratoireCHU.git
cd LaboratoireCHU
npm install
npm run serve
npm run build
