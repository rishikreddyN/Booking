package db

import "database/sql"

type UserRepository interface {
	Create() []error
}
type UserRepositoryImpl struct {
	db *sql.DB
}
func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db:_db,
	}
}
func (u *UserRepositoryImpl) Create() []error {
	return nil
}
