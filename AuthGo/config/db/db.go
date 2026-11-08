package config

import (
	env "AuthGo/config/env"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func setUpDb() (*sql.DB, error) {
	cfg := mysql.NewConfig()

	cfg.User = env.GetString("username", "root")
	cfg.Passwd = env.GetString("password", "")
	cfg.Net = "tcp"
	cfg.Addr = env.GetString("DB_ADDR", "127.0.0.1:3306")
	cfg.DBName = env.GetString("db_name", "Auth")

	fmt.Println("Connecting to database:", cfg.DBName, cfg.FormatDSN())

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Println("Error connecting to database:", err)
		return nil, err
	}

	fmt.Println(("Trying to connect to database..."))
	pingErr := db.Ping()
	if pingErr != nil {
		fmt.Println("Error pinging database:", pingErr)
		return nil, pingErr
	}
	fmt.Println("Connected to database successfully:", cfg.DBName)

	return db, nil

}
