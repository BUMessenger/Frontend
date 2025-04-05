import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import EmailTextField from "src/components/ui/EmailTextField";
import PasswordTextField from "src/components/ui/PasswordTextField";

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь будет логика регистрации
        console.log({ email, password, confirmPassword });
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
            <BackgroundBox imagePath="Background.png" />
            <Stack
                alignItems="center"
                marginTop={"4rem"}
                width="27.25rem"
                mx="auto"
                spacing={"3rem"}
            >
                <Typography variant="h1" component="h1">
                    Регистрация
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={"1.5rem"} alignItems="center" width="100%">
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
                        <PasswordTextField
                            value={confirmPassword}
                            label="Повторите пароль"
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        >
                            Зарегистрироваться
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
        </>
    );
};

export default SignInPage;
