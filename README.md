

# Readme 


This application useful for manage task and manage task notification to end user

Using most of Nhost features!!! 

## User registeration
## User singup 
## User authentication

++ This application using another platform for manage notification that is https://web.novu.co/settings

// steps to run application  

1. npm install 
2. app.js below lines with actual domain information 
//@TODO replace subdomain

3.Replace Novu account details in src\services\taskService.js
//@TOdo replace account with Novu
const novu = new Novu("");

4.Replace below value in  src\services\taskService.js
const client = new ApolloClient({
  uri: "https://ABC.nhost.run/v1/graphql",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});