package main

import (
	"context"

	"github.com/anuradhawick/cv/citations"
	"github.com/anuradhawick/cv/utils"
	"github.com/aws/aws-lambda-go/events"
)

func GetCitations(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	entries, err := citations.ScrapeGoogleScholar("./assets/citations.html")

	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    defaultHeaders,
			Body:       `{"error":"` + err.Error() + `"}`,
		}, nil
	}

	metadata, err := citations.ScrapeMetadataFromFile("./assets/citations.json")

	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    defaultHeaders,
			Body:       `{"error":"` + err.Error() + `"}`,
		}, nil
	}

	response := struct {
		Metadata citations.ScrapeMetadata `json:"metadata"`
		Entries  []citations.ScholarEntry `json:"entries"`
	}{
		Metadata: metadata,
		Entries:  entries,
	}

	respBody := utils.MustJSON(response)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    defaultHeaders,
		Body:       respBody,
	}, nil

}
