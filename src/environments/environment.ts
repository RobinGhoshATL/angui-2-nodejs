// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  node_base_href: 'https://nodejs-be-protected.azurewebsites.net/api/',
  base_href: 'https://az-functions-be.azurewebsites.net/api/',
  csharp_base_href: 'https://csharp-be.azurewebsites.net/',
  graph_url: 'https://graph.microsoft.com/beta/',
  tenantId: '<fill>',
  x_functions_key: 'q4b3FC/BOHZKJtVfLyXPa6a9U85UdWXoZAwhoMxR4wlyLqYA8xrOVQ=='
};
