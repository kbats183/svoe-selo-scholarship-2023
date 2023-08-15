package model

import "gorm.io/datatypes"

type Stories struct {
	ID           uint                      `json:"id" gorm:"primaryKey"`
	AuthorID     uint                      `json:"author_id"`
	CreationTime int64                     `json:"creation_time"`
	Title        string                    `json:"name"`
	Description  string                    `json:"description"`
	Content      string                    `json:"content"`
	Tags         datatypes.JSONSlice[uint] `json:"tags"`
}
