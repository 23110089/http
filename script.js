document.getElementById('httpRequestForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const headers = document.getElementById('headers').value ? JSON.parse(document.getElementById('headers').value) : {};
    const body = document.getElementById('body').value ? JSON.parse(document.getElementById('body').value) : null;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: method !== 'GET' ? JSON.stringify(body) : null
        });

        const data = await response.json();
        document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('response').textContent = 'Có lỗi xảy ra: ' + error.message;
    }
});
