package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AddAllowHeaders("authorization")
	router.Use(cors.New(config))

	apiGroup := router.Group("/api")
	setupUser(apiGroup.Group("/user"))
	setupService(apiGroup)
	setupStories(apiGroup)
	setupRecommendationCategory(apiGroup)

	_ = router.Run(":6060")
}
