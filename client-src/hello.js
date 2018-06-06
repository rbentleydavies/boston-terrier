import React, { Component } from 'react'
import io from 'socket.io-client'

export default class HelloComponent extends Component {
  constructor (props) {
    super(props)
    this.state = { message: 'here is the message' }
  }
  componentDidMount () {
    this.setState({ message: 'new message' })
    this.socket = io({ autoConnect: false })
    this.socket.on('connect', conn => {
      console.log('connected', conn)
    })
    this.socket.on('welcome', message => {
      console.log('welcome', message)
      this.setState({ message: message })
    })
    this.socket.connect()
  }
  onTextBox1Change = (event) => {
    console.log('event', event.target.value)
    this.socket.emit('message', event.target.value)
  }
  render () {
    return (
      <div>
        {this.state.message}
        <input id='textBox1' onChange={this.onTextBox1Change} />
      </div>
    )
  }
}
