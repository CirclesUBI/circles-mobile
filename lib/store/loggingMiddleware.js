import { ConsoleLogger } from '@aws-amplify/core'
const logger = new ConsoleLogger('Redux')

const loggingMiddleware = store => next => action => {
  logger.info('dispatching', action.type)
  logger.debug(action)
  let result = next(action)
  logger.debug('next state', store.getState())
  return result
}

export default loggingMiddleware
