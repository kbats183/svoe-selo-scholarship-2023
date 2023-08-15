import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Chip,
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useCategoryInfo} from "../hooks/use-category-info";
import {useServiceDetails} from "../hooks/use-service-details";
import {PageHeader} from "../components/page-header";
import {PureLink} from "../components/pure-link";

const ServiceDetails: React.FC<{id: string}> = ({id}) => {
    const s = useServiceDetails(parseInt(id));
    const categoryInfo = useCategoryInfo();
    return (
        <>
        {s && (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">{s.name}</Typography>
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
        )}
    </>
    );
}

export const ServicePage: React.FC = () => {
    const {id} = useParams();
    return (
        <div>
            <PageHeader>Услуга</PageHeader>

            {id && <ServiceDetails id={id}/>}
        </div>
    );
}
