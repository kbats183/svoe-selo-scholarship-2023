package model

import (
	"gorm.io/datatypes"
)

type PublicUser struct {
	ID         uint                      `json:"id" gorm:"primaryKey"`
	Login      string                    `json:"login"`
	Name       string                    `json:"name"`
	Region     uint                      `json:"region"`
	Goals      datatypes.JSONSlice[uint] `json:"goals"`
	AlreadyHas datatypes.JSONSlice[uint] `json:"already_has"`
	Wishes     datatypes.JSONSlice[uint] `json:"wishes"`
}

type User struct {
	PublicUser
	Password   string `json:"password"`
	SessionKey string `json:"session_key"`
}
