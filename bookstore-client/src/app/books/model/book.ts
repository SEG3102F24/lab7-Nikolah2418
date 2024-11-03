export interface Book {
    id: number;
    title: string;
    category: string;
    isbn: string;
    cost: number;
    year: number;
    description: string;
    authors: Author[];
}

export interface Author {
    id: number;
    firstName: string;
    lastName: string;
    bio?: Bio;
    books?: Book[];
}

export interface Bio {
    id: number;
    biodata: string;
}

export interface Order {
    id: number;
    quantity: number;
}