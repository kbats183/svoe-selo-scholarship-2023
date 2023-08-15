package router

import (
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func ActualCategories(userID uint) ([]model.Categories, error) {
	var user model.User
	err := model.Model.DB.Find(&user, userID).Error
	if err != nil {
		return nil, err
	}

	var cats []model.Categories
	for _, c := range model.Model.Categories {
		ok := false
		for _, d := range c.DirectionIds {
			for _, g := range user.Goals {
				if d == g {
					ok = true
					break
				}
			}
		}
		for _, i := range user.AlreadyHas {
			if c.Id == i {
				ok = false
				break
			}
		}
		if ok {
			cats = append(cats, c)
		}
	}
	return cats, nil
}

func setupRecommendationCategory(router *gin.RouterGroup) {
	router.GET("/category/for/:userid", func(c *gin.Context) {
		userID, err := strconv.Atoi(c.Param("userid"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		cats, err := ActualCategories(uint(userID))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"items": cats})
	})
}
