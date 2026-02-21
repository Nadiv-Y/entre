export class VacationModel {
    id: number = 0;
    description: string = "";
    destination: string = "";
    image_name: string = "";
    start_date: string = "";
    end_date: string = "";
    price: number = 0;
    followersCount: number = 0;
    isFollowing: boolean = false;
    image?: FileList; // react-hook-form returns a FileList object on file inputs
}
