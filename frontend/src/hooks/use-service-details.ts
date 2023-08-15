import {useEffect, useState} from "react";
import {Service} from "../types/Services.ts";
import {apiRequest} from "../services/api.ts";

export const useServiceDetails = (serviceId: number) => {
    const [service, setService] = useState<Service | undefined>();
    useEffect(() => {
        apiRequest("/services/" + serviceId, "GET").then(({content}: { content?: Service }) =>
            setService(content));
    }, [serviceId]);
    return service;
}
