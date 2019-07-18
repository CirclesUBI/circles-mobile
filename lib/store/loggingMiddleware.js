import { ConsoleLogger } from '@aws-amplify/core'

const logger = new ConsoleLogger('Redux')

const loggingMiddleware = store => next => action => {
  logger.verbose('dispatching', action.type)
  logger.verbose(action)
  logger.verbose('next state', store.getState())

  return next(action)
}

export default loggingMiddleware
