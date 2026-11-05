package config

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		
	}

}
func GetString(key string,fallback string) string {
	LoadEnv()
	value,ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	return value
}