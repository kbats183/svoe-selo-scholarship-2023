import React from "react";
import {PageHeader} from "../components/page-header";
import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import {PureLink} from "../components/pure-link";
import {usePartnersList} from "../hooks/use-partners-list.ts";


const PartnersList: React.FC = () => {
    const partners = usePartnersList();
    return (
        <>
            {partners && partners.map(p => (
                <Card key={p.id}>
                    <CardContent>
                        <PureLink to={"/partners/" + p.id}>
                            <Typography variant="h5" component="div">{p.name}</Typography>
                        </PureLink>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export const PartnersPage: React.FC = () => {
    return (
        <div>
            <PageHeader>Партнеры</PageHeader>
            <PartnersList/>
        </div>
    );
}
