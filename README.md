# Circles Mobile [![Build Status](https://travis-ci.org/CirclesUBI/circles-mobile.svg?branch=master)](https://travis-ci.org/CirclesUBI/circles-mobile) [![Chat Server](https://chat.joincircles.net/api/v1/shield.svg?type=online&name=Circles%20Chat)](https://chat.joincircles.net)

Circles is a blockchain-based Universal Basic Income implementation. Find out more here:

- [Circles Website](http://www.joincircles.net)
- [Circles Whitepaper](https://github.com/CirclesUBI/docs/blob/master/Circles.md)
- [Circles Chat Server](https://chat.joincircles.net)

## React Native client for Circles

Built with [create-react-native-app](https://github.com/react-community/create-react-native-app) and [AWS Amplify](https://aws.github.io/aws-amplify/) and [TravisCI](https://travis-ci.org/) for building and deploying to [expo](https://expo.io/)

### Environment

We use the `.nvmrc` file to manage the version of node. You can use
[avn](https://github.com/wbyoung/avn) to automatically switch to the appropriate
node version.

### Installation

- `npm install`

- Only Run The Next 3 Lines If You Need To Connect to AWS
- `npm run configure` -> you will need to enter your aws credentials
- `npm run init`
- `npm run pull`
- Run This to Start The Application
- `npm run ios` | `npm start`