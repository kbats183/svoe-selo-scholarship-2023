package model

type Service struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Tag         uint   `json:"tag"`
	PartnerID   uint   `json:"partner_id"`
}

type Partners struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
