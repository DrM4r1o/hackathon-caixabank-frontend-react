import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    Grid2,
    Paper,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { expenseCategories } from '../constants/categories';
import { updateBudget, updateCategoryBudget, userSettingsStore } from '../stores/userSettingsStore';
import { toCamelCase } from '../utils/stringFormaters';

function Settings() {
    const userSettings = useStore(userSettingsStore);

    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [categoryBudgets, setCategoryBudgets] = useState(userSettings.categoryLimits);
    const [disabledInputs, setDisabledInputs] = useState(false);
    const [disableAccept, setDisableAccept] = useState(false);
    const [lastTotalBudget, setLastTotalBudget] = useState(0);

    const handleBudgetLimitChange = (value) => {
        const val = Number(value);
        const disable = lastTotalBudget > value;
        
        setTotalBudgetLimit(val);
        setDisableAccept(disable);
        setDisabledInputs(disable);
    }

    const onChangeCategoryLimit = (category, value) => {
        const categoryName = toCamelCase(category);
        setCategoryBudgets({ [categoryName]: Number(value) });
    }

    const getCategoryBudget = (category) => {
        return userSettings.categoryLimits[toCamelCase(category)] ?? 0;
    }

    const handleSave = () => {
        const totalCategoryBudgets = Object.values(categoryBudgets).reduce((acc, curr) => acc + curr, 0);

        if (totalCategoryBudgets > totalBudgetLimit) {
            setBudgetExceeded(true);
            setSuccessMessage('');
            setDisableAccept(true);
            setDisabledInputs(true);
            setLastTotalBudget(totalCategoryBudgets)
            return;
        }

        setBudgetExceeded(false);
        setSuccessMessage('Settings saved successfully');
        updateBudget(totalBudgetLimit);
        updateCategoryBudget(categoryBudgets);
    };

    useEffect(() => {
        if(!successMessage && !budgetExceeded) return;

        setTimeout(() => {
            setSuccessMessage('');
            setBudgetExceeded(false);
        }, 5000);
    }, [successMessage, budgetExceeded]);

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
                    value={totalBudgetLimit}
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
                                defaultValue={getCategoryBudget(category) || ''}
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
                    disabled={disableAccept}
                >
                    Save Settings
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999 }}>
                    {successMessage}
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
