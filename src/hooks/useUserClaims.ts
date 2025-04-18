import { useMemo } from "react";

interface UserClaims {
    userId?: string;
    name?: string;
    surname?: string;
    emailaddress?: string;
    [key: string]: unknown;
}

const base64UrlDecode = (str: string): string => {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (str.length % 4)) % 4);
    return atob(str + padding);
};

export const useUserClaims = (): UserClaims => {
    const token = localStorage.getItem("accessToken");

    const claims = useMemo(() => {
        if (!token) {
            console.warn("Отсутствует accessToken в localStorage");
            return {};
        }

        const parts = token.split(".");
        if (parts.length !== 3) {
            console.error("Некорректная структура JWT токена:", token);
            return {};
        }

        try {
            const payload = JSON.parse(base64UrlDecode(parts[1]));

            const userId =
                payload[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ];
            const name =
                payload[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ];
            const surname =
                payload[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
                ];
            const emailaddress =
                payload[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                ];

            return {
                ...payload,
                userId,
                name,
                surname,
                emailaddress,
            } as UserClaims;
        } catch (error) {
            console.error("Ошибка при разборе токена:", error);
            return {};
        }
    }, [token]);

    return claims;
};
