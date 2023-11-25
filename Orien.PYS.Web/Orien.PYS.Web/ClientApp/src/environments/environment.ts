// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://localhost:7229/",
  authUrl: "https://login.microsoftonline.com/f3c36c01-2952-446d-8eae-28e7f02b7baf/oauth2/v2.0/authorize",
  clientId: "3355635b-4a65-47f2-a2b3-8fedfefd3248",
  scope: "api://a73f2dbb-ce8f-471a-bd47-92364b33d4bd/access_as_user"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
