package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Server running on 4000")
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.ListenAndServe(":4000", nil)
}
