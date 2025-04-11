import { useState } from "react";
import { cfg } from "src/config/config";

type AuthError = {
    status: number;
    message: string;
};

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);

    const signin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${cfg.apiHost}unregistered-users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                let errorMessage =
                    "Произошла неизвестная ошибка при регистрации";
                let status = response.status;

                if (response.status === 400) {
                    errorMessage = errorData?.detail || "Некорректный запрос";
                } else if (response.status === 409) {
                    errorMessage =
                        errorData?.detail || "Конфликт при регистрации";
                } else if (response.status === 500) {
                    errorMessage =
                        errorData?.detail || "Внутренняя ошибка сервера";
                }

                setError({ status, message: errorMessage });
                return {
                    success: false,
                    error: { status, message: errorMessage },
                };
            }

            const data = await response.json();
            return { success: true, error: null, email: data.email };
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Произошла неизвестная ошибка";

            setError({ status: 500, message: errorMessage });
            return {
                success: false,
                error: { status: 500, message: errorMessage },
            };
        } finally {
            setLoading(false);
        }
    };

    const setAuthTokens = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };

    const codeCheck = async (email: string, code: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${cfg.apiHost}users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: decodeURIComponent(email),
                    approveCode: code,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                let errorMessage =
                    "Произошла неизвестная ошибка при проверке кода";
                let status = response.status;

                if (response.status === 403) {
                    errorMessage =
                        errorData?.detail || "Код 2FA неверный или просрочен";
                } else if (response.status === 404) {
                    errorMessage =
                        errorData?.detail ||
                        "Временный пользователь с указанным email не найден";
                } else if (response.status === 500) {
                    errorMessage =
                        errorData?.detail || "Внутренняя ошибка сервера";
                }

                setError({ status, message: errorMessage });
                return {
                    success: false,
                    error: { status, message: errorMessage },
                };
            }

            const data = await response.json();

            if (data.accessToken && data.refreshToken) {
                setAuthTokens(data.accessToken, data.refreshToken);
            }

            return { success: true, error: null };
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Произошла неизвестная ошибка";

            setError({ status: 500, message: errorMessage });
            return {
                success: false,
                error: { status: 500, message: errorMessage },
            };
        } finally {
            setLoading(false);
        }
    };

    return { signin, codeCheck, loading, error };
};
