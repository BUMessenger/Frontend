import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { BackgroundBox } from "src/components/ui/BackgroundBox";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <BackgroundBox imagePath="Background.png" />
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Ошибка 404
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Страница не найдена
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Перейти на главную
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
