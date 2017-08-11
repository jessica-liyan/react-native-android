import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import store from 'react-native-simple-store';

export default class MyMessage extends Component {
  constructor(props){
    super(props)
    this.state={
      id:'',
      list: [],
      refreshing:false,
      hasMore:true,
      pageIndex:0
    }
    this.FetchMessage = this.FetchMessage.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  componentDidMount () {
    store.get('userInfo').then(res => {
      console.log(res)
      if(res){
        this.setState({
          id: res.userId
        })
        console.log(this.state.id)
        this.FetchMessage()
      }
    })
  }

  FetchMessage(){
    this.setState({
      refreshing: true
    })
    fetch('http://liuwbox.com/zzbao/app/user/message.htm?userId='+this.state.id+'&limit=10&pageIndex=0', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      console.log(res)
      this.setState({
        list: res.data.messageList,
        refreshing:false,
        hasMore: res.data.messageList.length !== 0,
        pageIndex: this.state.pageIndex + 1
      })
    })
  }

  // 触底加载下一页数据
  onEndReached(){
    console.log('到底了',`当前是第${this.state.pageIndex}页`)
    fetch('http://liuwbox.com/zzbao/app/user/message.htm?userId='+this.state.id+'&limit=10&pageIndex='+this.state.pageIndex+'', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      console.log(res)
      let list = this.state.list.concat(res.data.messageList)
      this.setState({
        list: list,
        refreshing: false,
        hasMore: res.data.messageList.length !== 0,
        pageIndex: this.state.pageIndex + 1
      })
    })
  }

  // 顶部下拉刷新。如果设置onRefresh，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。
  onRefresh(){
  }

  // 顶部状态栏和底部状态栏
  renderFooter(){
    if(this.state.refreshing){
      return null
    }
    if(this.state.hasMore){
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={'#5CACEE'} size={30} animating={true}/>
          <Text style={styles.loadingTxt}>加载中...</Text>
        </View>
      )
    } else {
      return <Text style={styles.noMoreTxt}>没有更多数据了</Text>
    }
  }

  getTime(date){
    return new Date(date).toLocaleDateString()
  }
  render() {
    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        OnEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
        extraData={this.state}
        data={this.state.list}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <TouchableHighlight underlayColor="#ccc" key={index}>
              <View style={styles.row}>
                <Text style={styles.time}>{this.getTime(item.createTime)}</Text>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  row:{
    backgroundColor:'#fff',
    borderColor:'#ededed',
    borderBottomWidth:1,
    padding:10
  },
  time:{
    fontSize:14,
    color:'#999'
  },
  text:{
    fontSize:14,
    color:'#333'
  },
  loading: {
    flexDirection:'row',
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center'
  },
  loadingTxt:{
    fontSize: 14,
    color: '#666',
    paddingLeft:10
  },
  noMoreTxt:{
    fontSize: 14,
    color: '#666',
    padding:10,
    textAlign:'center'
  }
});
