import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {User} from "../types/User.ts";
import useCookie, {getCookie} from 'react-use-cookie';
import {userCheckAuth} from "../services/user.ts";

declare type CurrentUserState = {
    user: User | null;
    reloadAuth: () => void;
}

export const UserContext = createContext<CurrentUserState>({
    user: null, reloadAuth: () => {
    }
});

export const useCurrentUserState: () => CurrentUserState = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLogin] = useCookie("userLogin");
    const [userSession] = useCookie("userSession");
    const reloadAuth = useCallback(() => {
        const login = getCookie("userLogin");
        const session = getCookie("userSession");
        userCheckAuth(login, session).then(({status, user}: { status: string; user: User | null }) => {
            setCurrentUser(status === "ok" ? user : null);
        })
    }, [setCurrentUser])
    useEffect(() => {
        if (userLogin === undefined || userLogin === "" || userSession === undefined || userSession === "") {
            return;
        }
        reloadAuth();
    }, [userLogin, userSession, reloadAuth]);

    return {user: currentUser, reloadAuth};
};

export const useCurrentUser = () => {
    return useContext(UserContext);
};
