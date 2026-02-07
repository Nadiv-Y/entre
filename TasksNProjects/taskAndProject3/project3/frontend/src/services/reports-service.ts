import api from "./api";

interface ReportData {
    destination: string;
    followersCount: number;
}

const getFollowersStats = async (): Promise<ReportData[]> => {
    const response = await api.get<ReportData[]>("/reports/followers");
    return response.data;
};

export default {
    getFollowersStats
};
