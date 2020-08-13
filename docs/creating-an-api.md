---
title: Creating an API
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section you'll learn how to create a new API with Stackprint and configure supported authentication schemes. To start the API creation wizard, simply click **New API** button on your [Stackprint Dashboard](https://console.stackprint.io).

## General

When creating a new API you have to fill in two fields:

#### Name

This is the API name that will be shown on your [Stackprint Dashboard](https://console.stackprint.io). Make it unique so you can easily identify the API you're looking for.

#### Path

The entered path determines under which URL your API will be available once it has been deployed. The URL pattern for Stackprint APIs is `https://p.stackprint.io/<your api path>`. The chosen path needs to be unique.

## Authentication

Stackprint APIs support authenticating requests with API keys and [JSON Web Tokens](https://jwt.io/) (JWTs).

:::note
Currently authenticating with API keys is limited to an APIs admin API key for the purpose of testing and managing your APIs.
:::

### JWT Authentication

To allow authenticating requests to your Stackprint API with [JSON Web Tokens](https://jwt.io/), enable **Allow JWT Authentication**. A few things have to be configured for Stackprint to be able to successfully authenticate requests that include JWTs signed by your identity provider such as [Auth0](https://auth0.com/).

#### Algorithm

Select the algorithm that your token provider uses to sign tokens. If the algorithm that your identity provider is using is not listed, please [let us know](mailto:support@stackprint.io).

:::note Tip
We highly recommend using an asynchronous algorithm such as **RS256**. That way you won't have to share any secrets with Stackprint.
:::

#### JWKS URL

If you have chosen an asynchronous signing algorithm such as RS256, you need to provide the [JSON Web Key Set URL](https://auth0.com/docs/tokens/concepts/jwks) that contains the public keys to verify that JWTs have been issued by your token provider.

#### Secret

If you have chosen a synchronous signing algorithm such as HS256, you need to provide the secret that is being used by your token provider to sign JWTs. Stackprint needs the secret to verify that JWTs of incoming requests have actually been issued by your token provider.

### Identity fields

Identity fields determine which fields of the JWT's [claims](https://auth0.com/docs/tokens/concepts/jwt-claims) map to Stackprint's Identity fields that can later be used for configuring [authorization rules](configuring-resources.md#the-authorization-rule-object).

#### User

Enter the JWT claims field that represents the user id. When using the default JWT format the value here should be `sub`.

#### Organisation

If applicable, enter the JWT claims field that represents a user's organisation id.

#### Administrator

If applicable, enter the JWT claims field that determines if a user should be allowed full access to your Stackprint API.<br/><br/>

Finally, click **Submit** to create your API.
