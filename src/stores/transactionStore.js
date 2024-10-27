import { atom } from 'nanostores';

const initialTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

export const transactionsStore = atom(initialTransactions);

if (process.env.NODE_ENV === 'development') {
    window.transactionsStore = transactionsStore;
}

export const setTransactions = (transactions) => {
    transactionsStore.set(transactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = [...currentTransactions, transaction];
    setTransactions(updatedTransactions); 
};

export const deleteTransaction = (id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions); 
};