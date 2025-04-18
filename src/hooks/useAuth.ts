import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useRef, useState } from "react";
import { cfg } from "src/config/config";

type AuthError = {
    status: number;
    message: string;
};

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type JWTPayload = {
    exp: number;
};

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => !!localStorage.getItem("accessToken")
    );

    const refreshTimer = useRef<NodeJS.Timeout | null>(null);

    const setAuthTokens = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        scheduleRefreshToken(accessToken);
    };

    const clearAuthTokens = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };

    const scheduleRefreshToken = (accessToken: string) => {
        const decoded: JWTPayload = jwtDecode(accessToken);
        const expiresAt = decoded.exp * 1000;
        const now = Date.now();
        const refreshTime = expiresAt - now - 30000; // за 30 секунд до истечения

        if (refreshTime <= 0) {
            refreshTokens();
            return;
        }

        if (refreshTimer.current) clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(refreshTokens, refreshTime);
    };

    const refreshTokens = useCallback(async (): Promise<Tokens | null> => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            clearAuthTokens();
            return null;
        }

        try {
            const response = await fetch(`${cfg.apiHost}auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                clearAuthTokens();
                return null;
            }

            const data = await response.json();
            setAuthTokens(data.accessToken, data.refreshToken);
            return data;
        } catch (err) {
            clearAuthTokens();
            return null;
        }
    }, []);

    const authFetch = async (input: RequestInfo, init?: RequestInit) => {
        const accessToken = localStorage.getItem("accessToken");
        const headers = new Headers(init?.headers);
        if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

        let response = await fetch(input, { ...init, headers });

        if (response.status === 401) {
            const newTokens = await refreshTokens();
            if (newTokens) {
                headers.set("Authorization", `Bearer ${newTokens.accessToken}`);
                response = await fetch(input, { ...init, headers });
            } else {
                clearAuthTokens();
            }
        }

        return response;
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${cfg.apiHost}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setError({ status: response.status, message: "Ошибка входа" });
                return { success: false, error };
            }

            const data = await response.json();
            setAuthTokens(data.accessToken, data.refreshToken);

            return { success: true, error: null };
        } catch (err) {
            setError({ status: 500, message: "Внутренняя ошибка сервера" });
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

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

    const logout = async () => {
        setLoading(true);
        setError(null);

        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

        if (!refreshToken) {
            setError({
                status: 400,
                message:
                    "Некорректный запрос (refresh токен null или пустая строка)",
            });
            setLoading(false);
            return {
                success: false,
                error: { status: 400, message: "Некорректный запрос" },
            };
        }

        try {
            const response = await fetch(`${cfg.apiHost}auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${accessToken}`,
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                let errorMessage = "Произошла неизвестная ошибка при выходе";
                let status = response.status;

                if (response.status === 401) {
                    errorMessage = "Пользователь не авторизован";
                } else if (response.status === 403) {
                    errorMessage = "Refresh токен не найден или просрочен";
                } else if (response.status === 500) {
                    errorMessage = "Внутренняя ошибка сервера";
                }

                setError({ status, message: errorMessage });
                return {
                    success: false,
                    error: { status, message: errorMessage },
                };
            }

            clearAuthTokens();
            console.log("Logout successful");
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

    useEffect(() => {
        const existingToken = localStorage.getItem("accessToken");
        if (existingToken) {
            const decoded: JWTPayload = jwtDecode(existingToken);
            if (decoded.exp * 1000 > Date.now()) {
                scheduleRefreshToken(existingToken);
            } else {
                refreshTokens();
            }
        }
        return () => {
            if (refreshTimer.current) clearTimeout(refreshTimer.current);
        };
    }, [refreshTokens]);

    return {
        isAuthenticated,
        authFetch,
        refreshTokens,
        login,
        logout,
        codeCheck,
        loading,
        error,
    };
};
