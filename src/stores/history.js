import {observable, action} from 'mobx';
import {Uploader} from "../models";
import {message} from 'antd'

class HistoryStore {
  @observable list = [];
  @observable isLoading = fasle;
  @observable hasMore = true;
  @observable page = 0;
  limit = 10;

  @action append(newList) {
    this.list = this.list.concat(newList)
  }

  @action find() {
    this.isLoading = true;
    Uploader.find({page: this.page, limit: this.limit})
        .then(newList => {
          this.append(newList)
          if(newList.length < this.limit){
            this.hasMore = false
          }
        }).catch(error => {
      message.error('数据加载失败')
    }).finally(() => {
      this.isLoading = false
    })
  }
}


export default new HistoryStore();