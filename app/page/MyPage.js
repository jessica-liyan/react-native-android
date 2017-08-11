import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';

export default class MyPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
    store.get('userInfo').then(res => {
      console.log(res)
      this.setState({
        data: res
      })
    })
    this.showName = this.showName.bind(this)
  }

  showName(){
    const {data} = this.state
    if(data){
      return <Text style={styles.userName}>{data.userName}</Text>
    }else{
      return (
        <Button
          style={styles.button}
          onPress={() => Actions.Login()}
        >
          登录/注册
        </Button>
      )
    }
  }

  render() {
    const {data} = this.state
    const tabs = [{
      title: '待报价',
      image: require('../image/icon1.png')
    },{
      title: '待付款',
      image: require('../image/icon2.png')
    },{
      title: '待出单',
      image: require('../image/icon3.png')
    },{
      title: '已出单',
      image: require('../image/icon4.png')
    },{
      title: '我的订单',
      image: require('../image/icon4.png')
    }]
    return (
      <View>
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.headWrap} onPress={()=>Actions.ChangeHeadPic()}>
            <Image source={ data? {uri: data.headPic} : require('../image/head.png')} style={styles.headImg}/>
          </TouchableOpacity>
          {this.showName()}
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          {
            tabs.map((item,index) => {
              return (
                <TouchableHighlight key={index} underlayColor="#f5f5f5" style={styles.tabItem}>
                  <View style={{alignItems:'center'}}>
                    <Image source={item.image} style={styles.tabIcon}/>
                    <Text style={styles.tabTit}>{item.title}</Text>
                  </View>
                </TouchableHighlight>
              )
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: '#5CACEE',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  headWrap:{
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headImg:{
    width: 60,
    height: 60
  },
  userName:{
    fontSize: 16,
    color:'#fff',
    marginLeft:40
  },
  button:{
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:4,
    padding:10,
    marginLeft: 40,
    width: 120,
    fontSize:14,
    color:'#fff'
  },
  tabItem:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    paddingVertical:10
  },
  tabIcon:{
    width: 30,
    height: 30
  },
  tabTit:{
    fontSize: 12,
    color:'#999',
    paddingTop:5
  }
});
