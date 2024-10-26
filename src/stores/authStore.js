import { atom } from 'nanostores';

export const authStore = atom({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null,
});

if (process.env.NODE_ENV === 'development') {
    window.authStore = authStore;
}

export const login = (userData) => {
    authStore.set({ isAuthenticated: true, user: userData });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
};

export const logout = () => {
    authStore.set({ isAuthenticated: false, user: null });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
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