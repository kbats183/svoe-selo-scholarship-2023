export type Direction = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
    direction_ids: number[];
};

export type Tag = {
    id: number;
    name: string;
    category_id: number;
};

export type CategoriesInfo = {
    directions: Direction[];
    categories: Category[];
    tags: Tag[];
}
