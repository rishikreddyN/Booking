package main

import (
	"AuthGo/app"
	config "AuthGo/config/env"
	
)

func main(){
		config.LoadEnv()
		cfg:=app.NewConfig()
		app:=app.NewApplication(cfg)
		app.Run()
	}
