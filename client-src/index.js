/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import domReady from 'domready'
import Hello from './hello-container'
class App {
  constructor () {
    new Hello('#content')
  }
}

window.domReady = domReady
window.App = App
