
import React, { Component } from 'react'
import { SearchBar, Carousel, Grid, NoticeBar, Card, Badge  } from 'antd-mobile'

import axios from '../../utils/http'


const badgeStyleObj = {
  marginLeft: 12,
  padding: '0 3px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736'
}

const thumbStyleObj = {
  width: '125px',
  height: '95px'
}
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipeData: [],
      menuData: [],
      infoData: [],
      faqData: [],
      houseData: [],
      houseDataChanged: [],
      detailData: [],
      imgHeight: 176,
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      }))
    }
  }
  getMainData = async path => {
    const {
      data, meta: { msg, status }
    } = await axios.post(path)
    if (status === 200) {
      return data.list
    }
  }

  async componentDidMount() {
    // simulate img loading
    // const { data, meta: { msg, status } } = await axios.post(`/homes/swipe`)
    // if (status === 200) {
    //   console.log(data.list)
    //   this.setState({
    //     swipeData: data.list
    //   })
    // }
    // {
    //   const {
    //     data,
    //     meta: { msg, status }
    //   } = await axios.post(`homes/menu`)
    //   console.log(data)
    // }
    const swipeData = this.getMainData('/homes/swipe')
    const menuData = this.getMainData('/homes/menu')
    const infoData = this.getMainData('/homes/info')
    const faqData = this.getMainData('/homes/faq')
    const houseData = this.getMainData('/homes/house')
    const mainData = await Promise.all([swipeData, menuData, infoData, faqData, houseData])
    this.setState(
      {
        swipeData: mainData[0],
        menuData: mainData[1],
        infoData: mainData[2],
        faqData: mainData[3],
        houseData: mainData[4]
      },
      () => {
        // console.log(this.state.menuData)
        // let temp = [...this.state.data]

        let temp = this.state.menuData.map((item, i) => {
          return {
            id: item.id,
            icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
            text: item.menu_name
          }
        })

        let houseDataChanged = this.changeHouseData(this.state.houseData, 2,2,3)
        console.log(houseDataChanged)
        this.setState({
          data: temp,
          houseDataChanged
        })
      }
    )

  }
  // 处理房屋信息返回数据
  changeHouseData = (arr, ...rest) => {
    let arres = []
    for (let index = 0; index < rest.length; index++) {
      const temp = arr.splice(0, rest[index])
      arres.push(temp)
    }
    return arres
  }
  // 点击菜单
  clickMenu = (el, index) => {
    console.log(el, index)
    const { id, text } = el
    switch (id) {
      case 1:
      case 2:
      case 3:
      case 4:
      // 渲染详情组件 -> detail.js<- 改标识<-js改标识<编程式导航
        // 必须用history-<main.js没有
        // <-1. main.js改路由匹配的组件:可以改->tabbar没有
        // <-2. home是路由匹配的-把history传递到main
        const { history } = this.props
        history.push('/detail', { params: { title: text, home_type: id } })
        break

        default:
        break
    }
  }

  render() {
    // 走马灯模板
    const carouselTemplate = this.state.swipeData.map((val, i) => (
      <a
        key={i}
        style={{
          display: 'inline-block',
          width: '100%',
          height: this.state.imgHeight
        }}
      >
        <img
          src={val.original}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'))
            this.setState({ imgHeight: 'auto' })
          }}
        />
      </a>
    ))
    // notice滚动新闻
    const noticeBarTem = this.state.infoData.map((item, i) => {
      return (
        <NoticeBar mode="link" action={<span>去看看</span>} marqueeProps={{ loop: true, style: { padding: '0 16px' } }} key={item.id}>
      {item.info_title}
    </NoticeBar>
      )
    })
    // faq问答
    let faqTem = this.state.faqData.map((item, i) => {
      return (
      <Card key={i}>
        <Card.Header
          title={item.question_name}
          thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
        />
        <Card.Body>
        <Badge text={item.question_tag} style={badgeStyleObj} />
        <Badge text={item.answer_content} style={badgeStyleObj} />
        <Badge text={item.atime} style={badgeStyleObj} />
        <Badge text={item.qnum} style={badgeStyleObj} />

        </Card.Body>
    </Card>
    )
    })
    // faqData中没有标题数据->自己向模板数组中首位加标题
    faqTem = [<b key="faqtitle">好问好答</b>, ...faqTem]

    // house房屋信息
    const houseTemplate = this.state.houseDataChanged.map((item1, i) => {
      // 三次循环
      const houseItemTemplate = item1.map((item2, j) => {
        return (
          <Card key={j}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyleObj}
              extra={
                <div>
                  <Badge text={item2.home_name} style={badgeStyleObj} />
                  <Badge text={item2.home_desc} style={badgeStyleObj} />
                  <Badge text={item2.home_tags} style={badgeStyleObj} />
                  <Badge text={item2.home_price} style={badgeStyleObj} />
                </div>
              }
            />
          </Card>
        )
      })
      const titles = ['最新开盘', '二手精选', '组个家']
      return (
        <div key={i}>
          <b>{titles[i]}</b>
          {houseItemTemplate}
        </div>
      )
    })


    return <div>
      {/* 搜索框 */}
      <SearchBar placeholder="Search" maxLength={8} />
      {/* 走马灯 */}
      <Carousel
          autoplay={true}
        infinite>
          {carouselTemplate}
      </Carousel>

      {/* 菜单 */}
      <Grid data={this.state.data}
       activeStyle={false}
       onClick={this.clickMenu} />

      {/* 消息 */}
      {noticeBarTem}

      {/* 问答 */}
      {faqTem}

      {/* 房屋信息 */}
      {houseTemplate}
    </div>
  }
}

export default Main
