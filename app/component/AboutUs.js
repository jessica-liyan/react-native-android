import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList
} from 'react-native';
import {Actions} from 'react-native-router-flux';

const links = [{
  key: 0,
  tit: '官方网站',
  info:'http://www.zhizunbao.com/'
},{
  key: 1,
  tit: '新浪微博',
  info:'zhizunbao002'
},{
  key: 2,
  tit: '腾讯微博',
  info:'zhizunbao001'
},{
  key: 3,
  tit: '微信账号',
  info:'http://www.zhizunbao.com/'
}]
const contact = [{
  key: 4,
  tit: '客服电话',
  info:'400 2583 253'
},{
  key: 5,
  tit: '客服邮箱',
  info:'service@zhizunbao.com'
},{
  key: 6,
  tit: '客服电话',
  info:'185248635'
}]

export default class AboutUs extends Component {
  constructor(props){
    super(props)
  }

  hasHeader(index){
    if(index == 0){
      return <Text style={styles.hasHeader}>联系我们</Text>
    }
  }
  render() {
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
        <SectionList
          sections={[ // 不同section渲染不同类型的子组件
            {data: links, key:'a1', renderItem: ({item, index})=> <View style={styles.header}><Text style={styles.headerText}>{item.tit} : {item.info}</Text></View>},
            {data: contact, key:'a2',renderItem:({item, index})=> <View style={styles.content}>{this.hasHeader(index)}<Text style={styles.headerText}>{item.tit} : {item.info}</Text></View>}
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth:1,
    borderColor:'#EBEBEB',
  },
  headerText:{
    fontSize: 14,
    color:'#666'
  },
  hasHeader:{
    paddingTop:20,
    paddingBottom:10,
  },
  content:{
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});
