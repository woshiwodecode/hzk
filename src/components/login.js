import React, { Component } from 'react'
import { Flex, NavBar, Button, WingBlank, List, InputItem, Toast } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
import axios from '../utils/http.js'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    changeInputVal = (key, val) => {
        this.setState({
            // ES6-> 对象的key是变量  [key]
            [key]: val
        })
    }
    // 点击登录按钮
     handleLogin = async () => {
        const { data, meta: { status, msg }} = await axios.post('/users/login', {
            uname: this.state.uname,
            pwd: this.state.pwd
        })
        if (status === 200) {
            // 如果组件是路由匹配到的,此时props
            const { history } = this.props
            history.push('/')
            window.localStorage.setItem('token', data.token)
            window.localStorage.setItem('uid', data.uid) // 在聊天页判断当前发送信息者是否为登陆者本身
        }
        Toast.success(msg, 3)
    }
    render() {
        return <div>
          <WingBlank size="sm">
            <Flex direction={'column'} justify={'center'}>
            <Flex.Item>
                <NavBar>登录</NavBar>
            </Flex.Item>
            <Flex.Item>
                <List>
                <InputItem value={this.state.uname} onChange={val => {
                    this.changeInputVal('uname', val)
                }}>姓名</InputItem>
                <InputItem value={this.state.pwd} onChange={val => {
                    this.changeInputVal('pwd', val)
                }}>密码</InputItem>
                </List>
                <Button type="primary" onClick={this.handleLogin}>登录</Button>
            </Flex.Item>
            </Flex>
          </WingBlank>
        </div>
    }
}

export default Login
