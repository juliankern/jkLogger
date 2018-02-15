# jkLogger
Simple wrapper for log4js 

## Install
`npm i @juliankern/jkLogger`

## Usage

```javascript
const Logger = require('jkLogger');
const logger = new Logger();

logger.trace('Trace Test!');
logger.debug('Debug Test!');
logger.success('Success Test!');
logger.withStack.success('Success Test (with added stack)!');
logger.info('Info Test!');
logger.warn('Warn Test!');
logger.mark('Mark Test!');
logger.error('Error Test (always with stack)!');
logger.fatal('Fatal Test! (always with stack)');
```
![Screenshot](https://cdn.rawgit.com/juliankern/jkLogger/screenshots/jkLogger.png)