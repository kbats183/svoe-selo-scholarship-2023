import {useEffect, useState} from "react";
import {Partner} from "../types/Services.ts";
import {apiRequest} from "../services/api.ts";

export const usePartnersList = () => {
    const [partners, setPartners] = useState<Partner[] | undefined>();
    useEffect(() => {
        apiRequest("/partners", "GET").then(({items}: { items?: Partner[] }) => setPartners(items));
    }, []);
    return partners;
}
