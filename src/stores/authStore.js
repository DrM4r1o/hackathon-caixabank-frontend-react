import { atom } from 'nanostores';
import { itemsLocalStorage } from '../constants/itemsLocalStorage';

export const authStore = atom({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null,
});

if (process.env.NODE_ENV === 'development') {
    window.authStore = authStore;
}

export const saveUserData = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('users'));
    const budgetData = JSON.parse(localStorage.getItem('budgetData'));
    const transactions = JSON.parse(localStorage.getItem('transactions'));
    const newDataUser = {
        ...user,
        budgetData: budgetData,
        transactions: transactions,
    };

    const newUsers = users.map((u) => {
        return u.email === user.email ? newDataUser : u;
    });

    localStorage.setItem('users', JSON.stringify(newUsers));
}

export const login = (userData) => {
    console.log(userData);
    

    const itemsName = itemsLocalStorage.filter((item) => item.onLoginAdd).flatMap(item => item.name);
    const itemsToAdd = [userData, userData.budgetData, userData.transactions, true];
    authStore.set({ isAuthenticated: true, user: userData });

    itemsName.forEach((itemName, i) => {        
        localStorage.setItem(itemName, JSON.stringify(itemsToAdd[i] || ""));
    });
};

export const logout = () => {
    saveUserData();

    const itemsToRemove = itemsLocalStorage.filter((item) => item.onLogoutRemove);
    authStore.set({ isAuthenticated: false, user: null });

    itemsToRemove.forEach((itemInfo) => {
        localStorage.removeItem(itemInfo.name);
    });
};

export const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = getUser(newUser.email);

    if (!existingUser) {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    return existingUser;
};

export const getUser = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find((user) => user.email === email);
}