import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";

interface DeleteUserDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
    open,
    onClose,
    onConfirm,
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
                    variant="h5"
                    sx={{
                        color: "#FFFFFF",
                        paddingBottom: 0,
                        textAlign: "left",
                        fontWeight: 600,
                        pr: 6,
                    }}
                >
                    Вы действительно хотите удалить аккаунт?
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
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        paddingTop: 2,
                        paddingBottom: 2,
                    }}
                >
                    <Typography variant="body1" color="white"></Typography>
                </DialogContent>

                <DialogActions sx={{ paddingBottom: 2, marginRight: 2 }}>
                    <Button onClick={onClose} sx={{ textTransform: "none" }}>
                        Нет
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        sx={{ textTransform: "none" }}
                        color="secondary"
                    >
                        Да
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
