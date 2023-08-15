import React from "react";
import {DateTime} from "luxon";
import {PageHeader} from "../components/page-header";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    MenuList,
    MenuItem,
    ListItemText,
    Paper,
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useStoriesDetails} from "../hooks/use-stories-details.ts";

const StoriesSidebarNav: React.FC = () => {
    return (
        <MenuList>
            <MenuItem onClick={() => {
            }}>
                <ListItemText>Все истории</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {
            }}>
                <ListItemText>Создать историю</ListItemText>
            </MenuItem>

        </MenuList>
    );
}

const StoryContent: React.FC<{ content: string }> = ({content}) => {
    const lines = content.split("\n");
    return lines.map(line => {
        if (line.startsWith("#")) {
            return <Typography variant="h5">{line.slice(1)}</Typography>
        } else if (line.startsWith("!")) {
            return (
                <div className="story-content-image"><img src={line.slice(1)}/></div>
            );
        } else if (line.trim() === "") {
            return <br/>;
        }
        return line;
    })
}

const StoryDetails: React.FC<{ id: number }> = ({id}) => {
    const story = useStoriesDetails(id);
    return (
        <>
            {story && (
                <Card>
                    <CardContent>
                            <Typography variant="h5" component="div">{story.name}</Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {story.author_name}, {DateTime.fromSeconds(story.creation_time).toFormat('HH:mm:ss dd.LL.yyyy')}
                        </Typography>
                        <Typography variant="body2">
                            <StoryContent content={story.content}/>
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export const StoryPage: React.FC = () => {
    // const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const {id} = useParams();
    return (
        <div>
            <PageHeader>История</PageHeader>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    {id && <StoryDetails id={parseInt(id)}/>}
                </Grid>
                <Grid item xs={3}>
                    <Paper>
                        <StoriesSidebarNav/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
