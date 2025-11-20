'use client';

import React, { useMemo, useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    MenuItem,
    Link as MuiLink,
    InputAdornment,
    IconButton,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Role } from '@/src/types/auth';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignupPage() {
    const { signUp } = useAuth();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState<Role>('buyer');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const passwordErrors = useMemo(() => validatePassword(password), [password]);
    const passwordRules = useMemo(() => getPasswordRules(password), [password]);
    const confirmPasswordError = useMemo(() => {
        if (!confirmPassword) return '';
        return password !== confirmPassword ? 'Passwords do not match' : '';
    }, [password, confirmPassword]);

    const emailValidation = useMemo(() => validateEmail(email), [email]);

    const isFormValid =
        Boolean(email && name && role && password && confirmPassword) &&
        passwordErrors.length === 0 &&
        !confirmPasswordError &&
        !emailValidation;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmTouched(true);
        const emailErrorOnSubmit = validateEmail(email);
        if (emailErrorOnSubmit) setEmailError(emailErrorOnSubmit);
        if (!isFormValid) {
            setError('Please resolve the validation errors before continuing.');
            return;
        }
        setError(null);
        setLoading(true);

        try {
            const trimmedEmail = email.trim();
            await signUp({ email: trimmedEmail, password, name, role });
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
            if (err?.message?.toLowerCase().includes('email')) {
                setEmailError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(null);
                        }}
                        onBlur={() => setEmailError(emailValidation)}
                        error={Boolean(emailError || emailValidation)}
                        helperText={emailError || emailValidation || ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={password.length > 0 && passwordErrors.length > 0}
                        helperText=""
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <VisibilityIcon htmlColor={theme.palette.text.primary} />
                                        ) : (
                                            <VisibilityOffIcon htmlColor={theme.palette.text.primary} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            Password must contain:
                        </Typography>
                        <List dense>
                            <PasswordRuleItem label="At least 8 characters" satisfied={passwordRules.minLength} />
                            <PasswordRuleItem label="At least one uppercase letter" satisfied={passwordRules.hasUpper} />
                            <PasswordRuleItem label="At least one lowercase letter" satisfied={passwordRules.hasLower} />
                            <PasswordRuleItem label="At least one number" satisfied={passwordRules.hasDigit} />
                            <PasswordRuleItem label="At least one special character" satisfied={passwordRules.hasSpecial} />
                        </List>
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm-password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmTouched(true)}
                        error={Boolean(confirmPasswordError && confirmTouched)}
                        helperText={confirmTouched ? confirmPasswordError : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        edge="end"
                                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityIcon htmlColor={theme.palette.text.primary} />
                                        ) : (
                                            <VisibilityOffIcon htmlColor={theme.palette.text.primary} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        name="role"
                        label="Role"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as Role)}
                    >
                        <MenuItem value="buyer">Buyer</MenuItem>
                        <MenuItem value="seller">Seller</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || !isFormValid}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                    <Box display="flex" justifyContent="flex-end">
            <MuiLink component={Link} href="/auth/signin" variant="body2">
              {"Already have an account? Sign In"}
            </MuiLink>
          </Box>
                </Box>
            </Box>
        </Container>
    );
}

function validatePassword(password: string): string[] {
    const errors: string[] = [];
    const rules = getPasswordRules(password);
    if (!rules.minLength) errors.push('Password must be at least 8 characters.');
    if (!rules.hasUpper) errors.push('Password must include at least one uppercase letter.');
    if (!rules.hasLower) errors.push('Password must include at least one lowercase letter.');
    if (!rules.hasDigit) errors.push('Password must include at least one number.');
    if (!rules.hasSpecial) errors.push('Password must include at least one special character.');
    return errors;
}

function getPasswordRules(password: string) {
    return {
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasDigit: /[0-9]/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
}

function validateEmail(email: string): string | null {
    const trimmed = email.trim();
    if (!trimmed) return 'Email is required';
    if (trimmed.length > 255) return 'Email is too long';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Invalid email format';
    return null;
}

function PasswordRuleItem({ label, satisfied }: { label: string; satisfied: boolean }) {
    const theme = useTheme();
    return (
        <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 28 }}>
                <Typography
                    component="span"
                    variant="body2"
                    color={satisfied ? theme.palette.success.main : theme.palette.text.secondary}
                >
                    {satisfied ? '✅' : '❌'}
                </Typography>
            </ListItemIcon>
            <ListItemText
                primary={label}
                primaryTypographyProps={{
                    variant: 'body2',
                    color: satisfied ? 'success.main' : 'text.secondary',
                }}
            />
        </ListItem>
    );
}
