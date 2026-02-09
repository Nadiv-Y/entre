export default interface VacationModel {
    id: number;
    destination: string;
    description: string;
    fromDate: string;
    toDate: string;
    price: number;
    imageName: string;
    image?: FileList; // For upload
    isFollowing?: number; // 0 or 1 (boolean from DB comes as 0/1 usually, can be boolean too depending on driver)
    followersCount?: number;
}
