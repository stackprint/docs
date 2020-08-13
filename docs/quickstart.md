---
title: Quickstart
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section you'll learn how to quickly build and deploy your first REST API with Stackprint and test it with curl.

## Create an API

- On your [Stackprint Dashboard](https://console.stackprint.io) click **Create my first API**
- Enter a name for your API and a unique path
- Click **Submit** to create the API

![Create an API](/img/getting-started/create-an-api.png)

## Configure resources

On the next screen you'll be able to configure the resources that your API will manage by providing an [API Descriptor](configuring-resources.md#api-descriptor). On the right you'll see a live preview of the endpoints that will be created. The default API Descriptor defines a `Note` resource with three properties and an authorization rule that only allows the author of a note full access.

- Click **Deploy** to deploy your API with the default API Descriptor

![Configure resources](/img/getting-started/configure-resources.png)

## Test your API

After the deployment has completed, you'll see a modal with useful commands to test your API. For the following commands, replace `<your api path>` and `<your api key>` with your API path and the API key that are used in the commands shown in the modal for your API:

- Create a new personal note:

```bash
curl -H "Content-Type: application/json" \
    -H "API-Key: <your api key>" \
    -d "{ \"author\": \"example-author\", \"text\": \"example-text\" }" \
    https://p.stackprint.io/<your-api-path>/notes
```

- List all personal notes:

```bash
curl -H "Accept: application/json" \
    -H "API-Key: <your api key>" \
    https://p.stackprint.io/<your-api-path>/notes
```

That's it! You have successfully built and deployed your first API with Stackprint and created your first object.

In the following sections you'll learn more about creating APIs that support JWT authentication, configuring custom resources and supporting more complex access scenarios.
