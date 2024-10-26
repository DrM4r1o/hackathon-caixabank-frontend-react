import { atom } from 'nanostores';

export const alertStore = atom({
    ...JSON.parse(localStorage.getItem('alert')) || null,
});

if (process.env.NODE_ENV === 'development') {
    window.userSettingsStore = alertStore;
}

export const showAlert = (message, severity) => {
    const alertData = { showAlert: true, alertMessage: message, severity: severity }
    alertStore.set(alertData);
    localStorage.setItem('alert', JSON.stringify(alertData));
};

export const hideAlert = () => {
    alertStore.set({ showAlert: false, alertMessage: '', severity: '' });
    localStorage.removeItem('alert');
};