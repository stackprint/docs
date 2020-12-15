---
title: Quickstart
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section you'll learn how to quickly build and deploy your first REST API with Stackprint and test it with curl.

## Create an API

- On your [Stackprint Dashboard](https://console.stackprint.io) click **Create my first API**
- Enter a name for your API and a unique path
- Click **Continue** to create the API

![Create an API](/img/getting-started/create-an-api.png)

## Configure the API

On the next screen you'll be able to configure the object types that your API will manage through our API Editor. The default configuration defines a `Note` resource with three properties and a permission rule that only allows the author of a note full access.

- Click **Deploy** to deploy your API with the default configuration

![Configure your API](/img/getting-started/configure-resources.png)

## Test your API

After the deployment has completed, you'll see a modal with useful commands to test your API. For the following commands, replace `<your api path>` and `<your api key>` with your API path and the API key that are used in the commands shown in the modal for your API:

- Create a new personal note:

```bash
curl -H "Content-Type: application/json" \
    -H "API-Key: <your api key>" \
    -d "{ \"author\": \"example-author\", \"text\": \"example-text\" }" \
    https://apis.stackprint.io/<your-api-path>/notes
```

- List all personal notes:

```bash
curl -H "Accept: application/json" \
    -H "API-Key: <your api key>" \
    https://apis.stackprint.io/<your-api-path>/notes
```

That's it! You have successfully built and deployed your first API with Stackprint and created your first object.

In the following sections you'll learn more about creating APIs that support JWT authentication, configuring custom object types and supporting more complex access scenarios.
