
import React, { Component } from 'react'
import { NavBar, Icon, Tabs } from 'antd-mobile'
import Loader from './loader'

const tabs = [{ title: '资讯' }, { title: '头条' }, { title: '问答' }]
class News extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  changeTab = (tab, index) => {
    switch(index) {
      case 0:
      this.tab1(1)
      break

      case 1:
        this.tab2(2)
        break

      case 2:
        this.tab3(3)
        break
      default:
        break

    }
  }
  tab1 = (type) => {
    return <Loader type={type} />
  }
  tab2 = (type) => {
    return <Loader type={type} />
  }
  tab3 = (type) => {
    return <Loader type={type} />
  }
  render() {
    const { title } = this.props

    return <div  style={{ height: '100%' }}>
      {/* 导航 */}
      <NavBar mode="light">
          <span>{title}</span>
      </NavBar>
      {/* Tabs */}
      <Tabs
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          this.changeTab(tab, index)
        }}
        onTabClick={(tab, index) => {}}
      >
        {this.tab1(1)}
        {this.tab2(2)}
        {this.tab3(3)}
      </Tabs>
    </div>
  }
}

export default News
