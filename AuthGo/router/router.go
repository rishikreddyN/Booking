package router

import (
	"AuthGo/controllers"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/chi/v5"
)

func SetupRouter() *chi.Mux {
	router:=chi.NewRouter();
	router.Use(middleware.Logger);
	router.Get("/ping",controllers.PingHandler);
	
	return router
}
