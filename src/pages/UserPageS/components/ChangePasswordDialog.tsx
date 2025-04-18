import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";

type ChangePasswordDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (
        oldPassword: string,
        newPassword: string,
        repeatPassword: string
    ) => void;
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
    setOldPassword: (value: string) => void;
    setNewPassword: (value: string) => void;
    setRepeatPassword: (value: string) => void;
};

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
    open,
    onClose,
    onSubmit,
    oldPassword,
    newPassword,
    repeatPassword,
    setOldPassword,
    setNewPassword,
    setRepeatPassword,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            PaperProps={{
                sx: {
                    backgroundColor: "#141218",
                    width: "500px",
                    position: "relative",
                    borderRadius: "2.5rem",
                },
            }}
            slotProps={{
                backdrop: {
                    sx: { backgroundColor: "rgba(40, 39, 43, 0.7)" },
                },
            }}
        >
            <Box
                padding={"2rem"}
                sx={{
                    backgroundColor: "#141218",
                }}
            >
                <DialogTitle
                    component="h1"
                    variant="h4"
                    sx={{
                        backgroundColor: "#141218",
                        color: "#FFFFFF",
                        paddingBottom: 0,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        width: "100%",
                        fontWeight: 600,
                        pr: 6, // для иконки закрытия
                    }}
                >
                    Смена пароля
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            color: "#fff",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        backgroundColor: "#141218",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        paddingTop: 1,
                        paddingBottom: 2,
                    }}
                >
                    <Stack spacing={2} width="100%" mt="2rem" mb="1rem">
                        <TextField
                            label="Старый пароль"
                            type="password"
                            fullWidth
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            InputLabelProps={{ sx: { color: "#fff" } }}
                            InputProps={{ sx: { color: "#fff" } }}
                        />
                        <TextField
                            label="Новый пароль"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputLabelProps={{ sx: { color: "#fff" } }}
                            InputProps={{ sx: { color: "#fff" } }}
                        />
                        <TextField
                            label="Повторите новый пароль"
                            type="password"
                            fullWidth
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            error={
                                repeatPassword.length > 0 &&
                                newPassword !== repeatPassword
                            }
                            helperText={
                                repeatPassword.length > 0 &&
                                newPassword !== repeatPassword
                                    ? "Пароли не совпадают"
                                    : ""
                            }
                            InputLabelProps={{ sx: { color: "#fff" } }}
                            InputProps={{ sx: { color: "#fff" } }}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions
                    sx={{
                        backgroundColor: "#141218",
                        paddingTop: 0,
                        paddingBottom: 2,
                        marginRight: 2,
                    }}
                >
                    <Button sx={{ textTransform: "none" }} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        onClick={() =>
                            onSubmit(oldPassword, newPassword, repeatPassword)
                        }
                    >
                        Сменить
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
