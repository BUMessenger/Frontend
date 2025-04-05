import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface CurrentUserProfileProps {
    surname: string;
    name: string;
    fathername: string;
}

const CurrentUserProfile = ({
    surname,
    name,
    fathername,
}: CurrentUserProfileProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            spacing={0.625}
        >
            <Stack direction="row" spacing={2}>
                <img
                    src="redforest2.jpg"
                    alt="Chat"
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: "100%",
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
                        {surname}
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
                        {name} {fathername}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CurrentUserProfile;
