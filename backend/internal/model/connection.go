package model

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

func ConnectDatabase() *gorm.DB {
	dsn := os.Getenv("DB_CONFIG")
	log.Println(dsn)
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{}) // change the database provider if necessary

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	err = database.AutoMigrate(&User{})
	if err != nil {
		log.Fatalf("failed to migrate user %v", err)
	}
	err = database.AutoMigrate(&Service{})
	if err != nil {
		log.Fatalf("failed to migrate service %v", err)
	}
	err = database.AutoMigrate(&Partners{})
	if err != nil {
		log.Fatalf("failed to migrate partners %v", err)
	}
	err = database.AutoMigrate(&Stories{})
	if err != nil {
		log.Fatalf("failed to migrate stories %v", err)
	}
	return database
}
