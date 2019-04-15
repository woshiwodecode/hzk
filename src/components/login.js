import React, { Component } from 'react'
import { Flex, NavBar, Button, WingBlank, List, InputItem } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
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
            [key]: val
        })
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
                <Button type="primary">登录</Button>
            </Flex.Item>
            </Flex>
          </WingBlank>
        </div>
    }
}

export default Login
