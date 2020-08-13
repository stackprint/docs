---
title: Connecting with curl
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[curl](https://curl.haxx.se/) is a convenient tool to make http requests from the command line. It's perfect for quickly testing your Stackprint APIs.

## Authentication

### API keys

Add the `API-Key` header with your API key as value to your request.

Example:

```bash
curl -H "Accept: application/json" \
    -H "API-Key: <api key>" \
    https://p.stackprint.io/<api-path>/notes/<id>
```

### JSON Web Tokens

Append the `Authorization` header with the token as bearer scheme value:

Example:

```bash
curl -H "Accept: application/json" \
    -H "Authorization: Bearer <token>" \
    https://p.stackprint.io/<api-path>/notes/<id>
```

## Create an object

```bash
curl -H "Content-Type: application/json" \
    -H "API-Key: <api key>" \
    -d "{ \"text\": \"Hello from Stackprint!\", \"author\": \"me\" }" \
    https://p.stackprint.io/<api-path>/notes
```

## Get an object

```bash
curl -H "Accept: application/json" \
    -H "API-Key: <api key>" \
    https://p.stackprint.io/<api-path>/notes/<id>
```

## List objects

```bash
curl -H "Accept: application/json" \
    -H "API-Key: <api key>" \
    https://p.stackprint.io/<api-path>/notes
```

### Filter

```bash
curl -G -H "Accept: application/json" \
    -H "API-Key: <api key>" \
    https://p.stackprint.io/<api-path>/notes \
    -d author=me
```

### Sort

```bash
curl -G -H "Accept: application/json" \
 -H "API-Key: <api key>" \
 https://p.stackprint.io/<api-path>/notes \
 -d sort=author:asc
```

### Paginate

```bash
curl -G -H "Accept: application/json" \
 -H "API-Key: <api key>" \
 https://p.stackprint.io/<api-path>/notes \
 -d offset=1 \
 -d limit=1
```

## Update an object

```bash
curl -X PUT -H "Content-Type: application/json" \
    -H "API-Key: <api key>" \
    -d "{ \"text\": \"Hi from Stackprint!\", \"author\": \"me\" }" \
    https://p.stackprint.io/<api-path>/notes/<id>

```

## Delete an object

```bash
curl -X DELETE -H "Accept: application/json" \
    -H "API-Key: <api key>" \
    https://p.stackprint.io/<api-path>/notes/<id>
```
