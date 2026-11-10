package router

import (
	"AuthGo/controllers"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/chi/v5"
)
type Router interface{
	Register (r chi.Router) 
}
func SetupRouter(userRouter Router,RoleRouter Router) *chi.Mux {
	router:=chi.NewRouter();
	router.Use(middleware.Logger);
	router.Get("/ping",controllers.PingHandler);
	userRouter.Register(router)
	RoleRouter.Register(router)
	return router
}
