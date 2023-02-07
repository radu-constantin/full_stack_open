```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note over browser,server: "The new note is sent as part of the request body" 
    activate server
    server-->>browser: '302 Found' Status Code - Redirect to /exampleapp/notes
    deactivate server
    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server
    browser->>server: /exampleapp/main.js
    activate server
    server-->>browser: JS file
    Note over browser,server: "The browser starts executing the JS code in the file"
    deactivate server
    browser->>server: GET /exampleapp/data.json
    activate server
    Note over browser,server: "The JSON data is sent back and rendered on the browser"
    server-->>browser: JSON data
    deactivate server
  ```
