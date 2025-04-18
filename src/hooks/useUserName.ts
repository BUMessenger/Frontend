import { useState } from "react";
import { cfg } from "src/config/config";
import { useUserClaims } from "./useUserClaims";

interface UserName {
    lastName: string;
    firstName: string;
    fatherName: string;
}

interface UserNameResult {
    success: boolean;
    data?: UserName;
    error?: {
        status: number;
        message: string;
    };
}

export const useUserName = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useUserClaims();

    const getUserName = async (): Promise<UserNameResult> => {
        if (!userId) {
            return {
                success: false,
                error: { status: 401, message: "Пользователь не авторизован" },
            };
        }

        setIsLoading(true);

        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await fetch(`${cfg.apiHost}users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${accessToken}`,
                },
            });

            if (!response.ok) {
                let message = "Произошла неизвестная ошибка";

                switch (response.status) {
                    case 401:
                        message = "Пользователь не авторизован";
                        break;
                    case 403:
                        message = "Refresh token не найден или просрочен";
                        break;
                    case 404:
                        message = "Пользователь не найден";
                        break;
                    case 500:
                        message = "Внутренняя ошибка сервера";
                        break;
                    default:
                        message = `Ошибка: ${response.status}`;
                }

                return {
                    success: false,
                    error: {
                        status: response.status,
                        message,
                    },
                };
            }

            const data = await response.json();

            return {
                success: true,
                data: {
                    lastName: data.surname,
                    firstName: data.name,
                    fatherName: data.fathername,
                },
            };
        } catch (err) {
            return {
                success: false,
                error: { status: 500, message: "Произошла неизвестная ошибка" },
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { getUserName, isLoading };
};
