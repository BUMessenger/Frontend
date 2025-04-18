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

type ChangeNameDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    lastName: string;
    firstName: string;
    fatherName: string;
    setLastName: (value: string) => void;
    setFirstName: (value: string) => void;
    setFatherName: (value: string) => void;
};

export const ChangeNameDialog: React.FC<ChangeNameDialogProps> = ({
    open,
    onClose,
    onSubmit,
    lastName,
    firstName,
    fatherName,
    setLastName,
    setFirstName,
    setFatherName,
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
                        pr: 6,
                    }}
                >
                    Изменение имени
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
                    }}
                >
                    <Stack spacing={2} mt="2rem" mb="1rem">
                        <TextField
                            label="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                            InputLabelProps={{ sx: { color: "#fff" } }}
                            InputProps={{ sx: { color: "#fff" } }}
                        />
                        <TextField
                            label="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                            InputLabelProps={{ sx: { color: "#fff" } }}
                            InputProps={{ sx: { color: "#fff" } }}
                        />
                        <TextField
                            label="Отчество"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            fullWidth
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
                        onClick={onSubmit}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
