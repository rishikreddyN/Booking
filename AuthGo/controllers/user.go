package controllers

import(
	"AuthGo/services"
	"net/http"
)

type UserController struct {
	userService services.UserService
}

func NewUserController(_userService services.UserService) *UserController {
	return &UserController{
		userService: _userService,
	}
}

func (u *UserController) RegisterUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User registration successful"))
}