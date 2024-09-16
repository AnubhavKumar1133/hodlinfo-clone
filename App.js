document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#ticker-table tbody');

    try {
        const response = await fetch('/api/tickers');
        const tickers = await response.json();

        tickers.forEach(ticker => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticker.name}</td>
                <td>${ticker.last}</td>
                <td>${ticker.buy}</td>
                <td>${ticker.sell}</td>
                <td>${ticker.volume}</td>
                <td>${ticker.base_unit}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching ticker data:', error);
    }
});
