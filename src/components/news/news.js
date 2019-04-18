
import React, { Component } from 'react'
import { NavBar, Icon, Tabs } from 'antd-mobile'
import Loader from './loader'

const tabs = [{ title: '资讯' }, { title: '头条' }, { title: '问答' }]
class News extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { title } = this.props
    const Tab1 = () => {
      return <Loader type={1} />
    }
    const Tab2 = () => {
      return <Loader type={2} />
    }
    const Tab3 = () => {
      return <Loader type={3} />
    }
    return <div>
      {/* 导航 */}
      <NavBar mode="light">
          <span>{title}</span>
      </NavBar>
      {/* Tabs */}
      <Tabs
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          console.log('onChange', index, tab)
        }}
        onTabClick={(tab, index) => {}}
      >
        <Tab1 />
        <Tab2 />
        <Tab3 />
      </Tabs>
    </div>
  }
}

export default News
