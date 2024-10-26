import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { updateBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    // Instructions:
    // - Calculate the total expenses from the transactions.
    const [totalExpense, setTotalExpense] = useState(0);

    // Determine if the budget has been exceeded
    const [budgetExceeded, setBudgetExceeded] = useState(false); // Replace with a comparison of totalExpense and userSettings.totalBudgetLimit

    useEffect(() => {
        
        const calculation = transactions.reduce((acc, operation) => {
            return acc + operation;
        });
        
        if(calculation > userSettings.totalBudgetLimit) {
            setBudgetExceeded(true);
        }
        
        setTotalExpense(calculation);
    }, [transactions, userSettings.totalBudgetLimit]);

    // Use the useEffect hook to update the budgetAlertStore when the budget is exceeded
    useEffect(() => {
        if(!budgetExceeded) {
            updateBudgetAlert({
                isVisible: false,
                message: ''
            });
            return;
        }
        
        updateBudgetAlert({
            isVisible: budgetExceeded,
            message: 'El presupuesto ha sido excedido'
        });
    }, [budgetExceeded, userSettings.totalBudgetLimit]);


    if(budgetExceeded) {
        return (
            <Alert severity="error" sx={{ marginBottom: '1rem' }}>
                The budget has been exceeded
            </Alert>
        );
    }
};

export default BudgetAlert;
