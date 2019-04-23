
import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import axios from '../../utils/http'
import ChatWindow from './chatwindow'
import './chat.css'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      isShow: false
    }
  }
  getData = async () => {
    const {
      data,
      meta: { status }
    } = await axios.post(`chats/list`)
    if (status === 200) {
      return data.list
    }
  }
  async componentDidMount() {
    const list = await this.getData()
    console.log(list)

    this.setState({
      list,
      isShow: false
    })
  }
  showChatwindow = item => {
    console.log(item)
    this.setState({
      isShow: true,
      item
    })
  }

  changeIsShow = argv => {
    this.setState({
      isShow: argv
    })
  }
  componentWillUnmount() {
    this.setState = state => {
      return
    }
  }
  render() {
    const { title } = this.props
    console.log(this.props)
    const listContet = this.state.list.map(item => {
      // console.log(item)
      return (
        <li key={item.id} onClick={this.showChatwindow.bind(this, item)}>
          <div className="avarter">
            <img src={item.avatar} alt="avarter" />
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      )
    })
    return (

      <div>
        {this.state.isShow && <ChatWindow changeIsShow={this.changeIsShow} item={this.state.item}/>}
        <NavBar mode="light">
          <span>{title}</span>
        </NavBar>
        <div className="chat-list">
          <ul>{listContet}</ul>
        </div>
      </div>
    )
  }
}
export default Chat
