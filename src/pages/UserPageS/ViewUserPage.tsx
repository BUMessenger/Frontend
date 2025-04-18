import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    Button,
    IconButton,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import { useAuth } from "src/hooks/useAuth";
import { useUpdateUserPassword } from "src/hooks/useUpdateUserPassword";
import { useUserName } from "src/hooks/useUserName";
import { ChangePasswordDialog } from "./components/ChangePasswordDialog";

const ViewUserPage: React.FC = () => {
    const [lastName, setLastName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [fatherName, setFatherName] = React.useState("");

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { getUserName, isLoading: loading } = useUserName();

    const [notification, setNotification] = React.useState({
        open: false,
        severity: "error" as "error" | "success" | "info" | "warning",
        message: "",
    });

    const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate("/login", { replace: true });
        } else {
            console.error("Logout failed:", result.error);
        }
    };

    const [passwordDialogOpen, setPasswordDialogOpen] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const { updatePassword } = useUpdateUserPassword();

    const handlePasswordChange = async () => {
        if (newPassword !== repeatPassword) {
            setNotification({
                open: true,
                severity: "error",
                message: "Новый пароль и его повтор должны совпадать",
            });
            return;
        }

        const result = await updatePassword({ oldPassword, newPassword });
        if (result.success) {
            setNotification({
                open: true,
                severity: "success",
                message: "Пароль успешно изменён",
            });
            setPasswordDialogOpen(false);
            setOldPassword("");
            setNewPassword("");
            setRepeatPassword("");
        } else {
            setNotification({
                open: true,
                severity: "error",
                message: result.error?.message || "Ошибка при смене пароля",
            });
        }
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
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography variant="h1" component="h1">
                        Ваш профиль
                    </Typography>
                    <IconButton
                        onClick={() => navigate(-1)}
                        aria-label="close"
                        sx={{
                            padding: "8px",
                            width: "40px",
                            height: "40px",
                            marginTop: "-1rem",
                            marginRight: "-1rem",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Stack spacing={2} width="100%">
                    {[
                        { label: "Фамилия", value: lastName },
                        { label: "Имя", value: firstName },
                        { label: "Отчество", value: fatherName },
                    ].map(({ label, value }) => (
                        <Stack direction="row" spacing={1} key={label}>
                            <Typography variant="body2">{label}:</Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    opacity: value ? 1 : 0.5,
                                }}
                            >
                                {value || "Не указано"}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>

                <Stack alignItems="center" width="100%" marginTop="3rem">
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{ textTransform: "none", marginBottom: "1rem" }}
                        onClick={() => navigate("/editprofile")}
                    >
                        Редактировать
                    </Button>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width="calc(100% + 1rem)"
                    >
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => setPasswordDialogOpen(true)}
                            sx={{
                                textTransform: "none",
                                fontSize: "14px !important",
                            }}
                        >
                            Сменить пароль
                        </Button>

                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleLogout}
                            disabled={loading}
                            sx={{
                                textTransform: "none",
                                fontSize: "14px !important",
                            }}
                        >
                            Выйти из аккаунта
                        </Button>
                    </Stack>
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
                <ChangePasswordDialog
                    open={passwordDialogOpen}
                    onClose={() => setPasswordDialogOpen(false)}
                    onSubmit={async (old, newPass, repeat) => {
                        if (newPass !== repeat) {
                            setNotification({
                                open: true,
                                severity: "error",
                                message:
                                    "Новый пароль и его повтор должны совпадать",
                            });
                            return;
                        }

                        const result = await updatePassword({
                            oldPassword: old,
                            newPassword: newPass,
                        });
                        if (result.success) {
                            setNotification({
                                open: true,
                                severity: "success",
                                message: "Пароль успешно изменён",
                            });
                            setPasswordDialogOpen(false);
                            setOldPassword("");
                            setNewPassword("");
                            setRepeatPassword("");
                        } else {
                            setNotification({
                                open: true,
                                severity: "error",
                                message:
                                    result.error?.message ||
                                    "Ошибка при смене пароля",
                            });
                        }
                    }}
                    oldPassword={oldPassword}
                    newPassword={newPassword}
                    repeatPassword={repeatPassword}
                    setOldPassword={setOldPassword}
                    setNewPassword={setNewPassword}
                    setRepeatPassword={setRepeatPassword}
                />
            </Stack>
        </>
    );
};

export default ViewUserPage;
