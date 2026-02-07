export interface Vacation {
    vacationId: number;
    destination: string;
    description: string;
    startDate: string; // or Date
    endDate: string; // or Date
    price: number;
    imageFilename: string;

    // Extra fields for the client
    followersCount?: number;
    isFollowed?: boolean; // 0 or 1 from DB, converted to boolean
}
