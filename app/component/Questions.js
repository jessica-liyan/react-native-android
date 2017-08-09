import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';

const sections = [{
  q:'协助准备公司成立相关资料，提供数据，政策参考？',
  a:'常见问题描述的文字内容，后台可编辑。常见问题描述的文字内容，后台可编辑。'
},{
  q:'常见问题描述的文字内容，后台可编辑？',
  a:'常见问题描述的文字内容，后台可编辑。常见问题描述的文字内容，后台可编辑。'
},{
  q:'一定需要登录吗？登录后有什么好处？',
  a:'常见问题描述的文字内容，后台可编辑。常见问题描述的文字内容，后台可编辑。'
},{
  q:'能支持货取消订单吗？',
  a:'常见问题描述的文字内容，后台可编辑。常见问题描述的文字内容，后台可编辑。'
},{
  q:'常见问题描述的文字内容，后台可编辑？',
  a:'常见问题描述的文字内容，后台可编辑。常见问题描述的文字内容，后台可编辑。'
}]

export default class Questions extends Component {
  constructor(props){
    super(props)
  }

  _renderHeader(section,key) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{key+1}.{section.q}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText} includeFontPadding={false}>{section.a}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
        <Accordion
          sections={sections}
          underlayColor='#ccc'
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
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
  content:{
    backgroundColor:'#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth:1,
    borderColor:'#EBEBEB',
    alignItems:'center'
  },
  contentText:{
    fontSize: 14,
    color:'#999',
  },
});
