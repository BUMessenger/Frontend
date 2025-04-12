import { useState } from "react";
import { cfg } from "src/config/config";

interface PasswordRecoveryResult {
    success: boolean;
    error?: {
        status: number;
        message: string;
    };
}

export const usePasswordRecovery = () => {
    const [isLoading, setIsLoading] = useState(false);

    const recoverPassword = async (
        email: string
    ): Promise<PasswordRecoveryResult> => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `${cfg.apiHost}users/password-recovery`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            if (!response.ok) {
                let errorMessage = "Произошла ошибка";

                switch (response.status) {
                    case 400:
                        errorMessage = "Некорректный запрос";
                        break;
                    case 404:
                        errorMessage = "Пользователь не найден";
                        break;
                    case 500:
                        errorMessage = "Внутренняя ошибка сервера";
                        break;
                    default:
                        errorMessage = `Неизвестная ошибка: ${response.status}`;
                }

                return {
                    success: false,
                    error: {
                        status: response.status,
                        message: errorMessage,
                    },
                };
            }

            return { success: true };
        } catch (err) {
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

    return { recoverPassword, isLoading };
};
