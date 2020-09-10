import React, { useRef } from 'react';
import { useStores } from '../stores';
import { observer, useLocalStore } from 'mobx-react';
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Dragger } = Upload;


const Result = styled.div`
  margin-top: 30px;
  padding: 20px;
`;
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`;
const Image = styled.img`
  max-width: 300px ;
`;

const YellowDragger = styled(Dragger)`
  .ant-upload {
     background: rgb(102,169,201) !important;
  }
`;



const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const ref1 = useRef();
  const ref2 = useRef();

  const store = useLocalStore(() => ({
    width: null,
    setWidth(width) {
      store.width = width;
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : '';
    },
    height: null,
    setHeight(height) {
      store.height = height;
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : '';
    },
    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }

  }));

  const bindWidthChange = () => {
    store.setWidth(ref1.current.value);
  };

  const bindHeightChange = () => {
    store.setHeight(ref2.current.value);
  };

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      if (UserStore.currentUser === null) {
        message.warning('请先验证身份再上传！');
        return false;
      }
      if (file.size > 2000 * 2000) {
        message.error('为了缓解服务器压力，目前仅支持最大4M大小')
      }
      window.file = file
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif)/ig.test(file.type)) {
        message.error('现仅支持上传png/svg/jpg/gif格式的图片')
        return false
      }
      ImageStore.upload()
          .then((serverFile) => {
            console.log(serverFile);
          }).catch(() => {
      });
      return false;
    }
  };

  return (
      <div>
        <Spin tip="图片上传中..." spinning={ImageStore.isUpoading}>
          <YellowDragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">可以点击或者或者拖拽上传图片</p>
            <p className="ant-upload-hint">
              目前仅支持.png/.gif/.jpg/.svg类型图片，为了缓解服务器压力单张图片大小不得超过8MB
            </p>
          </YellowDragger>
        </Spin>

        {
          ImageStore.serverFile ? <Result>
            <H1>上传结果</H1>
            <dl>
              <dt>线上地址:</dt>
              <dd><a target="_blank"
                     href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
              </dd>
              <dt>文件名:</dt>
              <dd>{ImageStore.filename}</dd>
              <dt>图片预览:</dt>
              <dd>
                <Image src={ImageStore.serverFile.attributes.url.attributes.url}/>
              </dd>
              <dt>自定义尺寸</dt>
              <dd>
                <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
                <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
              </dd>
              <dd>
                <a target="_blank" href={store.fullStr}>{store.fullStr}</a>
              </dd>
            </dl>
          </Result> : null
        }
        <h3>本站可以将图片生成在线地址，并且无压缩源文件生成，方便你在任何地方使用你的图片！</h3>
      </div>
  );
});
export default Component;