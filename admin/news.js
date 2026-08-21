
    
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const newsRef = ref(db, 'news');

document.addEventListener('DOMContentLoaded', () => {
    const newsForm = document.getElementById('newsForm');
    
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
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
                alert("🎉 ዜናው በትክክል ወደ ሰርቨር ተልኳል!");
                newsForm.reset();
            }).catch((error) => {
                alert("❌ ስህተት ተከሰተ፦ " + error.message);
            });
        });
    }
});
