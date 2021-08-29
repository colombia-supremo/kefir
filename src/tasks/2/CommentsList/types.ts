export interface Author {
    id: number;
    name: string;
    avatar: any;
}

export interface Comment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
}