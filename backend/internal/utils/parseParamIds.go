package utils

import (
	"github.com/gin-gonic/gin"
	"strings"
)

func ParseParamIds(c *gin.Context, key string) []string {
	categoriesParams, has := c.GetQuery(key)
	if !has {
		return []string{}
	}
	categories := strings.Split(categoriesParams, ",")
	if len(categories) == 1 && categories[0] == "" {
		return []string{}
	}
	return categories
}
