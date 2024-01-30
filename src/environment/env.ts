const production = false;

export const environment = {
    apiUrl: production ? 'http://localhost:8080' : 'https://auth-api-2yen.onrender.com',
    clientUrl: production? 'http://localhost:4200' : 'https://points-35d3d.web.app'
};