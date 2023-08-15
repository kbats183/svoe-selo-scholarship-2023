import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    MenuList,
    MenuItem,
    ListItemText,
    Paper,
    ListItemIcon,
    Chip,
    Divider,
} from "@mui/material";
import {Check} from "@mui/icons-material";
import {useCategoryInfo} from "../hooks/use-category-info";
import {useServicesList} from "../hooks/use-services-list";
import {PageHeader} from "../components/page-header";
import {PureLink} from "../components/pure-link";
import {useCurrentUser} from "../contexts/user-context.ts";
import {useSearchParams} from "react-router-dom";

const CategoryFilterMenu: React.FC<{
    selectedCategoryIds: number[];
    setSelectedCategoryIds: React.Dispatch<React.SetStateAction<number[]>>;
    isRecommendation: boolean;
    setIsRecommendation: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({selectedCategoryIds, setSelectedCategoryIds, isRecommendation, setIsRecommendation}) => {
    const categoryInfo = useCategoryInfo();
    const onCategorySelected = (categoryId: number) => {
        if (selectedCategoryIds.includes(categoryId)) {
            setSelectedCategoryIds(selectedCategoryIds.filter(cId => cId !== categoryId));
        } else {
            setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
        }
    }
    const {user} = useCurrentUser();
    return (
        <MenuList>
            {user && (
                <>
                    <MenuItem onClick={() => {
                        setSelectedCategoryIds([]);
                        setIsRecommendation(s => !s);
                    }}>
                        <ListItemIcon>
                            {isRecommendation && <Check/>}
                        </ListItemIcon>
                        <ListItemText>Актуальные для меня</ListItemText>
                    </MenuItem>
                    <Divider/>
                </>
            )}
            {categoryInfo.categories.map(c => (
                <MenuItem key={c.id} onClick={() => {
                    onCategorySelected(c.id);
                    setIsRecommendation(false);
                }}>
                    <ListItemIcon>
                        {!isRecommendation && selectedCategoryIds.includes(c.id) && <Check/>}
                    </ListItemIcon>
                    <ListItemText>{c.name}</ListItemText>
                </MenuItem>
            ))}
        </MenuList>
    );
}

const ServicesList: React.FC<{
    selectedCategoryIds: number[];
    isRecommendation: boolean;
}> = ({selectedCategoryIds, isRecommendation}) => {
    const services = useServicesList({categories: selectedCategoryIds, isRecommendation});
    const categoryInfo = useCategoryInfo();
    return (
        <>
            {services && services.map(s => (
                <Card key={s.id}>
                    <CardContent>
                        <PureLink to={"/services/" + s.id}>
                            <Typography variant="h5" component="div">{s.name}</Typography>
                        </PureLink>
                        <PureLink to={"/partners/" + s.id}>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {s.partner_name}
                            </Typography>
                        </PureLink>
                        <Typography variant="body2">
                            {categoryInfo.tags.filter(t => s.tag === t.id).map(t => (
                                <Chip label={t.name} size="small"/>
                            ))}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {services === null && isRecommendation && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">Нет услуг для вас</Typography>
                        <Typography variant="body2">
                            Попробуйдет указать больше информации в профиле
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export const ServicesPage: React.FC = () => {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const [isRecommendation, setIsRecommendation] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const filterCategory = searchParams.get("category");
    const {user} = useCurrentUser();
    const userID = user?.id;
    useEffect(() => {
        if (filterCategory && !isNaN(parseFloat(filterCategory))) {
            setSelectedCategoryIds([parseInt(filterCategory)]);
        } else if (userID) {
            setIsRecommendation(true);
        }
    }, [filterCategory, userID]);
    return (
        <div>
            <PageHeader>Услуги</PageHeader>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <ServicesList
                        selectedCategoryIds={selectedCategoryIds}
                        isRecommendation={isRecommendation}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <CategoryFilterMenu
                            selectedCategoryIds={selectedCategoryIds}
                            setSelectedCategoryIds={setSelectedCategoryIds}
                            isRecommendation={isRecommendation}
                            setIsRecommendation={setIsRecommendation}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
