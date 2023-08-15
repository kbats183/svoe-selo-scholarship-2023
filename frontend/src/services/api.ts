export const apiUrl = location.hostname === "localhost" ? "http://localhost:6060/api" : "/api";

export const apiRequest = (path: string, method = "GET", body: (object | undefined) = undefined) => {
    if (method === "GET") {
        return fetch(apiUrl + path).then(r => r.json());
    }

    return fetch(apiUrl + path, {
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "Access-Control-Request-Method": "POST, GET",
            "Access-Control-Request-Headers": "Authorization, Content-Type",
        },
        method: method,
        body: body && JSON.stringify(body),
    }).then(r => r.json());
}

