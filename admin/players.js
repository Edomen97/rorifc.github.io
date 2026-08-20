import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZVMhnoQ8jPPryIsRLQadhFaSG-Fae0BI",
  authDomain: "rori-fc-admin.firebaseapp.com",
  databaseURL: "https://rori-fc-admin-default-rtdb.firebaseio.com",
  projectId: "rori-fc-admin",
  storageBucket: "rori-fc-admin.firebasestorage.app",
  messagingSenderId: "399039189474",
  appId: "1:399039189474:web:e773eef1300df7b12de9bb",
  measurementId: "G-LXFG47JJ14"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const playersRef = ref(db, 'players');

// ተጫዋች መመዝገቢያ ፎርም
const playerForm = document.getElementById('playerForm');
if (playerForm) {
    playerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('playerName').value;
        const position = document.getElementById('playerPosition').value;
        const number = document.getElementById('playerNumber').value;
        const image = document.getElementById('playerImage').value;

        push(playersRef, {
            name: name,
            position: position,
            number: number,
            image: image
        }).then(() => {
            alert("ተጫዋቹ በትክክል ተመዝግቧል!");
            playerForm.reset();
        }).catch((error) => {
            alert("ስህተት ተከሰተ፦ " + error.message);
        });
    });
}

// የተጫዋቾች ዝርዝር ማሳያ (አድሚን ገጽ)
onValue(playersRef, (snapshot) => {
    const tableBody = document.getElementById('playerList');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    const data = snapshot.val();
    
    if (data) {
        Object.keys(data).forEach((key) => {
            const item = data[key];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 10px;"><strong>${item.name || ''}</strong></td>
                <td style="padding: 10px;">${item.position || ''}</td>
                <td style="padding: 10px;">#${item.number || ''}</td>
                <td style="padding: 10px;">
                    <button onclick="deletePlayer('${key}')" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">ሰርዝ</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="padding: 15px; text-align: center; color: #777;">ምንም የተመዘገበ ተጫዋች የለም።</td></tr>';
    }
});

// ተጫዋች ለመሰረዝ
window.deletePlayer = function(id) {
    if (confirm("እርግጠኛ ነህ ይህን ተጫዋች ማጥፋት ትፈልጋለህ?")) {
        const itemRef = ref(db, 'players/' + id);
        remove(itemRef);
    }
};

