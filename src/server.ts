import App from './bootstrap.app'
import routes from './Routes'

import * as dotenv from 'dotenv'

dotenv.config()
let path
switch (process.env.NODE_ENV) {
  case 'testing':
    path = `${__dirname}/../../.env.testing`
    break
  case 'unitTesting':
    path = `${__dirname}/../../.env.testing`
    break
  default:
    path = `${__dirname}/../../.env`
}
dotenv.config({ path: path })

const app = new App({
  routes: routes,
  port: process.env.PORT || 3333,
  database: process.env.NODE_ENV !== 'unitTesting',
})

export default app.createApp()
