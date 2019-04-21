import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'

import Main from './main/main'
import News from './news/news'
import Chat from './chat/chat'
import Mine from './mine/mine'

import { tabBarTemplateData } from './tabbardata.json'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'mine',
            hidden: false,
        }
    }
    renderContent(tabTitle) {
        // 判断变化的值->selectKey |
        const key = this.state.selectedTab
        switch (key) {
          case 'main':
            return <Main history={this.props.history}/>
            break
          case 'news':
            return <News title={tabTitle}/>
            break
          case 'chat':
            return <Chat title={tabTitle} />
            break
          case 'mine':
            return <Mine />
            break

          default:
            break
        }
      }
    render() {
        const tabBarTemplate = tabBarTemplateData.map((item, i) => {
            return <TabBar.Item
            title={item.title}
            key={i}
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `${item.icon_bg_url}`}}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `${item.selectedIcon_bg_url}`}}
            />
            }
            selected={this.state.selectedTab === item.selectedPath}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab:  `${item.selectedPath}`,
              });
            }}
          >
          {this.renderContent(item.title)}
          </TabBar.Item>
        })
        return  <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
        {tabBarTemplate}
        </TabBar>
      </div>
    }
}

export default Home
