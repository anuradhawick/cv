# CV App

This is the CV App repository. It contains the backend and frontend code for displaying a CV with publications and citations.

Live version available at [https://cv.anuradhawick.com](https://cv.anuradhawick.com)

## Citations

Render all citations with "show more" and copy the table element into the citations.html file. Update the citations.json file with the relevant metadata.

### Steps to update citations.html

1. Go to Google Scholar profile.
2. Click on "Show more" until all citations are loaded.
3. Right click on the citations table and select "Inspect".
4. In the developer tools, right click on the `<table>` element and select "Copy" -> "Copy element".
5. Paste the copied HTML into `backend/assets/citations.html`, replacing the existing content.

### Steps to update citations.json

1. Add the today date to the `backend/assets/citations.json` file under the "lastUpdated" field.
