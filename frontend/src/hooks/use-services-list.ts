import {useEffect, useState} from "react";
import {Service} from "../types/Services.ts";
import {apiRequest} from "../services/api.ts";
import {useCurrentUser} from "../contexts/user-context.ts";

export const useServicesList = ({categories, isRecommendation}: {
    categories?: number[],
    isRecommendation?: boolean;
}) => {
    const [services, setServices] = useState<Service[] | undefined>();
    const {user} = useCurrentUser();
    const userID = user?.id;
    useEffect(() => {
        if (isRecommendation && userID) {
            apiRequest("/services/for/" + userID, "GET").then(({items}: {
                items?: Service[]
            }) => setServices(items));
        }
        apiRequest("/services?categories=" + (categories?.join(",") ?? ""), "GET").then(({items}: {
            items?: Service[]
        }) => setServices(items));
    }, [categories, userID, isRecommendation]);
    return services;
}
