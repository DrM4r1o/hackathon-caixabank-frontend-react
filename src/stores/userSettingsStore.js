import { atom } from 'nanostores';

export const userSettingsStore = atom(JSON.parse(localStorage.getItem('budgetData')) || {
    totalBudgetLimit: 0,
    categoryLimits: {},
    alertsEnabled: true,
    budgetExceeded: false,
});

if (process.env.NODE_ENV === 'development') {
    window.userSettingsStore = userSettingsStore;
}

const updateData = (data) => {
    userSettingsStore.set(data);
    localStorage.setItem('budgetData', JSON.stringify(data));
}

export const updateBudget = (value) => {
    const updatedState = { ...userSettingsStore.get(), totalBudgetLimit: value,  };
    updateData(updatedState);
}

export const updateCategoryBudget= (value) => {
    const state = userSettingsStore.get();
    const categoryLimits = state.categoryLimits;
    const updatedState = ({
        ...state,
        categoryLimits: {
            ...categoryLimits,
            ...value,
        }
    });

    updateData(updatedState);
}

