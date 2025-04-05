export interface Chat {
    chatName: string;
    surname: string;
    name: string;
    fathername: string;
    lastMessage: string;
    unreadCount: number;
    time: string;
}

export interface UserProfile {
    surname: string;
    name: string;
    fathername: string;
}

export const chats: Chat[] = [
    {
        chatName: "Work Group",
        surname: "Ivanov",
        name: "Ivan",
        fathername: "Ivanovich",
        lastMessage: "Let's discuss the project",
        unreadCount: 0,
        time: "12:30",
    },
    {
        chatName: "Family Chat",
        surname: "Petrova",
        name: "Maria",
        fathername: "Sergeevna",
        lastMessage: "When are you coming?",
        unreadCount: 3,
        time: "8:30",
    },
    {
        chatName: "Friends",
        surname: "Sidorov",
        name: "Alexey",
        fathername: "Dmitrievich",
        lastMessage: "Check out this link!",
        unreadCount: 1,
        time: "Yesterday",
    },
];

export const currentUser: UserProfile = {
    surname: "Bublikova",
    name: "Anna",
    fathername: "Viktorovna",
};

export type CurrentUser = {
    id: string;
    surname: string;
    name: string;
    fathername?: string;
    email: string;
};
