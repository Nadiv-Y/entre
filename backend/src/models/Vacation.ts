export interface Vacation {
    id: number;
    description: string;
    destination: string;
    image_name: string;
    start_date: string | Date; // Depending on how we query, it might come back as a string or Date object
    end_date: string | Date;
    price: number;
    isFollowing?: boolean; // Useful for the client-side to easily know if the user follows this vacation
    followersCount?: number; // Useful for displaying total followers
}
