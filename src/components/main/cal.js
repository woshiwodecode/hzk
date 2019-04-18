import React, { Component } from 'react'
import { NavBar, Tabs, Icon, Card, Badge, Button, SegmentedControl, List, InputItem } from 'antd-mobile'
import ReactEcharts from 'echarts-for-react'
import './cal.css'
const tabs = [
  { title: '公积金贷款' },
  { title: '商业贷款' },
  { title: '组合贷款' }
]

const formdata = [
  {
    title: '贷款方式',
    content: [
      { key: 1, text: '按房价总额', value: 1 },
      { key: 2, text: '按贷款总额', value: 2 }
    ]
  },
  {
    title: '贷款年限',
    content: [
      { key: 1, text: '10', value: 1 },
      { key: 2, text: '20', value: 2 },
      { key: 3, text: '30', value: 3 }
    ]
  },
  {
    title: '贷款利率',

    content: [
      { key: 1, text: '3.25%', value: 1 },
      { key: 2, text: '9.5折', value: 2 },
      { key: 3, text: '9折', value: 3 }
    ]
  }
]
// 遍历数据
let texts = []
for (let index = 0; index < formdata.length; index++) {
  const item = formdata[index]
  let temp = []
  for (let index = 0; index < item.content.length; index++) {
    const text = item.content[index].text
    temp.push(text)
  }
  texts.push(temp)
}
// 把第二个input插入到表单第二个中
formdata.splice(1, 0, )
// 创建表单组件
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0
    }
  }
  changePrice = (v) => {
    this.setState({
      totalPrice: v
    })
  }
  render() {
     // 视图模板
    let segTemplate = formdata.map((item, i) => {
      return (
          // 三个segment
        <Card.Header
          key={i}
          title={item.title}
          extra={<SegmentedControl values={texts[i]} />}
        />
      )
    })
    segTemplate.splice(1, 0,
    <List key={'inputtotal'}>
    <InputItem
      value={this.state.totalPrice}
      onChange={this.changePrice}
      placeholder="0.00"
      extra="¥"
    >
      贷款总额
    </InputItem>
  </List>)
    return (
      <div>
        <Card>{segTemplate}</Card>
      </div>
    )
  }
}
// 创建echart组件
class MyCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{ value: 500, name: '贷款金额' }, { value: 500, name: '利息' }]
    }
  }
    // 初始化图表数据
    initOption = () => {
      let option = {}
      option = {
        title: {
          text: '计算结果',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['贷款金额', '利息']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.state.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      return option
    }

  componentDidMount() {
    this.initOption()
  }
  // 点击计算
  cal = () => {
    let data = [...this.state.data]
    data[0].value = 1000
    this.setState(
      {
        data
      },
      () => {
        let echarts_instance = this.echarts_react.getEchartsInstance()
        echarts_instance.setOption(this.initOption())
        // let input = this.myRef.current
        // input.focus()
      }
    )
  }
  render () {
    return (
      <div>
          {/* 计算按钮 */}
      <Button onClick={this.cal}>计算</Button>
      <ReactEcharts
        option={this.initOption()}
        ref={e => {
          this.echarts_react = e
        }}/>
      </div>

    )
  }
}
class Cal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{ value: 500, name: '贷款金额' }, { value: 500, name: '利息' }]
    }
  }
  // 详情页后退功能
  backToMain = () => {
    console.log(this.props)
    const { history } = this.props
    history.goBack()
  }

  render () {
    return (
      <div>
        {/* 顶部导航 */}
        <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={this.backToMain}
        >贷款利率计算</NavBar>

        {/* tab切换 */}
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log('onChange', index, tab)
          }}
          onTabClick={(tab, index) => {
            // console.log('onTabClick', index, tab)
          }}
        >
      </Tabs>

      <div>
        {/* tab切换的内容
      1. 表单
      2. 图表
      */}
        <Form />
        <MyCharts />
      </div>

      </div>
    )
  }
}

export default Cal
