import {useEffect, useState} from "react";
import {apiRequest} from "../services/api.ts";
import {Stories} from "../types/Stories.ts";

export const useStoriesList = () => {
    const [stories, setStories] = useState<Stories[] | undefined>();
    useEffect(() => {
            apiRequest("/stories")
            .then(({items}: { items?: Stories[] }) => setStories(items));
    }, []);
    return stories;
}
