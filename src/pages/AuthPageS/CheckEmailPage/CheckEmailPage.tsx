import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";

const CheckEmailPage: React.FC = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь будет логика проверки кода
        console.log({ code });
    };

    return (
        <>
            <BackgroundBox imagePath="Background.png" />
            <Stack
                alignItems="center"
                marginTop={"4rem"}
                width="27.25rem"
                mx="auto"
                spacing={"3.5rem"}
            >
                <Stack
                    alignItems="center"
                    width="27.25rem"
                    mx="auto"
                    spacing={"1rem"}
                >
                    <Typography variant="h1" component="h1">
                        Проверьте почту
                    </Typography>
                    <Typography variant="body1">
                        ivanov2002@gmail.com
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack
                        spacing={3}
                        alignItems="center"
                        width="100%"
                    >
                        <TextField
                            label="Ваш код"
                            fullWidth
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
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
                            Подтвердить
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </>
    );
};

export default CheckEmailPage;
