import React, { Component } from 'react'
import { Badge, Card } from 'antd-mobile'
import { types } from 'util';
import axios from '../../utils/http';


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
const NewsOrTopComponent = props => {
  const { list } = props
  const newsortopTemplate = list.map((item, i) => {
    return (
      <Card key={i}>
        <Card.Header
          thumb="http://127.0.0.1:8086/public/home.png"
          thumbStyle={thumbStyleObj}
          extra={
            <div>
              <Badge text={item.info_title} style={badgeStyleObj} />
              <Badge text={item.info_type} style={badgeStyleObj} />
            </div>
          }
        />
      </Card>
    )
  })
  return <div>{newsortopTemplate }</div>
}


class Loader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagenum: 0,
      pagesize: 2,
      type: 1,
      list: []
    }
  }
  getData = async () => {
    const {data, meta: { status }} = await axios.post('infos/list',{
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize,
      type: this.state.type
    })

    if (status === 200) {
      return data.list
    }
  }
  async componentDidMount () {
    const { total, data } = await this.getData()
    this.setState(
      {
        total,
        list: data
      },
      () => {
        console.log(this.state.list)
      }
    )
  }
  render() {
    const { type } = this.props
    return (
      <NewsOrTopComponent list={this.state.list} />
    )
  }
}

export default Loader
