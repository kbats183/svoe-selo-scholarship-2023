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
import {useStoriesList} from "../hooks/use-stories-list.ts";
import {PureLink} from "../components/pure-link.tsx";

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

const StoriesList: React.FC = () => {
    const stories = useStoriesList();
    return (
        <>
            {stories && stories.map(s => (
                <Card key={s.id}>
                    <CardContent>
                        <PureLink to={"/stories/" + s.id}>
                            <Typography variant="h5" component="div">{s.name}</Typography>
                        </PureLink>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {s.author_name}, {DateTime.fromSeconds(s.creation_time).toFormat('HH:mm:ss dd.LL.yyyy')}
                        </Typography>
                        <Typography variant="body2">
                            {s.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export const StoriesPage: React.FC = () => {
    // const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    return (
        <div>
            <PageHeader>Истории</PageHeader>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <StoriesList/>
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
