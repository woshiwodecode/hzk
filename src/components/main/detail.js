import React, { Component } from 'react'

import { NavBar, Icon, Card, Badge } from 'antd-mobile'

import axios from '../../utils/http'

const thumbStyleObj = {
    width: '125px',
    height: '95px'
  }

  const badgeStyleObj = {
    marginLeft: 12,
    padding: '0 3px',
    backgroundColor: '#fff',
    borderRadius: 2,
    color: '#f19736',
    border: '1px solid #f19736'
  }

  class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailData: []
        }
    }
    // 详情页后退功能
    backToMain = () => {
      console.log(this.props)
      const { history } = this.props
      history.goBack()
    }
    async componentDidMount() {
      const {
        location: {
          state: {
            params: { home_type }
          }
        }
      } = this.props
      console.log(this.props )
      const {
        data,
        meta: { status }
      } = await axios.post('homes/list', { home_type })

      if (status === 200) {
        this.setState(
          { detailData: data },
          () => {
            console.log(this.state.detailData)
          }
        )
      }
    }
    render() {
      const {
        location: {
          state: {
            params: { title }
          }
        }
      } = this.props

      // 菜单1-4详情页
      const detailTemplate = this.state.detailData.map((item, i) => {
        return (
          <Card key={i}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyleObj}
              extra={
                <div>
                  <Badge text={item.home_name} style={badgeStyleObj} />
                  <Badge text={item.home_desc} style={badgeStyleObj} />
                  <Badge text={item.home_tags} style={badgeStyleObj} />
                  <Badge text={item.home_price} style={badgeStyleObj} />
                </div>
              }
            />
          </Card>
        )
      })
      return (
        <div>
          {/* 顶部导航 */}
          <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.backToMain}
          >{title}</NavBar>
          {/* 中部详情 */}
          {detailTemplate}
      </div>
      )
    }
  }

  export default Detail
