import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ChatDescriptionProps {
    chatName: string;
    surname: string;
    name: string;
    fathername: string;
    lastMessage: string;
    unreadCount: number;
    time?: string;
}

const ChatDescription = ({
    chatName,
    surname,
    name,
    fathername,
    lastMessage,
    unreadCount,
    time = "12:30",
}: ChatDescriptionProps) => {
    const formattedUserName = `${surname} ${name.charAt(
        0
    )}. ${fathername.charAt(0)}.`;
    const messageText = `${formattedUserName}: ${lastMessage}`;

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            spacing={0.625}
        >
            <Stack direction="row" spacing={2}>
                <img
                    src="redforest.jpg"
                    alt="Chat"
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: "10%",
                        objectFit: "cover",
                    }}
                />
                <Stack direction="column" spacing={0.75}>
                    <Typography
                        variant="h3"
                        noWrap
                        sx={{
                            maxWidth: 220,
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                        }}
                    >
                        {chatName}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{
                            maxWidth: 220,
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            opacity: 0.6,
                        }}
                    >
                        {messageText}
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="column" alignItems={"flex-end"} spacing={0.5}>
                <Typography variant="subtitle1" fontWeight="medium">
                    {time}
                </Typography>
                {unreadCount > 0 && (
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: "50%",
                            minWidth: "0px",
                            width: 25,
                            height: 25,
                            p: 0,
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="medium">
                            {unreadCount}{" "}
                        </Typography>
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};

export default ChatDescription;
