import { useState } from "react";
import { cfg } from "src/config/config";
import { useUserClaims } from "./useUserClaims";

interface UpdateUserNameParams {
    surname: string;
    name: string;
    fathername: string;
}

interface UpdateResult {
    success: boolean;
    error?: {
        status: number;
        message: string;
    };
}

export const useUpdateUserName = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useUserClaims();

    const updateUserName = async (
        params: UpdateUserNameParams
    ): Promise<UpdateResult> => {
        if (!userId) {
            return {
                success: false,
                error: {
                    status: 401,
                    message: "Ошибка 401: Пользователь не авторизован",
                },
            };
        }

        setIsLoading(true);

        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await fetch(
                `${cfg.apiHost}users/${userId}/user-name`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${accessToken}`,
                    },
                    body: JSON.stringify(params),
                }
            );

            if (!response.ok) {
                let message = "Ошибка: неизвестная";

                switch (response.status) {
                    case 401:
                        message = "Ошибка 401: Пользователь не авторизован";
                        break;
                    case 403:
                        message =
                            "Ошибка 403: Refresh token не найден или просрочен";
                        break;
                    case 404:
                        message = "Ошибка 404: Пользователь не найден";
                        break;
                    case 500:
                        message = "Ошибка 500: Внутренняя ошибка сервера";
                        break;
                    default:
                        message = `Ошибка ${response.status}: Неизвестная ошибка`;
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
        } catch (err) {
            return {
                success: false,
                error: {
                    status: 500,
                    message: "Ошибка 500: Произошла неизвестная ошибка",
                },
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { updateUserName, isLoading };
};
