import { useState } from "react";
import { cfg } from "src/config/config";

export interface User {
    id: string;
    name: string;
    surname: string;
    fathername: string;
    email: string;
}

interface UseUsersGetResult {
    items: User[];
    count: number;
}

export const useUsersGet = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async (params: {
        surname?: string;
        name?: string;
        fathername?: string;
        email?: string;
        chatId?: string;
        skip?: number;
        limit?: number;
    }): Promise<UseUsersGetResult | null> => {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("accessToken");

        const query = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) query.append(key, String(value));
        }

        try {
            const res = await fetch(`${cfg.apiHost}users?${query.toString()}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: accessToken || "",
                },
            });

            if (!res.ok) {
                let message = "Произошла неизвестная ошибка";
                switch (res.status) {
                    case 401:
                        message = "Пользователь не авторизован";
                        break;
                    case 403:
                        message = "Refresh token не найден или просрочен";
                        break;
                    case 500:
                        message = "Внутренняя ошибка сервера";
                        break;
                }
                setError(message);
                return null;
            }

            return await res.json();
        } catch {
            setError("Произошла неизвестная ошибка");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchUsers, isLoading, error };
};
