// Firebase SDK ሞጁሎችን ማስገባት
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// የ Rori FC Admin ማገናኛ ኮድ
const firebaseConfig = {
  apiKey: "AIzaSyAZVMhnoQ8jPPryIsRLQadhFaSG-Fae0BI",
  authDomain: "rori-fc-admin.firebaseapp.com",
  projectId: "rori-fc-admin",
  storageBucket: "rori-fc-admin.firebasestorage.app",
  messagingSenderId: "399039189474",
  appId: "1:399039189474:web:e773eef1300df7b12de9bb",
  measurementId: "G-LXFG47JJ14"
};

// Firebaseን ማስጀመር
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// የ HTML ኤለመንቶችን መያዝ
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    loginBtn.innerText = "እያረጋገጠ ነው...";
    errorMessage.style.display = "none";

    // መረጃውን ወደ Firebase ልኮ ማረጋገጥ
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // ኢሜል እና ፓስወርዱ ትክክል ከሆነ ወደ ዳሽቦርዱ ይሂድ
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
            // ስህተት ካለ ማሳወቅ
            errorMessage.style.display = "block";
            errorMessage.innerText = "የተሳሳተ ኢሜል ወይም የይለፍ ቃል አስገብተዋል!";
            loginBtn.innerText = "ግባ (Login)";
            console.error("ስህተት:", error.message);
        });
});
document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // ተጫዋችና ዜና ብዛት
            if(document.getElementById('totalPlayers')) document.getElementById('totalPlayers').textContent = data.total_players;
            
            // ዜናዎችን ማሳየት
            let newsContainer = document.getElementById('newsContainer');
            if(newsContainer && data.news) {
                newsContainer.innerHTML = data.news.map(item => `
                    <div style="background:#f8f9fa; border-left:4px solid #3498db; padding:10px; margin-bottom:10px;">
                        <h4>${item.title}</h4>
                        <p>${item.content}</p>
                        <small>${item.date}</small>
                    </div>
                `).join('');
            }

            // የሊግ ሰንጠረዥ ማሳየት
            let tableBody = document.getElementById('leagueTableBody');
            if(tableBody && data.table) {
                tableBody.innerHTML = data.table.map(row => `
                    <tr>
                        <td>${row.rank}</td>
                        <td><strong>${row.team}</strong></td>
                        <td>${row.played}</td>
                        <td>${row.won}</td>
                        <td>${row.drawn}</td>
                        <td>${row.lost}</td>
                        <td>${row.gd}</td>
                        <td><strong>${row.points}</strong></td>
                    </tr>
                `).join('');
            }
        })
        .catch(err => console.error("Error loading data.json:", err));
});
