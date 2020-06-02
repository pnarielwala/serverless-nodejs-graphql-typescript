# Step 1

First we want to get our local setup with Typscript, NodeJS, and AWS Serverless Lambda (offline)

<!--
1. [Create a project directory](#create_a_project_directory)
1. [Init package.json file](#init_package.json_file)
1. [Add typescript dependency](#init_package.json_file)
1. [Create weback.config.js](#init_package.json_file)
1. [Create a handler.ts file](#init_package.json_file)
1. [Create serverless .yml file](#init_package.json_file)
1. [Start serverless offline](#init_package.json_file)
-->

## 1. Create a project directory

Create a folder in which your project will reside, then enter the new directory.

```bash
$ mkdir graphql-nodejs
$ cd graphql-nodejs
```

## 2. Init packagejson file

To start off the project, let's initialize the package.json file which handles our dependencies, scripts, and other helpful metadata

```bash
# yarn
$ yarn init -y

# npm
$ npm init -y
```

The `-y` argument skips the questions asked to customize the file.

## 3. Add typescript dependency

In this project, we'll be working with Typescript so we'll have to add support for that.

```bash
# yarn
$ yarn add -D typescript

# npm
$ npm install -D typescript
```

Create a tsconfig.json file and add the the following json to it

```json
{
  "compilerOptions": {
    "preserveConstEnums": true,
    "strictNullChecks": true,
    "sourceMap": true,
    "allowJs": true,
    "target": "es5",
    "moduleResolution": "node",
    "lib": ["es2015"],
    "baseUrl": "src",
    "noEmit": true
  },
  "include": ["src"],
  "exclude": [".webpack"]
}
```

## 4. Create weback.config.js

!! may not have to include webpack with typescript

We'll be using webpack to bundle our code with the serverless webpack plugin

First, let's install some (dev) dependencies

```bash
# yarn
$ yarn add -D webpack serverless-webpack webpack-node-externals ts-loader

# npm
$ npm i -D webpack serverless-webpack webpack-node-externals ts-loader
```

Then we'll create the `webpack.config.js` file in the root of the directory and place the code below in it.

```js
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  // Resolve typescript files
  resolve: { extensions: ['.ts'] },
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  optimization: {
    // We do not want to minimize our code.
    minimize: false,
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  // Run babel on all .ts files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.(ts?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
}
```

`serverless-webpack` is a helpful tool to allow us to ...

`slsw.lib.entries` from the plugin gives us the correct handler entry points at build time regardless if we add/remove serverless functions

## 5. Create a handler.ts file

This handler file will contain the entry point for the lambda function to execute and start a server. This is
where we want to connect to the Apollo Server

First, let's add some dependecies

```bash
$ yarn add graphql apollo-server-lambda
```

Create a `src/` folder and place this code in a `handler.ts` file

```ts
import { ApolloServer, gql } from 'apollo-server-lambda'

const schema = gql`
  type Todo {
    id: ID!
    body: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo!]
  }
`

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {},
})

exports.graphqlHandler = server.createHandler()
```

### 6. Create serverless .yml file

```bash
$ yarn add -D serverless-offline serverless-webpack
```

```yaml
service: graphql-nodejs

# Use the serverless-webpack plugin to transpile ES6
plugins:
  - serverless-webpack
  - serverless-offline

# serverless-webpack configuration
# Enable auto-packing of external modules
custom:
  webpack:
    webpackConfig: ./webpack.config.js
    includeModules: true

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: us-east-1

functions:
  graphql:
    handler: src/handler.graphqlHandler
    events:
      - http:
          path: graphql
          method: post
          cors: true
          integration: lambda-proxy
      - http:
          path: graphql
          method: get
```

## 7. [Finally] Start serverless offline

```bash
$ serverless offline start
```

[insert image of what it looks like if it is working]

Go to `http://localhost:3000/dev/graphql` (if playground shows up but the right side shows an error, make sure the url in the playground
points to `http://localhost:3000/dev/graphql` as well)
