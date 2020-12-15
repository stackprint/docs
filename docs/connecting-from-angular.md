---
title: Connecting from Angular Apps
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section you'll learn how to connect to your Stackprint API from [Angular](https://angular.io) apps with generated client code. The shown code examples are based on generated client code for an API deployed from the default API configuration and the **Note** resource. For your API and object types, the names of services, functions and parameters will likely be different.

:::note
Generated client code is compatible with Angular 9.0.0+. Please make sure to upgrade your project if you're still using an older version of Angular.
:::

A full example Angular application that connects to a Stackprint API can be found on [GitHub](https://github.com/stackprint/example-notes-angular).

## Setup

- On your [Stackprint Dashboard](https://console.stackprint.io) click **Generate client code** under your API and select **Angular (TypeScript)** to generate Angular client code for that API and download it
- Extract the downloaded archive to **<angular_project_folder>/gen/typescript-angular-client**
- In your **app.modules.ts** add the following code:

```typescript
import { ApiModule } from 'gen/typescript-angular-client';
...
@NgModule({
  imports: [
    ...
    ApiModule,
    HttpClientModule
  ],
  ...
})
```

- In any component you can now inject generated services for managing different object types:

```typescript
import { NoteService } from 'gen/typescript-angular-client';
‍
export class AppComponent {

  constructor(private noteService: NoteService) {
  }
  ...
}
```

### Authentication

Adding authentication tokens to requests to your Stackprint API can be done using interceptors. The following example assumes that your app contains an **AppService** with a method `getTokenSilently$()` that retrieves a valid token. You can find an example implementation for such a service based on Auth0 [here](https://github.com/stackprint/example-notes-angular/blob/master/src/app/auth.service.ts).

```typescript
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getTokenSilently$().pipe(
      mergeMap((token) => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(tokenReq);
      }),
      catchError((err) => throwError(err))
    );
  }
}
```

## Create an object

```typescript
const noteParams: NoteParams = {
  text: "Hello from Stackprint!",
};
this.noteService.createNote({ noteParams }).subscribe();
```

## Get an object

```typescript
this.noteService.getNote({ id: "<id>" }).subscribe(note -> {
    // do sth with note
});
```

## List objects

```typescript
this.noteService.listNotes({}).subscribe(notes -> {
    // do sth with notes
});
```

### Filter

```typescript
this.noteService.listNotes({ author: "me" }).subscribe(notes -> {
    // do sth with notes
});
```

### Sort

```typescript
this.noteService.listNotes({ sort: "author:asc" }).subscribe(notes -> {
    // do sth with notes
});
```

### Paginate

```typescript
this.noteService.listNotes({ skip: 10, limit: 10 }).subscribe(notes -> {
    // do sth with notes
});
```

## Update an object

```typescript
const noteParams: NoteParams = {
  text: "Hi from Stackprint!",
};
this.noteService.updateNote({ id: "<id>", noteParams }).subscribe();
```

## Delete an object

```typescript
this.noteService.deleteNote({ id: "<id>" }).subscribe();
```
