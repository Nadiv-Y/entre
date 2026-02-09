class Config {
    // Default to localhost, or read from Vite env (VITE_API_URL)
    public serverUrl = import.meta.env?.VITE_API_URL || "http://localhost:3001";
    public apiUrl = this.serverUrl + "/api";
}

const appConfig = new Config();
export default appConfig;
