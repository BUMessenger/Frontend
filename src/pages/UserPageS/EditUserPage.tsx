import {
    Alert,
    Button,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import { useUpdateUserName } from "src/hooks/useUpdateUserName";
import { useUserName } from "src/hooks/useUserName";

const EditUserPage: React.FC = () => {
    const [lastName, setLastName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [fatherName, setFatherName] = React.useState("");

    const navigate = useNavigate();
    const { getUserName } = useUserName();
    const { updateUserName, isLoading: loading } = useUpdateUserName();

    const [notification, setNotification] = React.useState({
        open: false,
        severity: "error" as "error" | "success" | "info" | "warning",
        message: "",
    });

    const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    React.useEffect(() => {
        const fetchUserName = async () => {
            const result = await getUserName();

            if (result.success && result.data) {
                setLastName(result.data.lastName);
                setFirstName(result.data.firstName);
                setFatherName(result.data.fatherName);
            } else if (result.error) {
                setNotification({
                    open: true,
                    severity: "error",
                    message: result.error.message,
                });
            }
        };

        fetchUserName();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await updateUserName({
            surname: lastName,
            name: firstName,
            fathername: fatherName,
        });

        if (result.success) {
            navigate(-1);
        } else if (result.error) {
            setNotification({
                open: true,
                severity: "error",
                message: result.error.message,
            });
        }
    };

    const handleCancel = () => {
        navigate("/profile");
    };

    return (
        <>
            <BackgroundBox imagePath="/Background.png" />
            <Stack
                alignItems="center"
                marginTop="4rem"
                width="27.25rem"
                mx="auto"
                spacing="3rem"
            >
                <Typography variant="h1" component="h1">
                    Редактирование профиля
                </Typography>

                <form onSubmit={handleSave} style={{ width: "100%" }}>
                    <Stack spacing={"1.2rem"} alignItems="center" width="100%">
                        <TextField
                            label="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Отчество"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </Stack>

                    <Stack
                        spacing={1}
                        alignItems="center"
                        width="100%"
                        marginTop="3rem"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{ textTransform: "none", marginBottom: "1rem" }}
                        >
                            {loading ? "Идет сохранение..." : "Сохранить"}
                        </Button>

                        <Button
                            color="primary"
                            onClick={handleCancel}
                            fullWidth
                            size="large"
                            disabled={loading}
                            variant="text"
                            sx={{
                                textTransform: "none",
                                fontSize: "14px !important",
                            }}
                        >
                            Выйти без изменений
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

export default EditUserPage;
