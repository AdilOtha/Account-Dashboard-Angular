// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://dev.floatbot.ai/portal",
  botBuilderUrl: "https://dev.floatbot.ai/portal/floatbot/",
  demoUrl: "https://dev.floatbot.ai/portal/zchannelmanager/hostedbot/",
  usersRoute: "http://localhost:3000/users",
  updatePasswordRoute: "http://localhost:3000/users/update-password",
  billTransactionRoute: "http://localhost:3000/bill-transactions",
  agentsRoute: 'http://localhost:3000/agents',
  chatBotsRoute: 'http://localhost:3000/chatbots',
  chatBotSettingsRoute: "http://localhost:3000/chatbots/settings",
  chatBotUpdateSettingsRoute: "http://localhost:3000/chatbots/update-settings",
  chatBotDeleteRoute: "http://localhost:3000/chatbots/delete",
  subUsersRoute: "http://localhost:3000/sub-users"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
