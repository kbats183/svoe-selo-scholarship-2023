export type Service = {
    id: number;
    name: string;
    description: string;
    regions: number[];
    tag: number;
    partner_id: number;
    partner_name: string;
    price: number;
};

export type Partner = {
    id: number;
    name: string;
    description: string;
};
