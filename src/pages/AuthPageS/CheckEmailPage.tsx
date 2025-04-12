import { Button, Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import { useAuth } from "src/hooks/useAuth";

const CheckEmailPage: React.FC = () => {
    const [code, setCode] = useState("");
    const { email, domain } = useParams<{ email: string; domain: string }>();
    const { codeCheck, loading} = useAuth();
    const navigate = useNavigate();
    
    const [notification, setNotification] = useState({
        open: false,
        severity: "error" as "error" | "success",
        message: "",
    });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const fullEmail = email && domain ? `${decodeURIComponent(email)}@${decodeURIComponent(domain)}` : "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullEmail) return;

        const result = await codeCheck(fullEmail, code);
        if (result.success) {
            navigate("/user");
        } else if (result.error) {
            setNotification({
                open: true,
                severity: "error",
                message: `${result.error.status}: ${result.error.message}`,
            });
        }
    };

    return (
        <>
            <BackgroundBox imagePath="/Background.png" />
            <Stack
                alignItems="center"
                marginTop={"4rem"}
                width="27.25rem"
                mx="auto"
                spacing={"3.5rem"}
            >
                <Stack spacing={"1.2rem"} alignItems="center" width="100%">
                    <Typography variant="h1" component="h1">
                        Проверьте почту
                    </Typography>
                    <Typography variant="body1">
                        {fullEmail || "Email не указан"}
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={3} alignItems="center" width="100%">
                        <TextField
                            label="Ваш код"
                            fullWidth
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{
                                textTransform: "none",
                            }}
                        >
                            {loading ? "Проверка..." : "Подтвердить"}
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

export default CheckEmailPage;