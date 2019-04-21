import React, { Component } from 'react'
import { NavBar, Icon, TextareaItem, Button } from 'antd-mobile'
import axios from '../../utils/http'
import './chatwindow.css'

const Chatlist = props => {
  // 详情聊天列表
  let list = props.listContent.map(item => {
    // console.log(item.from_user)
    return (
      <li key={item.id} className={'chat-info-left'}>
        <img src={'http://127.0.0.1:8086/' + item.avatar} alt="" />
        {/* <span className={'name'}>{item.chat_msg}</span> */}
        <span className={'info'}>{item.chat_msg}</span>
        {/* <span className={'time'}>{item.chat_msg}</span> */}
      </li>
    )
  })
  return list
}
class ChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listdata: [], // 聊天内容数据
      msgContent: 'abc',
      currUserName: '' // 显示当前用户名
    }
  }



  backtochat = () => {
    const { changeIsShow } = this.props
    // console.log(changeIsShow)
    changeIsShow(false)
  }

  componentDidMount = async () => {
    console.log(this.props)
    const {item: {username, from_user, to_user}} = this.props
    this.setState({
      currUserName: username
    })
    // 获取聊天内容数据
    const { data } = await axios.post('/chats/info', {
      from_user,
      to_user
    })
    console.log(data)
    this.setState({
      listdata: data.list
    })
  }
  // 聊天关闭
  closeChat = () => {
    console.log('关闭聊天')
  }
  // 发送消息
  sendMsg = () => {
    console.log('发送消息')
  }
  // 受控组件
  handleMsgChange = v => {
    this.setState({
      msgContent: v
    })
  }
  render() {
    return (
      <div className="chat-window">
        <NavBar
          className="chat-window-title"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.backtochat}
        >
          <span>{this.state.currUserName}</span>
        </NavBar>
        <div className="chat-window-content">
          <ul>
            <Chatlist listContent={this.state.listdata} />
          </ul>
        </div>
        <div>
          <div className="chat-window-input">
            <TextareaItem
              value={this.state.msgContent}
              onChange={this.handleMsgChange}
              placeholder="请输入内容..."
            />
            <Button type="primary" onClick={this.closeChat}>
              关闭
            </Button>
            <Button onClick={this.sendMsg}>发送</Button>
          </div>
        </div>
      </div>
    )
  }
}
export default ChatWindow
