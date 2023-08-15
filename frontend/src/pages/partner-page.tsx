import React from "react";
import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import {useParams} from "react-router-dom";
import {PageHeader} from "../components/page-header";
import {usePartnerDetails} from "../hooks/use-partner-details.ts";

const PartnerDetails: React.FC<{id: string}> = ({id}) => {
    const p = usePartnerDetails(parseInt(id));
    return (
        <>
        {p && (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">{p.name}</Typography>
                    <Typography variant="body2">
                        {p.description}
                    </Typography>
                </CardContent>
            </Card>
        )}
    </>
    );
}

export const PartnerPage: React.FC = () => {
    const {id} = useParams();
    return (
        <div>
            <PageHeader>Партнер</PageHeader>

            {id && <PartnerDetails id={id}/>}
        </div>
    );
}
