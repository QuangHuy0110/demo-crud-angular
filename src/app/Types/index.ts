export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
}

export interface Rating {
    rate: number
    count: number
}

export interface User {
    id: string;
    email: string;
    password: string;
}

export type Cart = Product & {
    quantity: number
}