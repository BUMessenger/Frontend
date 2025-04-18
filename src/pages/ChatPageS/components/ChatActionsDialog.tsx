import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Popover,
} from "@mui/material";
import React, { useState } from "react";
import { AddUserDialog } from "./AddUserDialog"; // путь к компоненту

export const ChatActionsDialog: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleOpenAddUser = () => {
        handleClosePopover();
        setIsAddUserOpen(true);
    };

    const handleCloseAddUser = () => {
        setIsAddUserOpen(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? "chat-actions-popover" : undefined;

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{ minWidth: "0px", p: 0, marginRight: "-15px" }}
            >
                <MoreVertIcon sx={{ width: 30, height: 30 }} />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#141218",
                        color: "#FFFFFF",
                        minWidth: 200,
                        borderRadius: "1rem",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    },
                }}
            >
                <Box padding={"1rem"} sx={{ backgroundColor: "#141218" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleOpenAddUser}
                                sx={{ borderRadius: "0.75rem" }}
                            >
                                <ListItemText primary="Добавить пользователя" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClosePopover}
                                sx={{ borderRadius: "0.75rem" }}
                            >
                                <ListItemText primary="Что-то сделать" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClosePopover}
                                sx={{ borderRadius: "0.75rem" }}
                            >
                                <ListItemText primary="Еще что-то сделать" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Popover>

            <AddUserDialog open={isAddUserOpen} onClose={handleCloseAddUser} />
        </>
    );
};

export default ChatActionsDialog;
