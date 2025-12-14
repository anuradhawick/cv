package citations

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"

	"golang.org/x/net/html"
)

type ScholarEntry struct {
	Title        string `json:"title"`
	TitleURL     string `json:"titleUrl,omitempty"`
	Authors      string `json:"authors"`
	Journal      string `json:"journal"`
	Citations    int    `json:"citations"`
	CitationsURL string `json:"citationsUrl,omitempty"`
	Year         int    `json:"year"`
}

type ScrapeMetadata struct {
	LastUpdated string `json:"lastUpdated"`
}

func ScrapeMetadataFromFile(path string) (ScrapeMetadata, error) {
	var metadata ScrapeMetadata

	f, err := os.ReadFile(path)
	if err != nil {
		return metadata, fmt.Errorf("failed to read metadata file: %w", err)
	}

	err = json.Unmarshal(f, &metadata)
	if err != nil {
		return metadata, fmt.Errorf("failed to unmarshal metadata JSON: %w", err)
	}

	return metadata, nil
}

func ScrapeGoogleScholar(url string) ([]ScholarEntry, error) {
	var r io.ReadCloser
	var err error

	f, err := os.Open(url)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	r = f

	defer r.Close()

	doc, err := html.Parse(r)
	if err != nil {
		return nil, fmt.Errorf("failed to parse HTML: %w", err)
	}

	tbody := findElementByID(doc, "gsc_a_b")
	if tbody == nil {
		return nil, fmt.Errorf("citations table body not found")
	}

	var results []ScholarEntry
	for tr := tbody.FirstChild; tr != nil; tr = tr.NextSibling {
		if !isElement(tr, "tr") || !hasClass(tr, "gsc_a_tr") {
			continue
		}

		var title, titleURL, authors, journal, citationsURL string
		var citations, year int

		tdTitle := findChildByClass(tr, "td", "gsc_a_t")
		if tdTitle != nil {
			if a := findChild(tdTitle, "a"); a != nil {
				title = nodeText(a)
				titleURL = ""
				for _, attr := range a.Attr {
					if attr.Key == "href" {
						titleURL = "https://scholar.google.com/" + attr.Val
						break
					}
				}
			}
			grayDivs := findChildrenByClass(tdTitle, "div", "gs_gray")
			if len(grayDivs) > 0 {
				authors = strings.TrimSpace(nodeText(grayDivs[0]))
			}
			if len(grayDivs) > 1 {
				journal = strings.TrimSpace(nodeText(grayDivs[1]))
			}
		}

		tdCit := findChildByClass(tr, "td", "gsc_a_c")
		if tdCit != nil {
			if a := findChild(tdCit, "a"); a != nil {
				citations = atoiSafe(strings.TrimSpace(nodeText(a)))
				citationsURL = ""
				for _, attr := range a.Attr {
					if attr.Key == "href" {
						citationsURL = attr.Val
						break
					}
				}
			}
		}

		tdYear := findChildByClass(tr, "td", "gsc_a_y")
		if tdYear != nil {
			if span := findChild(tdYear, "span"); span != nil {
				year = atoiSafe(strings.TrimSpace(nodeText(span)))
			}
		}

		if strings.TrimSpace(title) == "" {
			continue
		}

		results = append(results, ScholarEntry{
			Title:        strings.TrimSpace(title),
			TitleURL:     titleURL,
			Authors:      authors,
			Journal:      journal,
			Citations:    citations,
			CitationsURL: citationsURL,
			Year:         year,
		})
	}

	return results, nil
}

func isElement(n *html.Node, tag string) bool {
	return n != nil && n.Type == html.ElementNode && n.Data == tag
}

func hasClass(n *html.Node, class string) bool {
	for _, a := range n.Attr {
		if a.Key == "class" {
			for _, c := range strings.Fields(a.Val) {
				if c == class {
					return true
				}
			}
		}
	}
	return false
}

func findElementByID(n *html.Node, id string) *html.Node {
	var stack []*html.Node
	stack = append(stack, n)
	for len(stack) > 0 {
		cur := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, a := range cur.Attr {
			if a.Key == "id" && a.Val == id {
				return cur
			}
		}
		for c := cur.FirstChild; c != nil; c = c.NextSibling {
			stack = append(stack, c)
		}
	}
	return nil
}

func findChild(parent *html.Node, tag string) *html.Node {
	for c := parent.FirstChild; c != nil; c = c.NextSibling {
		if isElement(c, tag) {
			return c
		}
	}
	return nil
}

func findChildrenByClass(parent *html.Node, tag, class string) []*html.Node {
	var res []*html.Node
	for c := parent.FirstChild; c != nil; c = c.NextSibling {
		if isElement(c, tag) && hasClass(c, class) {
			res = append(res, c)
		}
	}
	return res
}

func findChildByClass(parent *html.Node, tag, class string) *html.Node {
	for c := parent.FirstChild; c != nil; c = c.NextSibling {
		if isElement(c, tag) && hasClass(c, class) {
			return c
		}
	}
	return nil
}

func nodeText(n *html.Node) string {
	var b strings.Builder
	var walk func(*html.Node)
	walk = func(cur *html.Node) {
		if cur.Type == html.TextNode {
			b.WriteString(cur.Data)
		}
		for c := cur.FirstChild; c != nil; c = c.NextSibling {
			walk(c)
		}
	}
	walk(n)
	return strings.TrimSpace(b.String())
}

func atoiSafe(s string) int {
	var b strings.Builder
	for _, r := range s {
		if r >= '0' && r <= '9' {
			b.WriteRune(r)
		}
	}
	if b.Len() == 0 {
		return 0
	}
	var v int
	for _, r := range b.String() {
		v = v*10 + int(r-'0')
	}
	return v
}
