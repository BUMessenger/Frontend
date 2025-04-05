import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Stack } from "@mui/material";
import ChatDescription from "src/components/ui/ChatDescription";
import CurrentUserProfile from "src/components/ui/CurrentUserProfile";
import {
    Chat,
    chats,
    currentUser,
    UserProfile,
} from "../tempchatdata/tempchatdata";

interface LeftChatBarProps {
    chats?: Chat[];
    currentUser?: UserProfile;
}

const LeftChatBar: React.FC<LeftChatBarProps> = ({
    chats: propChats = chats,
    currentUser: propCurrentUser = currentUser,
}) => {
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
                    <Button
                        sx={{ minWidth: "0px", p: 0, marginRight: "-15px" }}
                    >
                        <MoreVertIcon sx={{ width: 30, height: 30 }} />
                    </Button>
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
            <CurrentUserProfile
                surname={propCurrentUser.surname}
                name={propCurrentUser.name}
                fathername={propCurrentUser.fathername}
            />
        </Stack>
    );
};

export default LeftChatBar;
