
import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import './index.css'
import axios from '../../utils/http'
import { Grid, Button, Modal, Slider } from 'antd-mobile'

// import AvatarEditor from 'react-avatar-editor'

let gridtext = [
  '看房记录',
  '我的订单',
  '我的收藏',
  '个人资料',
  '身份认证',
  '联系我们'
]

class Modal1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal1: true
    }
    // 创建文件标识
    this.myRef = React.createRef()
  }
  onClose = () => {
    const { closeModal1 } = this.props
    // 获取input中的file图片-?
    const file = this.myRef.current.files[0]
    console.log(file)
    closeModal1(file)
  }
  render () {
    return (
      <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          title="选择图片"
          footer={[{ text: '确定',
            onPress: () => {
              console.log('ok');
              this.onClose();
            }
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <input type="file" ref={this.myRef}/>
        </Modal>
    )
  }
}


class ModalCoreImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalCoreImage: true,
      file: null,
      scale: null
    }

  }
  onClose = () => {
    const { closeModal2 } = this.props

    closeModal2()

  }
  componentDidMount () {
    const { file } = this.props
    this.setState({
      file
    })
  }
  changeScale = (scale) => {
    this.setState({
      scale: scale * 0.1
    })
  }
  render () {
    return (
      <Modal
          visible={this.state.ModalCoreImage}
          transparent
          maskClosable={true}
          title="裁切图片"
          footer={[{ text: '确定',
            onPress: () => {
              console.log('ok');
              this.onClose();
            }
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <AvatarEditor
            image={this.state.file}
            width={150}
            height={150}
            border={50}
            borderRadius={75}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={this.state.scale}
          />
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            defaultValue={10}
            min={10}
            max={20}
            onChange={this.changeScale}
          />
        </Modal>
    )
  }
}

class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      isShow1: false,
      isShow2: false,
      file: null,
      data: Array.from(new Array(6)).map((_val, i) => ({
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      }))
    }
  }

  componentDidMount = async () => {
    // Grid数据修改
    let data = Array.from(new Array(6)).map((item, i) => {
      return {
        id: i + 1,
        icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
        text: gridtext[i]
      }
    })

    this.setState({
      data
    })
  }

  showImageModal = () => {
    this.setState({
      isShow1: true
    })
  }
  closeModal1 = (file) => {
    this.setState({
      isShow1: false,
      file,
      isShow2: file
    })
  }
  closeModal2 = () => {
    this.setState({
      isShow2: false
    })
  }
  render() {
    return (
      <div>
        {this.state.isShow1 && <Modal1  closeModal1={this.closeModal1}/> }
        {this.state.isShow2 && <ModalCoreImage  file={this.state.file} closeModal2={this.closeModal2}/> }
      <div className="my-container">
        <div className="my-title">
          <img src={'http://47.96.21.88:8086/' + 'public/my-bg.png'} alt="me" />
          <div className="info">
            <div className="myicon">
              <img
                onClick={this.showImageModal}
                src={this.state.avatarPath}
                alt="icon"
              />
            </div>
            <div className="name">{this.state.uname}</div>
            <Button>已认证</Button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <Grid
          square
          columnNum={3}
          data={this.state.data}
          isCarousel
          onClick={el => {
            this.selectMenuITtem(el)
          }}
        />

        <div className="my-ad">
          <img src={'http://47.96.21.88:8086/' + 'public/ad.png'} alt="" />
        </div>
        </div>
      </div>
    )
  }
}

export default Mine
