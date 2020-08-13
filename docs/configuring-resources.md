---
title: Configuring resources
---

import useBaseUrl from '@docusaurus/useBaseUrl';

export const AttributeType = ({children}) => (
<span className="attribute-type">
{children}
</span>
);

In this section you'll learn how to configure the resources that your API will manage. You will get to the resource configuration page after creating your API or by clicking **Configure resources** under an existing API on your [Stackprint Dashboard](https://console.stackprint.io).

### Resources

Resources represent the types of objects that your API can manage. Each resource can have a different schema that defines the structure of objects and different authorization rules that determine which users have access.

The default Stackprint API resource configuration includes one resource **Note**. For a more complex API, for example a team chat, it makes sense to define more resources such as **Channel**, **Thread** and **Message** with different schemas and authorization rules.

For each defined resource, Stackprint will create the following endpoints:

| Method | Path                              | Description         |
| ------ | --------------------------------- | ------------------- |
| POST   | /&lt;resource-path&gt;            | Create a new object |
| GET    | /&lt;resource-path &gt;           | List objects        |
| GET    | /&lt;resource-path&gt;/&lt;id&gt; | Get a single object |
| PUT    | /&lt;resource-path&gt;/&lt;id&gt; | Update an object    |
| DELETE | /&lt;resource-path&gt;/&lt;id&gt; | Delete an object    |

### Authentication and permissions

Before adapting the API Descriptor for your API, it's important to understand how authentication works for requests to your Stackprint API and how it is determined which users can perform certain operations. Stackprint supports authenticating requests with API keys and [JSON Web Tokens](https://jwt.io).

#### API keys

At this point access to your Stackprint API with API keys is limited to the admin API key for your API that can be found on your [Stackprint Dashboard](https://console.stackprint.io). API keys are expected to be passed in the `API-Key` request header. Example: `API-Key: 85b7a9c...`.

#### JSON Web Tokens

Authenticating requests with JSON Web Tokens has to be configured when [creating your API](creating-an-api.md#jwt-authentication). JSON Web tokens are expected to be passed using the bearer scheme in the `Authorization` request header. Example: `Authorization: Bearer eyJhbGc...`.

#### Identities

After a valid API key or JWT has been found for an incoming request to your Stackprint API, either are mapped to an Identity. Identities contain basic information on the subject that made the request. Identities contain the collowing fields:

`user` The subject's user id.

`organisation` The id of the organisation the subject is part of.

`admin` Whether or not the subject is an administrator.

For an admin API key the associated Identity looks like this:

```yaml
user: admin
organisation: admin
admin: true
```

For JSON Web Tokens, the Identity is being determined based on the token's [claims](https://auth0.com/docs/tokens/concepts/jwt-claims) and the [Identity field mapping](creating-an-api.md#identity-fields) that has been provided when creating your API.

The purpose of Identities is to be able to define authorization rules for your resources independently from the authentication method that a subject has been using.

After determining the Identity of the subject making a request to your API, it is being checked against the resource's authorization rules. If the Identity satisfies a rule, the request succeeds.

### API Descriptor

You create and change resources for your API by adapting the API Descriptor using the editor on the **Configure resources** page for your API. The API Descriptor follows the [YAML](https://yaml.org/) syntax.

![Configure resources](/img/getting-started/configure-resources.png)

When adapting the API Descriptor, the live preview on the right of the page will automatically update and display the endpoints that will be deployed. If your API Descriptor is invalid, an error message will indicate the issue. Your API Descriptor will only be persisted and your changes will only be deployed when you click **Deploy**.

For your changes to the API Descriptor to be deployed, the given API Descriptor needs to be valid. In the following you'll find a complete outline of the expected format.

#### The API Descriptor object

The API Descriptor object is the root object that holds all relevant information for initially deploying or updating a Stackprint API.

##### Attributes:

###### resources <AttributeType>array of [Resource](#the-resource-object)</AttributeType>

This array contains the configurations for resources that your API will manage.

#### The Resource object

The resource objects holds all relevant information for deploying a single resource.

Example:

```yaml
name: Note
path: notes
schema:
  properties:
  id:
    type: string
  author:
    type: string
  text:
    type: string
  required:
    - author
    - text
  additionalProperties: false
auth:
  rules:
    - allow: user
      in: author
      operations: all
```

##### Attributes:

###### name <AttributeType>string</AttributeType>

The resource name, this will appear in the SwaggerUI documentation for your API and is used to create data classes when generating client code.

Example: `Note`

###### path <AttributeType>string</AttributeType>

The path under which the endpoints for managing the resource will be available. The path needs to be unique within your API.

Example: `notes`

###### schema <AttributeType>object</AttributeType>

The schema that objects for this resource need to follow. The given object is expected to be a valid [JSON Schema](https://json-schema.org/).

:::note
Referencing external schemas with `$ref` is not supported at this point.
:::

Every schema definition should include a required property **id** of type `string`. If the property is not explicitly specified, it will be automatically appended to the schema on deployment.

For every request to create a new object for this resource, the sent payload will be checked against the given resource schema. The object will only be successfully created if schema validation succeeds.

Example:

```yaml
properties:
  id:
    type: string
  author:
    type: string
  text:
    type: string
required:
  - id
  - author
  - text
additionalProperties: false
```

###### auth <AttributeType>[Authorization](#the-authorization-object)</AttributeType>

The authorization configuration for the resource.

#### The Authorization object

The authorization object holds configuration that determines how subjects are authorized to perform operations on objects of this resource.

##### Attributes:

###### rules <AttributeType>array of [Authorization Rule](#the-authorization-rule-object)</AttributeType>

This array contains rules that determine which subjects can perform operations on resource objects.

For a subject to be allowed to perform an operation on an object, the conditions of at least one rule granting permission to perform that operation need to be fulfilled for the subject.

#### The Authorization Rule object

An authorization rule specifies under which conditions a subject will be granted access to perform certain operations on resource objects.

Rules are specified based on a subject's Identity which is determined either from an API key or JWT included in a request and the [Identity fields](creating-an-api.md#identity-fields) specified during API creation.

Example:

```yaml
allow: user
in: author
operations: all
```

##### Attributes:

###### allow <AttributeType>string</AttributeType>

Determines which subjects this rule applies for. Valid values are:

`user` The rule applies to a single subject.

`organisation` The rule applies to all subhects of an organisation.

`authenticated` The rule applies to all authenticated subjects.

`admin` The rule only applies to administrators.

`public` The rule grants universal access, authentication is not required.

###### in <AttributeType>string</AttributeType>

Only required if **allow** is either `user` or `organisation`.

Specifies which object property contains the user id or organisation id. That value will be compared against the value of the subject's Identity.

Example: `author`

###### operations <AttributeType>array of string | `all` </AttributeType>

The operations to allow on resource objects. Can either be `all` to gratn access to all operations or an array containing the following values:

`create` Allow the subject to create new objects.

`read` Allow the subject to read objects.

`update` Allow the subject to update objects.

`delete` Allow the subject to delete objects.

If you're experiencing any issues when configuring resources through the API Descriptor, please [let us know](mailto:support@stackprint.io).
