getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZVMhnoQ8jPPryIsRLQadhFaSG-Fae0BI",
  authDomain: "rori-fc-admin.firebaseapp.com",
  projectId: "
const newsForm = document.getElementById('newsForm');
if (newsForm) {
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
