export type Product = {
    id: number
    name: string,
    category: string,
    price: '' | number,
    image: string
}

export type InputsObj = {
    name: string,
    category: string,
    price: '' | number,
    image: string
}

export type CartProps = {
    data: Product[],
    remove:(productId: number) => void
}