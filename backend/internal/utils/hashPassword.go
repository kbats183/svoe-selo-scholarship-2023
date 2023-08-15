package utils

import (
	"crypto/sha256"
	"fmt"
)

func HashPassword(password string) string {
	h := sha256.New()
	h.Write([]byte("Jdnba8us" + password + "23e4rqfrq2"))
	return fmt.Sprintf("%x", h.Sum(nil))
}
