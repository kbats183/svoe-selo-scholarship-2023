import {apiRequest} from "./api.ts";

export const loginUser = (login: string, password: string) =>
    apiRequest("/user/login", "POST", {login, password});

export const userCheckAuth = (login: string, session: string) =>
    apiRequest("/user/auth", "POST", {login, session});

