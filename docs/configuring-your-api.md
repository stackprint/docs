---
title: Configuring your API
---

import useBaseUrl from '@docusaurus/useBaseUrl';

export const AttributeType = ({children}) => (
<span className="attribute-type">
{children}
</span>
);

In this section you'll learn how to configure your Stackprint API to expose the endpoints that you need. To configure an API, simply click **Configure** for an API listed on your [Stackprint Dashboard](https://console.stackprint.io).

### Configuring object types

Object types define what kind of objects you will be able to manage with your API. To change the configuration for an existing object type, click **Configure** in the section of the  object type or click **Add type** to create a new object type.

:::note
After changing the configuration of object types, you need to click **Deploy** to deploy your changes and update your API.
:::

Each object type has the following configuration options:

#### Name
The name of an object type which will be used in the documentation that is automatically generated for your API.

#### Path
The path determines where endpoints for the object type will be created. It needs to be unique per API and cannot be changed after creating an object type. The path should be the plural and URL-safe form of the name of your object type, e.g. `/notes`.


#### Object properties
In this section you define all expected properties of objects that belong to this object type. Each object needs to have a property `id` of type `string`. All objects that belong to this object type need to contain all required properties and may contain all properties that are marked as not required.

#### ID prefix
If your API manages a lot of different object types it makes sense to use unique ID prefixes per object type. For example for an object type **Note** it would make sense to use the prefix `n_`. Stackprint will then generate unique object IDs that always start with that prefix, e.g. `n_gh5du6l9`. That enables you or anyone else working with your API to determine the type of an object just by looking at the id.

#### Permissions
In this section you define rules that determine under which conditions users are allowed to access objects that belong to this object type. By default, all users that are administrators have full access to all objects. If a user wants to access an object, at least one of the defined rules needs to grant the user permission.


### Deleting object types
To delete an object type, click **Delete** in the section of the object type. When an object type has been deleted and the changes are being deployed, all objects that exist for the deleted object type will be deleted as well and cannot be recovered.
