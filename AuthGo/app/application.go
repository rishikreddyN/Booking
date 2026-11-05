package app

import (
	config "AuthGo/config/env"
	"AuthGo/router"
	
	"net/http"
	"time"
)
type Config struct {
	Addr string
}

type Application struct {
	Config Config
}
func NewConfig() Config {

	port := config.GetString("PORT", ":3002")

	return Config{
		Addr: port,
	}
}

func NewApplication(cfg Config) *Application {
	
	return &Application{
		Config: cfg,
	}
}

func (app *Application) Run() error {
	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	return server.ListenAndServe()
}

