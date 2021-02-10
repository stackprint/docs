---
title: Connecting with Go
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this section you'll learn how to connect to your Stackprint API with [Go](https://golang.org) using generated client code. The shown code examples are based on generated client code for an API deployed from the default API configuration and the **Note** object type. For your API and object types, the names of services, functions and parameters will likely be different.


## Setup

- On your [Stackprint Dashboard](https://console.stackprint.io) click **Generate client code** under your API and select **Go** to generate Go client code for that API and download it
- Copy the content of the `go-client` directory inside the downloaded archive to **<go_project_folder>/stackprint**
- Install dependencies:

```bash
go get github.com/stretchr/testify/assert
go get golang.org/x/oauth2
go get golang.org/x/net/context
go get github.com/antihax/optional
```

- Find the file `go.mod` in the downloaded code and replace the first line `module ///stackprint` with a submodule identifier that is within your project's main module path, e.g. `module github.com/stackprint/example-app/stackprint`

- Import the `stackprint` package anywhere in your project:

```go
import "<your_project_module_path>/stackprint"
```

:::note
If your code editor can't resolve the `stackprint` package it probably doesn't support nested modules. In that case delete the files `go.mod` and `go.sum` from the downloaded code.
:::

### Authentication

#### API Key

API Keys can be passed through the context when making requests:

```go
client := stackprint.NewAPIClient(stackprint.NewConfiguration())
auth := context.WithValue(context.Background(), stackprint.ContextAPIKey,
    stackprint.APIKey{ Key: "<stackprint_api_key>" })

notes, _, err := client.NoteApi.ListNotes(auth, nil)
```

#### Access token

Access tokens can also be passed through the context:

```go
client := stackprint.NewAPIClient(stackprint.NewConfiguration())
auth := context.WithValue(context.Background(), stackprint.ContextAccessToken,
    "<access_token>")

notes, _, err := client.NoteApi.ListNotes(auth, nil)
```


## Create an object

```go
note, response, err := client.NoteApi.CreateNote(auth, &stackprint.CreateNoteOpts{
    NoteParams: optional.NewInterface(stackprint.NoteParams{
        Text: "Hello from Stackprint!",
    }),
})
```

## Get an object

```go
note, response, err := client.NoteApi.GetNote(auth, "<id>")
```

## List objects

```go
notes, response, err := client.NoteApi.ListNotes(auth, nil)
```

### Filter

```go
notes, response, err := client.NoteApi.ListNotes(auth, &stackprint.ListNotesOpts{
    Author: optional.NewString("me"),
})
```

### Sort

```go
notes, response, err := client.NoteApi.ListNotes(auth, &stackprint.ListNotesOpts{
    Sort: optional.NewString("author:asc"),
})
```

### Paginate

```go
notes, response, err := client.NoteApi.ListNotes(auth, &stackprint.ListNotesOpts{
    Skip:  optional.NewInt32(10),
    Limit: optional.NewInt32(10),
})
```

## Update an object

```go
note, response, err := client.NoteApi.UpdateNote(auth, "<id>", &stackprint.UpdateNoteOpts{
    NoteParams: optional.NewInterface(stackprint.NoteParams{
        Text: "Hi from Stackprint!",
    }),
})
```

## Delete an object

```go
response, err := client.NoteApi.DeleteNote(auth, "<id>")
```