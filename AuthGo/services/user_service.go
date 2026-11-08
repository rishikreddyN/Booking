package services
import (
	db "AuthGo/db/repositories"
)
type UserService interface {
	CreateUser() error
}

type UserServiceImpl struct {

	userRepository db.UserRepository
}

func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
}

func (u *UserServiceImpl) CreateUser() error {
	return nil
}