import { useState, useEffect } from 'react';
import { StringFormaters, toCamelCase } from '../utils/stringFormaters';
import { useStore } from '@nanostores/react';
import { userSettingsStore, updateBudget, updateCategoryBudget } from '../stores/userSettingsStore';
import { budgetAlertStore, updateBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid2,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';
import { transactionsStore } from '../stores/transactionStore';

function Settings() {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [categoryBudgets, setCategoryBudgets] = useState(userSettings.totalBudgetLimit);
    const [disabledInputs, setDisabledInputs] = useState(false);

    const handleBudgetLimitChange = (value) => {
        setTotalBudgetLimit(Number(value));
        updateBudget(Number(value));
    }

    const onChangeCategoryLimit = (category, value) => {
        const categoryName = toCamelCase(category);
        setCategoryBudgets({ [categoryName]: Number(value) });
    }

    const handleSave = () => {
        // Instructions:
        // - Validate the total category limits.
        // - If the total category limits exceed the total budget limit, set an error message.
        // - If validation passes, clear the error message and save the updated settings to the store.
        // - After saving, display a success message indicating that the settings were saved successfully.

        // Instructions:
        // - Check if the total expense exceeds the total budget limit.
        // - If exceeded, set the budgetExceeded state to true and update the budget alert.
        updateCategoryBudget(categoryBudgets);
    };

    useEffect(() => {
        setDisabledInputs(totalBudgetLimit === 0 || !totalBudgetLimit);

        const totalCategoryBudgets = Object.values(categoryBudgets).reduce((acc, curr) => acc + curr, 0);

        if (totalCategoryBudgets > totalBudgetLimit) {
            setError('Total category budgets exceed the total budget limit');
        }
    }, [totalBudgetLimit, categoryBudgets]);

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Settings
            </Typography>

            <FormControlLabel
                control={<Switch color="primary" />}
                label="Enable Alerts"
                // Instructions: Add `checked` and `onChange` to control the `alertsEnabled` state
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    name="totalBudgetLimit"
                    fullWidth
                    margin="normal"
                    slotProps={{ htmlInput: { min: 0, step: '0.01' }}}
                    sx={{ mt: 1 }}
                    onChange={(e) => handleBudgetLimitChange(e.target.value)}
                    // Instructions: Bind the value and `onChange` to control the `totalBudgetLimit` state
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                <Grid2 container spacing={2} sx={{ mt: 1 }}>
                    {expenseCategories.map((category) => (
                        <Grid2 xs={12} sm={6} md={4} key={category}>
                            <TextField
                                label={category}
                                type="number"
                                fullWidth
                                margin="normal"
                                disabled={disabledInputs}
                                slotProps={{ htmlInput: { min: 0, step: '0.01' }}}
                                onChange={(e) => onChangeCategoryLimit(category, e.target.value)}
                                value={userSettings.categoryLimits[category]}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                    // Instructions: Add `onClick` handler to save the settings by calling `handleSave`
                >
                    Save Settings
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
