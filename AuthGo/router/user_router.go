package router

import (
    "AuthGo/controllers"
	"github.com/go-chi/chi/v5"
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
    // Register user endpoints here
}