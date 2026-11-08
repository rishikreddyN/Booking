package app

import (
	dbConfig "AuthGo/config/db"
	config "AuthGo/config/env"
	"AuthGo/controllers"
	"AuthGo/router"
	"AuthGo/services"
	repositories "AuthGo/db/repositories"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}

type Application struct {
	Config Config
	Store  repositories.Storage
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
	conn, err := dbConfig.SetupDB()
	if err != nil {
		return err
	}
	ur := repositories.NewUserRepository(conn)
	us := services.NewUserService(ur)
	uc := controllers.NewUserController(us)
	uRouter := router.NewUserRouter(uc)
	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	return server.ListenAndServe()
}
