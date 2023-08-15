package router

import (
	"backend/internal/model"
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

type userLoginInput struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}
type userAuthInput struct {
	Login   string `json:"login"`
	Session string `json:"session"`
}

func setupUser(router *gin.RouterGroup) {
	router.POST("/login", func(c *gin.Context) {
		var input userLoginInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user model.User
		log.Println(input.Login)
		log.Println(utils.HashPassword(input.Password))
		err := model.Model.DB.Where("login=?", input.Login).
			Where("password=?", utils.HashPassword(input.Password)).
			First(&user).Error
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"status": "failed to authorize", "message": "Направильный логин или пароль"})
			return
		}

		sessionKey := utils.HashPassword(user.Login + "_" + time.Now().Format(time.RFC3339Nano))
		model.Model.DB.Model(&user).Where("id = ?", user.ID).Update("session_key", sessionKey)

		c.JSON(http.StatusOK, gin.H{"status": "authorized", "login": user.Login, "session_key": sessionKey})
	})
	router.POST("/auth", func(c *gin.Context) {
		var input userAuthInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user model.User
		err := model.Model.DB.Where("login=?", input.Login).
			Where("session_key=?", input.Session).
			First(&user).Error
		if err != nil {
			c.JSON(http.StatusForbidden, gin.H{"status": "failed to load data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "ok", "user": user.PublicUser})
	})
}
