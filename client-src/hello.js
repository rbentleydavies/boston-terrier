import React, { Component } from 'react'

export default class HelloComponent extends Component {
  componentDidMount () {
    this.isLoaded = true
  }
  render () {
    return (
      <div>
        HELLO WORLD!!!
      </div>
    )
  }
}
