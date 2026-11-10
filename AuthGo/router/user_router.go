package router

import (
    "AuthGo/controllers"
	"github.com/go-chi/chi/v5"
    "AuthGo/middlewares"
)

type UserRouter struct {
    userController *controllers.UserController
}

func NewUserRouter(userController *controllers.UserController) *UserRouter {
    return &UserRouter{
        userController: userController,
    }
}
func (ur *UserRouter) Register(r chi.Router) {
    r.With(middlewares.JWTAuthMiddleware, middlewares.RequireAnyRole("user", "admin")).Get("/profile", ur.userController.GetUserById)
	r.With(middlewares.UserCreateRequestValidator).Post("/signup", ur.userController.CreateUser)
	r.With(middlewares.UserLoginRequestValidator).Post("/login", ur.userController.LoginUser)
}