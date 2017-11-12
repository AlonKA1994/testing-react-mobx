export const LogAxiosConfig ={
    baseURL: 'http://localhost:9000/api',
    timeout: 10000,
    // withCredentials: true,
    // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}