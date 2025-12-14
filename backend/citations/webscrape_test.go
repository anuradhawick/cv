package citations

import (
	"bytes"
	"encoding/json"
	"fmt"
	"testing"
)

func TestScrapeGoogleScholar(t *testing.T) {

	arr, err := ScrapeGoogleScholar("../assets/citations.html")
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	fmt.Println(arr[0])

	if len(arr) != 46 {
		t.Fatalf("expected 46 entries, got %d", len(arr))
	}

	_, err = json.MarshalIndent(arr, "", "  ")

	if err != nil {
		t.Fatalf("expected no error during JSON marshal, got %v", err)
	}

	buf := &bytes.Buffer{}
	enc := json.NewEncoder(buf)
	enc.SetEscapeHTML(false)
	enc.SetIndent("", "  ")
	err = enc.Encode(arr[0])
	if err != nil {
		t.Fatalf("expected no error during JSON encoding, got %v", err)
	}
	first := buf.Bytes()

	fmt.Println(string(first))
}
