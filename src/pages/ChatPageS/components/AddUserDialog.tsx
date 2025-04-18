import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User, useUsersGet } from "src/hooks/useUsersGet";

type Props = {
    open: boolean;
    onClose: () => void;
};

export const AddUserDialog: React.FC<Props> = ({ open, onClose }) => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [skip, setSkip] = useState(0);
    const [count, setCount] = useState(0);
    const [notFound, setNotFound] = useState(false);

    const { fetchUsers, isLoading, error } = useUsersGet();

    const handleSearchUser = async (reset = true) => {
        const data = await fetchUsers({
            surname: lastName,
            name: firstName,
            fathername: fatherName,
            email,
            skip: reset ? 0 : users.length,
            limit: 10,
        });

        if (data) {
            setCount(data.count);
            if (reset) {
                setUsers(data.items);
                setSkip(10);
                setNotFound(data.items.length === 0);
            } else {
                setUsers((prev) => [...prev, ...data.items]);
                setSkip((prev) => prev + 10);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearchUser(true);
        }
    };

    const toggleUserSelection = (userId: string) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    useEffect(() => {
        if (open) {
            setUsers([]);
            setSelectedUserIds([]);
            setSkip(0);
            setNotFound(false);
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            sx={{ borderRadius: "2.5rem" }}
            PaperProps={{
                sx: {
                    backgroundColor: "#141218",
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
                sx={{
                    backgroundColor: "#141218",
                    p: 4,
                    borderRadius: "2.5rem",
                    width: "900px",
                }}
            >
                <DialogTitle sx={{ color: "#fff", pr: 6 }}>
                    Добавить пользователей
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
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Stack spacing={2} onKeyDown={handleKeyDown}>
                        <Stack direction="row" spacing={2}>
                            {[
                                {
                                    label: "Фамилия",
                                    value: lastName,
                                    setter: setLastName,
                                },
                                {
                                    label: "Имя",
                                    value: firstName,
                                    setter: setFirstName,
                                },
                            ].map(({ label, value, setter }) => (
                                <TextField
                                    key={label}
                                    label={label}
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ sx: { color: "#fff" } }}
                                    InputProps={{
                                        sx: { color: "#fff" },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        handleSearchUser(true)
                                                    }
                                                    edge="end"
                                                >
                                                    <SearchIcon
                                                        sx={{ color: "#fff" }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            {[
                                {
                                    label: "Отчество",
                                    value: fatherName,
                                    setter: setFatherName,
                                },
                                {
                                    label: "Почта",
                                    value: email,
                                    setter: setEmail,
                                },
                            ].map(({ label, value, setter }) => (
                                <TextField
                                    key={label}
                                    label={label}
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ sx: { color: "#fff" } }}
                                    InputProps={{
                                        sx: { color: "#fff" },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        handleSearchUser(true)
                                                    }
                                                    edge="end"
                                                >
                                                    <SearchIcon
                                                        sx={{ color: "#fff" }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </Stack>
                    </Stack>

                    <Button
                        sx={{
                            textTransform: "none",
                            alignSelf: "flex-start",
                            fontSize: "14px !important",
                        }}
                        onClick={() => handleSearchUser(true)}
                        variant="text"
                        color="primary"
                    >
                        Найти пользователя
                    </Button>

                    <Box sx={{ maxHeight: "300px", overflowY: "auto", mt: 3 }}>
                        {notFound && (
                            <Typography
                                sx={{
                                    color: "#fff",
                                    textAlign: "center",
                                    mt: 2,
                                }}
                            >
                                Пользователей не найдено
                            </Typography>
                        )}

                        {users.map((user) => (
                            <Box
                                key={user.id}
                                sx={{
                                    p: 2,
                                    borderBottom: "1px solid #333",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography>{`${user.surname} ${user.name} ${user.fathername}`}</Typography>
                                    <Typography variant="body2" color="gray">
                                        {user.email}
                                    </Typography>
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedUserIds.includes(
                                                user.id
                                            )}
                                            onChange={() =>
                                                toggleUserSelection(user.id)
                                            }
                                            sx={{ color: "#fff" }}
                                        />
                                    }
                                    label=""
                                />
                            </Box>
                        ))}

                        {!notFound && users.length < count && (
                            <Button
                                onClick={() => handleSearchUser(false)}
                                disabled={isLoading}
                                sx={{
                                    textTransform: "none",
                                    alignSelf: "flex-start",
                                    fontSize: "14px !important",
                                }}
                                variant="text"
                                color="primary"
                            >
                                Ещё
                            </Button>
                        )}
                    </Box>
                    {error && <Typography color="error">{error}</Typography>}
                </DialogContent>

                <DialogActions sx={{ pt: 0 }}>
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            mt: 1,
                            alignSelf: "flex-start",
                        }}
                    >
                        Добавить
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
