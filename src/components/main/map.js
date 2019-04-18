import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      H: 0,
      xy: [
        {
          x: 116.43244,
          y: 39.929986
        },
        {
          x: 116.424355,
          y: 39.92982
        },
        {
          x: 116.423349,
          y: 39.935214
        },
        {
          x: 116.350444,
          y: 39.931645
        },
        {
          x: 116.351684,
          y: 39.91867
        },
        {
          x: 116.353983,
          y: 39.913855
        },
        {
          x: 116.357253,
          y: 39.923152
        },
        {
          x: 116.349168,
          y: 39.923152
        },
        {
          x: 116.354954,
          y: 39.935767
        },
        {
          x: 116.36232,
          y: 39.938339
        },
        {
          x: 116.374249,
          y: 39.94625
        },
        {
          x: 116.380178,
          y: 39.953053
        }
      ]
    }
  }
  backToMain = () => {
    // console.log('backto----')
    const { history } = this.props
    history.goBack()
  }
  initMap = () => {
    // console.log(window)
    const BMap = window.BMap

    // 创建地图实例
    let map = new BMap.Map('allmap')
    // 创建点坐标
    let point = new BMap.Point(116.404, 39.915)
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 5)

    // 点聚合代码

    const BMapLib = window.BMapLib

    let markers = []
    let pt = null
    for (let i = 0; i < this.state.xy.length; i++) {
      const xyPoint = this.state.xy[i]
      pt = new BMap.Point(xyPoint.x, xyPoint.y)
      markers.push(new BMap.Marker(pt))
    }
    new BMapLib.MarkerClusterer(map, {
      markers: markers
    })
    // 添加地图控件
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl())
    map.addControl(new BMap.OverviewMapControl())
    map.addControl(new BMap.MapTypeControl())
  }

  componentDidMount() {
    const H = document.documentElement.clientHeight - 45
    this.setState({
      H
    })

    this.initMap()
  }
  render() {
    const {
      location: {
        state: {
          params: { title }
        }
      }
    } = this.props
    return (
      <div>
        {/* 导航 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.backToMain()
          }}
        >
          {title}
        </NavBar>
        {/* 地图 */}
        <div id="allmap" style={{ height: this.state.H }} />
      </div>
    )
  }
}

export default Map
