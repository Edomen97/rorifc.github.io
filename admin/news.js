document.getElementById('newsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('newsTitle').value;
    const date = document.getElementById('newsDate').value;
    const content = document.getElementById('newsContent').value;

    const tableBody = document.getElementById('newsList');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td style="padding: 8px;"><strong>${title}</strong></td>
        <td style="padding: 8px;">${date}</td>
        <td style="padding: 8px;">${content.substring(0, 40)}...</td>
        <td style="padding: 8px;"><button onclick="deleteNews(this)" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer;">ሰርዝ</button></td>
    `;

    tableBody.appendChild(row);
    document.getElementById('newsForm').reset();
});

function deleteNews(button) {
    button.parentElement.parentElement.remove();
}
