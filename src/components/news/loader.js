import React, { Component } from 'react'
import { types } from 'util';

class Loader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type } = this.props
    return (
      <div>loader----{type}</div>
    )
  }
}

export default Loader
