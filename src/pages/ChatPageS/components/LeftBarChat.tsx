import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChatDescription from "src/components/ui/ChatDescription";
import CurrentUserProfile from "src/components/ui/CurrentUserProfile";
import { useUserName } from "src/hooks/useUserName";
import { Chat, chats } from "../tempchatdata/tempchatdata";
import { ChatActionsDialog } from "./ChatActionsDialog";

interface LeftChatBarProps {
    chats?: Chat[];
}

const LeftChatBar: React.FC<LeftChatBarProps> = ({
    chats: propChats = chats,
}) => {
    const navigate = useNavigate();
    const { getUserName } = useUserName();
    const [surname, setSurname] = React.useState("");
    const [name, setName] = React.useState("");
    const [fathername, setFathername] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserName = async () => {
            const result = await getUserName();

            if (result.success && result.data) {
                setSurname(result.data.lastName);
                setName(result.data.firstName);
                setFathername(result.data.fatherName);
            } else if (result.error) {
                setError(result.error.message);
            }
            setLoading(false);
        };

        fetchUserName();
    }, []);

    return (
        <Stack
            width={500}
            p={5}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderTopRightRadius: "40px",
                borderBottomRightRadius: "40px",
                height: "100vh",
                boxSizing: "border-box",
            }}
            justifyContent="space-between"
        >
            <Stack spacing={4}>
                <Stack direction="row" justifyContent="space-between">
                    <img
                        src="logo.svg"
                        alt="Chat"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <ChatActionsDialog />
                </Stack>

                <Stack spacing={3}>
                    {propChats.map((chat, index) => (
                        <ChatDescription
                            key={index}
                            chatName={chat.chatName}
                            surname={chat.surname}
                            name={chat.name}
                            fathername={chat.fathername}
                            lastMessage={chat.lastMessage}
                            unreadCount={chat.unreadCount}
                            time={chat.time}
                        />
                    ))}
                </Stack>
            </Stack>

            {loading ? (
                <Typography
                    variant="body2"
                    sx={{ color: "white", opacity: 0.5 }}
                >
                    Загрузка профиля...
                </Typography>
            ) : error ? (
                <Typography variant="body2" sx={{ color: "red", opacity: 0.8 }}>
                    Ошибка загрузки профиля: {error}
                </Typography>
            ) : (
                <Box
                    onClick={() => navigate("/profile")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            opacity: 0.8,
                        },
                    }}
                >
                    <CurrentUserProfile
                        surname={surname}
                        name={name}
                        fathername={fathername}
                    />
                </Box>
            )}
        </Stack>
    );
};

export default LeftChatBar;
