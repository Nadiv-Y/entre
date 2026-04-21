export type User = {
    userID: number,
    firstName: string,
    lastName: string,
    isFollowedState: Boolean
}

export type Vacation = {
    vacationID: number,
    name: string,
    destination: string,
    start: string,
    end: string,
    image: string,
    price: string
}