import React, { Component } from 'react'
import { NavBar, Icon, TextareaItem, Button } from 'antd-mobile'
import handle, { IMEvent } from './wsclient'
import axios from '../../utils/http'
import './chatwindow.css'

const Chatlist = props => {
  // 取出当前用户的uid
  const uid = window.localStorage.getItem('uid')
  // 详情聊天列表
  let list = props.listContent.map(item => {
    // console.log(item.from_user)
    return (
      <li key={item.id}
      className={
        // 判断聊天信息左浮动还是右浮动
        item.from_user !== uid * 1 ? 'chat-info-left' : 'chat-info-right'}>
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
      currUserName: '', // 显示当前用户名
      client: null
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
    // console.log(data)
    this.setState({
      listdata: data.list
    })

    // 聊天第一步->建立连接->注册用户
    // 不能随便写->每个ws聊天的服务端代码不一样->使用当前服务端暴露的对象|方法实现ws功能
    const uid = localStorage.getItem('uid')
    // client指的是注册成功的某个用户客户端a
    const client = handle(uid, data => {
      // data指的是服务端转发后返回的消息
      // console.log(data)
      this.reseMsg(data)
    })
    this.setState({
      client
    })
  }
  // 聊天第三步->接收后台返回的消息->把消息渲染在页面上
  reseMsg = data => {
    // console.log(data) // data{content:'对方不在线',type}
    // 这里暂时不知道data的结构->下面的代码->可能有问题
    if (data.content === '对方不在线') {
      return
    }
    // 如果data是对象 data.item->{}

    let listdata = [...this.state.listdata]
    listdata.push(JSON.parse(data.content))
    this.setState({
      listdata
    })
  }
  // 聊天关闭
  closeChat = () => {
    // console.log('关闭聊天')
    const { changeIsShow } = this.props
    // console.log(changeIsShow)
    changeIsShow(false)
  }
  // 发送消息
  sendMsg = () => {
    const { client, msgContent } = this.state
    const {
      item: { from_user, to_user, avatar }
    } = this.props
    // 聊天第二步->发送消息->客户端发送ws的请求
    // http post body
    // ws  发送 消息内容

    // console.log('发送消息')
    let pdata = {
      id: Math.random() + '',
      from_user: from_user,
      to_user: to_user,
      avatar: avatar,
      chat_msg: msgContent
    }
    // emit事件(事件名,消息内容)
    client.emitEvent(IMEvent.MSG_TEXT_SEND, JSON.stringify(pdata))

    // 更新视图
    let listdata = [...this.state.listdata]
    listdata.push(pdata)
    this.setState({
      listdata
    })
  }
  // 受控组件
  handleMsgChange = v => {
    this.setState({
      msgContent: v
    })
  }

  componentWillUnmount() {
    this.setState = state => {
      return
    }
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
