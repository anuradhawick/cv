package utils

import "encoding/json"

func MustJSON(v interface{}) string {
	b, _ := json.Marshal(v) // safe for logging only
	return string(b)
}
