import {useEffect, useState} from "react";
import {apiRequest} from "../services/api.ts";
import {Stories} from "../types/Stories.ts";

export const useStoriesDetails = (storiesId: number) => {
    const [stories, setStories] = useState<Stories | undefined>();
    useEffect(() => {
        apiRequest("/stories/" + storiesId, "GET").then(({content}: { content?: Stories }) =>
            setStories(content));
    }, [storiesId]);
    return stories;
}
