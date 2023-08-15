package model

import (
	"encoding/json"
	"gorm.io/gorm"
	"io"
	"log"
	"os"
)

type AppModel struct {
	*gorm.DB
	CategoriesInfo
}

var Model AppModel

func loadCategories() CategoriesInfo {
	file, err := os.Open("config/categories.json")
	if err != nil {
		log.Fatalf("failed to load categories config %v", err)
	}
	defer func() {
		_ = file.Close()
	}()

	byteValue, _ := io.ReadAll(file)
	var info CategoriesInfo
	err = json.Unmarshal(byteValue, &info)
	if err != nil {
		log.Fatalf("failed to parse categories config %v", err)
	}
	return info
}

func InitModel() {
	Model = AppModel{
		DB:             ConnectDatabase(),
		CategoriesInfo: loadCategories(),
	}
}
