document.addEventListener('DOMContentLoaded', function() {
    fetchTransactions();
});

async function fetchTransactions() {
    try {
        // Replace with the correct URL to your server's API endpoint
        const response = await fetch('https://psychedelic-inconclusive-antelope.glitch.me/api/transactions/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const transactions = await response.json();
        console.log(transactions);
        
        // Call function to update the UI with the fetched transactions
        updateTransactionsList(transactions);
    } catch (error) {
        console.error('Could not fetch transactions:', error);
    }
}

function updateTransactionsList(transactions) {
    const transactionsList = document.getElementById('transactionsList');

    // Clear current list
    transactionsList.innerHTML = '';

    // Append each transaction as a list item
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        
        // Customize this with the transaction properties you want to display
        listItem.textContent = `Transaction ID: ${transaction._id}, Amount: ${transaction.amount}`;
        
        transactionsList.appendChild(listItem);
    });
}