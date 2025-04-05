import { styled } from "@mui/system";

export const BackgroundBox = styled("div", {
    shouldForwardProp: (prop) => prop !== "imagePath",
})(({ imagePath }: { imagePath: string }) => ({
    backgroundImage: `url(${imagePath})`,
    backgroundPosition: "center 0%", // Смещаем изображение на 70% вниз
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
}));
