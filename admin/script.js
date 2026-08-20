import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// ዜናዎችን ከ Firebase አውርዶ በዋናው ገጽ ላይ ማሳየት
const newsContainer = document.getElementById('newsContainer');

if (newsContainer) {
    onValue(newsRef, (snapshot) => {
        newsContainer.innerHTML = '';
        const data = snapshot.val();
        
        if (data) {
            const newsKeys = Object.keys(data).reverse();
            
            newsKeys.forEach((key) => {
                const item = data[key];
                const newsCard = document.createElement('div');
                newsCard.style.cssText = "background: #ffffff; border-radius: 8px; padding: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 10px; border: 1px solid #eee;";

                const imageHtml = item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px;">` : '';

                newsCard.innerHTML = `
                    ${imageHtml}
                    <span style="font-size: 0.8rem; color: #888; font-weight: bold;">📅 ${item.date || ''}</span>
                    <h3 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">${item.title || ''}</h3>
                    <p style="color: #555; line-height: 1.5; margin: 0; white-space: pre-line;">${item.content || ''}</p>
                `;
                
                newsContainer.appendChild(newsCard);
            });
        } else {
            newsContainer.innerHTML = '<p style="text-align: center; color: #777; grid-column: 1/-1;">ምንም የተለቀቀ አዲስ ዜና የለም።</p>';
        }
    });
}
