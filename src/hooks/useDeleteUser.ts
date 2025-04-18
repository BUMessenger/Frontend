import { useState } from "react";
import { cfg } from "src/config/config";
import { useUserClaims } from "./useUserClaims";

interface DeleteUserResult {
    success: boolean;
    error?: {
        status: number;
        message: string;
    };
}

export const useDeleteUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useUserClaims();

    const deleteUser = async (): Promise<DeleteUserResult> => {
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
                method: "DELETE",
                headers: {
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

            return { success: true };
        } catch {
            return {
                success: false,
                error: {
                    status: 500,
                    message: "Произошла неизвестная ошибка",
                },
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteUser, isLoading };
};
