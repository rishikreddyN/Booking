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
	query:="select id,username,email,password,created_at,updated_at from users where id =?"

	row:=u.db.QueryRow(query,1)

	user:=&models.User{}

	err:=row.Scan(&user.id,&user.username,&user.email,&user.password,&user.createdAt,&user.updatedAt)
	if err != nil {
		return []error{err}
	}
	return nil
}
