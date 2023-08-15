import React from "react";
import {Box, Card, CardContent, Chip, Typography} from "@mui/material";
import {PureLink} from "../components/pure-link.tsx";
import {useServicesList} from "../hooks/use-services-list.ts";
// @ts-ignore
import {Scrollbars} from 'react-custom-scrollbars';
import {useStoriesList} from "../hooks/use-stories-list.ts";
import {useCurrentUser} from "../contexts/user-context.ts";
import {useRecommendationCategory} from "../hooks/use-recommendation-category.ts";

export const MainPage: React.FC = () => {
    const {user} = useCurrentUser();
    const services = useServicesList({});
    const stories = useStoriesList();
    const recCat = useRecommendationCategory(user?.id);

    return (
        <div>
            <Box sx={{mb: 2}}>
                <Card>
                    <CardContent>
                        {!user && (
                            <>
                                <Typography variant="h5" component="div">Совет для вас</Typography>
                                <Typography>
                                    Создайте профиль в сервисе или войдите в уже существующий, чтобы мы могли предлажить
                                    информацию и услуги, интересную вам.
                                </Typography>
                            </>
                        )}
                        {user && (
                            <>
                                <Typography variant="h5" component="div">Актуально для вас</Typography>
                                <Typography sx={{mt: 1}}>
                                    {recCat && recCat.map(c => (
                                        <PureLink to={"/services?category=" + c.id} key={c.id}
                                                  style={{marginRight: "4px"}}>
                                            <Chip label={c.name} size="small"/>
                                        </PureLink>
                                    ))}
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>

            <PureLink to={"/services"}>
                <Typography variant="h4" component="div">Услуги</Typography>
            </PureLink>

            <Scrollbars
                className="scrolling-wrapper"
                autoHeight
            >
                {services && services.map(s => (
                    <Card key={s.id} sx={{maxWidth: 350, width: 1}}>
                        <CardContent>
                            <div>
                                <PureLink to={"/services/" + s.id}>
                                    <Typography variant="h6" component="span">{s.name}</Typography>
                                </PureLink>
                            </div>
                            <PureLink to={"/partners/" + s.id}>
                                <Typography sx={{mb: 1.5}} color="text.secondary" component="span">
                                    {s.partner_name}
                                </Typography>
                            </PureLink>
                        </CardContent>
                    </Card>
                ))}
            </Scrollbars>

            <PureLink to={"/stories"}>
                <Typography variant="h4" component="div">Истории</Typography>
            </PureLink>

            <Scrollbars
                className="scrolling-wrapper"
                autoHeight
            >
                {stories && stories.map(s => (
                    <Card key={s.id} sx={{maxWidth: 350, width: 1}}>
                        <CardContent>
                            <div>
                                <PureLink to={"/stories/" + s.id}>
                                    <Typography variant="h6" component="span">{s.name}</Typography>
                                </PureLink>
                            </div>
                            <Typography sx={{mb: 1.5}} color="text.secondary" component="span">
                                {s.author_name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Scrollbars>

        </div>
    );
}
