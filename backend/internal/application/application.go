package application

import (
	"backend/internal/model"
	"backend/internal/router"
	"fmt"
)

func ApplicationRun() {
	model.InitModel()
	v, e := router.ActualCategories(1)
	fmt.Printf("%v %v", v, e)
	router.SetupRouter()
}
