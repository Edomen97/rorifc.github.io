import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZVMhnoQ8jPPryIsRLQadhFaSG-Fae0BI",
  authDomain: "rori-fc-admin.firebaseapp.com",
  projectId: "rori-fc-admin",
  storageBucket: "rori-fc-admin.firebasestorage.app",
  messagingSenderId: "399039189474",
  appId: "1:399039189474:web:e773eef1300df7b12de9bb",
  measurementId: "G-LXFG47JJ14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
});

const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    });
}

const playerForm = document.getElementById('add-player-form');
const playersTableBody = document.getElementById('players-table-body');

if (playerForm) {
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('player-name').value;
        const number = document.getElementById('jersey-number').value;
        const position = document.getElementById('player-position').value;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${number}</strong></td>
            <td>${name}</td>
            <td><span class="pos-badge">${position}</span></td>
            <td><button class="delete-btn" onclick="this.parentElement.parentElement.remove()"><i class="fas fa-trash"></i> ሰርዝ</button></td>
        `;

        playersTableBody.appendChild(row);
        playerForm.reset();
    });
}
