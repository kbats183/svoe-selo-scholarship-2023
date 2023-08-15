import {useEffect, useState} from "react";
import {Partner, Service} from "../types/Services.ts";
import {apiRequest} from "../services/api.ts";

export const usePartnerDetails = (serviceId: number) => {
    const [partner, setPartner] = useState<Partner | undefined>();
    useEffect(() => {
        apiRequest("/partners/" + serviceId, "GET").then(({content}: { content?: Service }) =>
            setPartner(content));
    }, [serviceId]);
    return partner;
}
