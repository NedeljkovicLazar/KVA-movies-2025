export interface OrderModel {
    id: number
    movieID: number
    title: string
    startDate: string
    count: number
    pricePerItem: string
    status: 'ordered' | 'paid' | 'canceled'
    rating: null | boolean
}