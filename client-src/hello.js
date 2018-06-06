import React, { Component } from 'react'
import io from 'socket.io-client'

export default class HelloComponent extends Component {
  constructor (props) {
    super(props)
    this.state = { message: 'here is the message' }
  }
  componentDidMount () {
    this.setState({ message: 'new message' })
    var socket = io({ autoConnect: false })
    socket.on('connect', conn => {
      console.log('connected', conn)
    })
    socket.on('welcome', message => {
      console.log('welcome', message)
      this.setState({ message: message })
    })
    socket.connect()
  }
  render () {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
}
