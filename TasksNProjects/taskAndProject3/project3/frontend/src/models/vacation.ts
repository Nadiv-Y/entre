export interface Vacation {
    vacationId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFilename: string;
    followersCount: number;
    isFollowed: boolean;
}
