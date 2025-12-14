package main

import (
	"context"

	"github.com/D-Andreev/lambdamux"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
)

var defaultHeaders = map[string]string{"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}

func init() {
	_, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		panic("unable to load SDK config, " + err.Error())
	}
}

func main() {
	router := lambdamux.NewLambdaMux()

	router.GET("/citations", GetCitations)

	lambda.Start(router.Handle)
}
