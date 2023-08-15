package model

type Directions struct {
	Id   uint   `json:"id"`
	Name string `json:"name"`
}

type Categories struct {
	Id           uint   `json:"id"`
	Name         string `json:"name"`
	DirectionIds []uint `json:"direction_ids"`
}

type Tags struct {
	Id         uint   `json:"id"`
	Name       string `json:"name"`
	CategoryId uint   `json:"category_id"`
}

type CategoriesInfo struct {
	Directions []Directions `json:"directions"`
	Categories []Categories `json:"categories"`
	Tags       []Tags       `json:"tags"`
}
