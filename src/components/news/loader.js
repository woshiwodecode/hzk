import React, { Component } from 'react'
import { Badge, Card, Button, Modal  } from 'antd-mobile'
import Tloader from 'react-touch-loader'
import './tab.css'
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

const AnswerCom = props => {
  const { list, changeHasMore } = props
  // 初始化模态框
  const prompt = Modal.prompt
  const showModal = () => {
    prompt(
      '请输入问题',
      '',
      [
        { text: 'Cancel' },
        {
          text: 'Submit',
          onPress: async value => {
            // console.log(`输入的内容:${value}`)
            // 发送请求 ->添加一条数据
            await axios.post(`infos/question`, {
              question: `${value}`
            })
            // 添加成功 -> 修改的是父组件的hasMore->子传父
            changeHasMore(1)
          }
        }
      ],
      'default',
      'HellHydia'
    )
  }

  const answerTempalte = list.map((item, i) => {
    return (
      <Card key={i}>
        <Card.Body>
          <div>{item.question_name}</div>
        </Card.Body>
        <Card.Footer
          content={item.question_tag}
          extra={<Badge text={item.answer_content} style={badgeStyleObj} />}
        />
      </Card>
    )
  }

  )

  return (
    <div>
      <Button
        size="small"
        type="warning"
        icon="check-circle-o"
        onClick={showModal}
      >
        发布问题
      </Button>

      {answerTempalte}
    </div>
  )
}
class Loader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagenum: 0,
      pagesize: 2,
      type: 1,
      list: [],
      // loadmore数据

      hasMore: 1,
      initializing: 1
    }
  }
  changeHasMore = argv => {
    // console.log(argv)
    this.setState({
      hasMore: argv
    })
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

  refresh = (resolve, reject) => {
    // console.log('下拉刷新-----')
    this.setState(
      {
        pagenum: 0
      },
      async () => {
        const { data } = await this.getData()
        this.setState(
          {
            list: data
          },
          () => {
            // 在刷新之后->resolve()
            resolve()
          }
        )
      }
    )
  }

  loadMore = resolve => {
    // console.log('加载更多----')
    // pagenum 0 1 2 3 4 5 6 7
    // 12  |  34  | 56  | 78
    //pagesize   2      2     2     2
    //pagenum    0   |  2   |  4  |  6

    // 2 = 2 + 0
    // 请求新数据 -> 修改pagenum | pagesize->this.getData

    this.setState(
      {
        pagenum: this.state.pagenum + this.state.pagesize
      },
      async () => {
        // console.log(this.state.pagenum)
        const { data } = await this.getData()
        // 取出原来的list
        let list = [...this.state.list]
        list = [...this.state.list, ...data]
        this.setState(
          {
            list,
            hasMore: this.state.pagenum < this.state.total - this.state.pagesize
          },
          () => {
            // 在加载更多完成后->resolve
            resolve()
          }
        )
      }
    )
  }

  async componentDidMount () {
    const { type } = this.props
    this.setState({
      type
    }, async () => {
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
    })
    console.log(this.state.type)
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
    // console.log(this.props)

    return (
      <div>
         <Tloader
          className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={this.state.hasMore}
          initializing={this.state.initializing}
        >
        {this.state.type !== 3 ? (
        <NewsOrTopComponent list={this.state.list} />
      ) : (
        <AnswerCom
          list={this.state.list}
          changeHasMore={this.changeHasMore}
        />)}
        </Tloader>
      </div>

    )
  }
}

export default Loader
