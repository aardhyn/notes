package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Note struct {
	Id string  `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
}

var notes = []Note{
	{Id: "1", Title: "Shopping List", Content: "Milk, Eggs, Bread, Butter"},
	{Id: "2", Title: "To Do List", Content: "Finish Homework, Walk the Dog, Clean the House"},
}

func getNotes(c *gin.Context) {
  c.IndentedJSON(http.StatusOK, notes)
}

func createNote(c *gin.Context) {
	var newNote Note
	newNote.Id = strconv.Itoa(len(notes) + 1)

	if c.BindJSON(&newNote) != nil {
		return
	}

	notes = append(notes, newNote)
	c.IndentedJSON(http.StatusCreated, newNote)
}

const port = "8080"
const domain = "localhost"

func main() {
  router := gin.Default()

  router.GET("/notes", getNotes)
	router.POST("/notes", createNote)

	router.Run(domain + ":" + port)
}