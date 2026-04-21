export class VacationModel {
    public id?: number;
    public description?: string;
    public destination?: string;
    public picture?: string;
    public image?: File; // To hold the actual file for uploads
    public startDate?: string;
    public endDate?: string;
    public price?: number;
    public followersCount?: number;
    public isFollowing?: boolean;
}
