class Config {
    // API Endpoints
    public publicVacationsUrl = 'http://localhost:3001/api/vacations/';
    public vacationsUrl = 'http://localhost:3001/api/vacations/';
    public followersUrl = 'http://localhost:3001/api/followers/';
    public registerUrl = 'http://localhost:3001/api/auth/register/';
    public loginUrl = 'http://localhost:3001/api/auth/login/';

    // Base URL for Images
    public imageUrl = 'http://localhost:3001/uploads/';

    // Socket URL
    public socketUrl = 'http://localhost:3001/';
}

const appConfig = new Config();
export default appConfig;
