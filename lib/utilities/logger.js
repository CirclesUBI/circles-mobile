import { ConsoleLogger } from '@aws-amplify/core'

let instance = null

class Logger extends ConsoleLogger {  
  constructor () {
    super()
    if (!instance) {
      instance = this
    }

    // to test whether we have singleton or not
    this.time = new Date()

    return logger;
  }
}



const logger = new Logger('App')

export default logger
