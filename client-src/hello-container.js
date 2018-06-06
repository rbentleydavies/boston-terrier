import ReactDOM from 'react-dom'
import React from 'react'
import HelloComponent from './hello'

class HelloContainer {
  constructor (container) {
    this.container = container
    if (document.querySelector(container)) {
      Array.prototype.forEach.call(document.querySelectorAll(this.container), (item) => {
        this.render(item)
      })
    }
  }

  render (item) {
    ReactDOM.render(<HelloComponent nodeId={item.dataset.key} />, item)
  }

  destroy () {
    if (document.querySelector(this.container)) {
      Array.prototype.forEach.call(document.querySelectorAll(this.container), item => {
        ReactDOM.unmountComponentAtNode(item)
      })
    }
  }
}

export default HelloContainer
