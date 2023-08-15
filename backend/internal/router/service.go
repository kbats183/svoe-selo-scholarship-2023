package router

import (
	"backend/internal/model"
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

type ServicePublic struct {
	model.Service
	PartnerName string `json:"partner_name"`
}

func servicesByTags(tags []uint) ([]ServicePublic, error) {
	var services []model.Service
	err := model.Model.DB.Where("tag IN ?", tags).Find(&services).Error
	if err != nil {
		return nil, err
	}
	log.Println(services)
	var partners []model.Partners
	err = model.Model.DB.Find(&partners).Error
	if err != nil {
		return nil, err
	}
	log.Println(partners)
	var servicesPublic []ServicePublic
	for _, s := range services {
		for _, p := range partners {
			if p.ID == s.PartnerID {
				servicesPublic = append(servicesPublic, ServicePublic{
					Service:     s,
					PartnerName: p.Name,
				})
				break
			}
		}
	}
	log.Println(servicesPublic)
	return servicesPublic, nil
}

func setupService(router *gin.RouterGroup) {
	router.GET("/services", func(c *gin.Context) {
		categories := utils.ParseParamIds(c, "categories")
		var tagsByCategories []uint
		for _, t := range model.Model.Tags {
			if len(categories) == 0 {
				tagsByCategories = append(tagsByCategories, t.Id)
			}
			for _, c := range categories {
				if strconv.FormatUint(uint64(t.CategoryId), 10) == c {
					tagsByCategories = append(tagsByCategories, t.Id)
				}
			}
		}

		servicesPublic, err := servicesByTags(tagsByCategories)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"items": servicesPublic})
	})

	router.GET("/services/for/:userid", func(c *gin.Context) {
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
		var catIds []uint
		for _, c := range cats {
			catIds = append(catIds, c.Id)
		}

		servicesPublic, err := servicesByTags(catIds)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"items": servicesPublic})
	})

	router.GET("/services/:id", func(c *gin.Context) {
		var service model.Service
		err := model.Model.DB.Where("id = ?", c.Param("id")).First(&service).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var partners []model.Partners
		err = model.Model.DB.Find(&partners).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var servicesPublic ServicePublic
		for _, p := range partners {
			if p.ID == service.PartnerID {
				servicesPublic = ServicePublic{
					Service:     service,
					PartnerName: p.Name,
				}
				break
			}
		}
		c.JSON(http.StatusOK, gin.H{"content": servicesPublic})
	})

	router.GET("/partners", func(c *gin.Context) {
		var partners []model.Partners
		err := model.Model.DB.Find(&partners).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"items": partners})
	})

	router.GET("/partners/:id", func(c *gin.Context) {
		var partner model.Partners
		err := model.Model.DB.Find(&partner, c.Param("id")).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"content": partner})
	})
}
