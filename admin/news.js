import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase(app);
const newsRef = ref(db, 'news');

// ዜና ወደ Firebase መላክ
const newsForm = document.getElementById('newsForm');
if (newsForm) {
    newsForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('newsTitle').value;
        const date = document.getElementById('newsDate').value;
        const image = document.getElementById('newsImage').value;
        const content = document.getElementById('newsContent').value;

        push(newsRef, {
            title: title,
            date: date,
            image: image,
            content: content
        }).then(() => {
            newsForm.reset();
        }).catch((error) => {
            alert("ስህተት ተከሰቷል፦ " + error.message);
        });
    });
}

// ዜናዎችን ከ Firebase በቀጥታ ማንበብ
onValue(newsRef, (snapshot) => {
    const tableBody = document.getElementById('newsList');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    const data = snapshot.val();
    
    if (data) {
        Object.keys(data).forEach((key) => {
            const item = data[key];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 10px;"><strong>${item.title || ''}</strong></td>
                <td style="padding: 10px;">${item.date || ''}</td>
                <td style="padding: 10px;">${item.content ? item.content.substring(0, 40) + '...' : ''}</td>
                <td style="padding: 10px;">
                    <button onclick="deleteNews('${key}')" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">ሰርዝ</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="padding: 15px; text-align: center; color: #777;">ምንም የተለቀቀ ዜና የለም።</td></tr>';
    }
});

// ዜና ለማጥፋት
window.deleteNews = function(id) {
    if (confirm("እርግጠኛ ነህ ይህን ዜና ማጥፋት ትፈልጋለህ?")) {
        const itemRef = ref(db, 'news/' + id);
        remove(itemRef);
    }
};
