import LogoutIcon from "@mui/icons-material/Logout";
import {
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";
import { useAuth } from "src/hooks/useAuth";

const UserPage: React.FC = () => {
    const [lastName, setLastName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Логика сохранения данных профиля
        console.log({ lastName, firstName, middleName });
    };

    const handleClose = () => {
        // Логика закрытия/отмены
        navigate(-1);
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate("/login", { replace: true });
        } else {
            console.error("Logout failed:", result.error);
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
                spacing={"3rem"}
            >
                <Stack direction={"row"}>
                    <Typography variant="h1" component="h1" marginLeft={"18px"}>
                        Ваш профиль
                    </Typography>
                    <IconButton
                        onClick={handleLogout}
                        aria-label="logout"
                        sx={{
                            padding: "8px",
                            width: "40px",
                            height: "40px",
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Stack>

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
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </Stack>

                    <Stack
                        spacing={1}
                        alignItems="center"
                        width="100%"
                        marginTop={"3rem"}
                    >
                        <Stack
                            spacing={1}
                            alignItems="center"
                            width="100%"
                            marginTop={"3rem"}
                            direction="row"
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                fullWidth
                                size="large"
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                Сохранить
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClose}
                                fullWidth
                                size="large"
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                Закрыть
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </>
    );
};

export default UserPage;
