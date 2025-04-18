import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import EmailTextField from "src/components/ui/EmailTextField";
import PasswordTextField from "src/components/ui/PasswordTextField";
import { useAuth } from "src/hooks/useAuth";
import { usePasswordRecovery } from "src/hooks/usePasswordRecovery";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const { recoverPassword, isLoading: isRecoveryLoading } =
        usePasswordRecovery();

    const [notification, setNotification] = useState({
        open: false,
        severity: "error" as "error" | "success",
        message: "",
    });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailError || !email || !password) return;

        const result = await login(email, password);
        if (result.success) {
            navigate("/profile");
        } else if (result.error) {
            setNotification({
                open: true,
                severity: "error",
                message: result.error.message,
            });
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setNotification({
                open: true,
                severity: "error",
                message: "Пожалуйста, введите email для восстановления пароля",
            });
            return;
        }

        validateEmail();
        if (emailError) {
            setNotification({
                open: true,
                severity: "error",
                message: "Пожалуйста, введите корректный email",
            });
            return;
        }

        const result = await recoverPassword(email);

        if (result.success) {
            setNotification({
                open: true,
                severity: "success",
                message:
                    "Инструкции по восстановлению пароля отправлены на ваш email",
            });
        } else if (result.error) {
            setNotification({
                open: true,
                severity: "error",
                message:
                    result.error.message ||
                    "Не удалось отправить запрос на восстановление",
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
                    Вход
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={"1.2rem"} alignItems="center" width="100%">
                        <EmailTextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            error={emailError}
                        />
                        <PasswordTextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            disabled={loading}
                            sx={{
                                textTransform: "none",
                                marginBottom: "1rem",
                            }}
                        >
                            {loading ? "Вход..." : "Войти"}
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
                            У меня еще нет аккаунта
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleForgotPassword} 
                            disabled={isRecoveryLoading}
                            sx={{
                                textTransform: "none",
                                fontSize: "14px !important",
                            }}
                        >
                            {isRecoveryLoading ? "Отправка..." : "Забыл пароль"}
                        </Button>
                    </Stack>
                </form>
            </Stack>

            <Snackbar
                open={notification.open}
                autoHideDuration={12000}
                onClose={handleCloseNotification}
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

export default LoginPage;
