import { Button, Stack, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import EmailTextField from "src/components/ui/EmailTextField";
import PasswordTextField from "src/components/ui/PasswordTextField";
import { useAuth } from "src/hooks/useAuth";

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { signin, loading } = useAuth();
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "error" as "success" | "error" | "warning" | "info",
    });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            setNotification({
                open: true,
                message: "Введите корректный email",
                severity: "error",
            });
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError(true);
            setNotification({
                open: true,
                message: "Пароли не совпадают",
                severity: "error",
            });
            return;
        }

        const result = await signin(email, password);
        if (result?.success) {
            const [emailName, domain] = email.split('@');
            navigate(`/check/${encodeURIComponent(emailName)}/${encodeURIComponent(domain)}`);
        } else if (result?.error) {
            setNotification({
                open: true,
                message: result.error.message,
                severity: "error",
            });
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    };

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    };

    return (
        <>
            <BackgroundBox imagePath="/Background.png" />
            <Stack
                alignItems="center"
                marginTop={"4rem"}
                width="27.25rem"
                mx="auto"
                spacing={"2.5rem"}
            >
                <Typography variant="h1" component="h1">
                    Регистрация
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={"1.2rem"} alignItems="center" width="100%">
                        <EmailTextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            error={emailError}
                            helperText={emailError ? "Введите корректный email" : ""}
                        />
                        <PasswordTextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordTextField
                            value={confirmPassword}
                            label="Повторите пароль"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={validatePassword}
                            error={passwordError}
                            helperText={passwordError ? "Пароли не совпадают" : ""}
                        />
                    </Stack>

                    <Stack
                        spacing={0}
                        alignItems="center"
                        width="100%"
                        marginTop={"3rem"}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth
                            size="large"
                            sx={{
                                textTransform: "none",
                                marginBottom: "1rem",
                            }}
                            disabled={loading}
                        >
                            {loading ? "Загрузка..." : "Зарегистрироваться"}
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => navigate("/login")}
                            sx={{
                                textTransform: "none",
                                fontSize: "14px !important",
                            }}
                        >
                            У меня уже есть аккаунт
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => navigate("/")}
                            sx={{
                                textTransform: "none",
                                fontSize: "14px !important",
                            }}
                        >
                            Забыл пароль
                        </Button>
                    </Stack>
                </form>
            </Stack>

            <Snackbar
                open={notification.open}
                autoHideDuration={12000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SignInPage;