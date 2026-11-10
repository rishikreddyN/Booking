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
	"fmt"
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
	db, err := dbConfig.SetupDB()
	if err != nil {
		return err
	}
	ur := repositories.NewUserRepository(db)
	rr := repositories.NewRoleRepository(db)
	rpr := repositories.NewRolePermissionRepository(db)
	urr := repositories.NewUserRoleRepository(db)
	us := services.NewUserService(ur)
	rs := services.NewRoleService(rr, rpr, urr)
	uc := controllers.NewUserController(us)
	rc := controllers.NewRoleController(rs)
	uRouter := router.NewUserRouter(uc)
	rRouter := router.NewRoleRouter(rc)

	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter,rRouter),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	fmt.Println("Server is running on port", app.Config.Addr)
	return server.ListenAndServe()
}
