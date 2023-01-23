export interface User {
    _id?: string;
    name?: string;
    email: string;
    password: string;
    items?: Item[];
    __v?: number;
    refreshToken?: string;
}

export interface Item {
    _id?: string;
    title: string;
    url: string;
}