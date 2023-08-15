package router

import (
	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

type StoriesPublic struct {
	model.Stories
	AuthorName string `json:"author_name"`
}

func setupStories(router *gin.RouterGroup) {
	router.GET("/stories", func(c *gin.Context) {
		var stories []StoriesPublic
		err := model.Model.DB.Raw("SELECT stories.id, author_id, creation_time, title, description, content, tags, users.name as author_name FROM stories INNER JOIN users on users.id = stories.author_id ORDER BY creation_time DESC").
			Scan(&stories).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"items": stories})
	})

	router.GET("/stories/:id", func(c *gin.Context) {
		var stories StoriesPublic
		err := model.Model.DB.Raw("SELECT stories.id, author_id, creation_time, title, description, content, tags, users.name as author_name FROM stories INNER JOIN users on users.id = stories.author_id WHERE stories.id = ? ORDER BY creation_time DESC", c.Param("id")).
			Scan(&stories).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"content": stories})
	})

}
