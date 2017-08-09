import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import store from 'react-native-simple-store';

export default class OpinionFeedback extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      content:'',
      phone:''
    }
    store.get('userInfo').then(res => {
      if(res){
        console.log(res)
        this.setState({
          id: res.userId
        })
      }
    })
    this.onModify = this.onModify.bind(this)
  }

  // 提交修改的资料（用户名，生日，性别）
  onModify(){
    const {id,content, phone} = this.state;
    if(!content){
      ToastAndroid.show(`请输入反馈意见！`, ToastAndroid.SHORT)
    }else if(!phone){
      ToastAndroid.show(`请输入手机号！`, ToastAndroid.SHORT)
    }else{
      fetch('http://liuwbox.com/zzbao/app/user/feedback.htm?userId='+id+'&content='+content+'&phone='+phone+'', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
        if(res.status == 1){
          ToastAndroid.show('反馈意见已经提交！', ToastAndroid.SHORT)
          setTimeout(()=>{
            Actions.MyPage()
          },1000)
        }else{
          ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.login}>
        <View style={styles.loginWrap}>
          <Text style={styles.loginLabel}>反馈意见</Text>
          <TextInput
            style={[styles.loginInput,{textAlignVertical: 'top',padding:10,height:120}]}
            underlineColorAndroid="transparent"
            placeholder="请输入您的反馈内容和意见"
            multiline={true}
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="default"
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
          />
        </View>
        <View style={styles.loginWrap}>
          <Text style={styles.loginLabel}>联系方式</Text>
          <TextInput
            style={styles.loginInput}
            underlineColorAndroid="transparent"
            placeholder="请输入真实的手机号"
            placeholderTextColor="#ddd"
            selectionColor="#5CACEE"
            keyboardType="numeric"
            onChangeText={(phone) => this.setState({phone})}
            value={this.state.phone}
          />
        </View>
        <Button style={styles.button} onPress={this.onModify.bind(this)}>
          提交
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal: 20
  },
  loginLabel:{
    fontSize:14,
    color:'#999',
    paddingTop:15,
    paddingBottom:10,
  },
  loginTitle:{
    fontSize: 30,
    color:'#5CACEE',
    paddingVertical: 20,
    textAlign: 'center'
  },
  loginWrap:{
    position:'relative',
  },
  loginInput:{
    borderWidth: 1,
    borderColor:'#ddd',
    padding: 0,
    height: 40,
    paddingLeft: 10,
  },
  loginIcon:{
    width:20,
    height:20,
    position:'absolute',
    left:10,
    bottom:10
  },
  loginRight:{
    position:'absolute',
    right:10,
    bottom:10
  },
  loginRightIcon:{
    width:20,
    height:20,
  },
  loginRightTxt:{
    fontSize: 14,
    color: '#5CACEE'
  },
  birthWrap:{
    position:'relative',
    marginTop: 0
  },
  birthText:{
    fontSize: 14,
    color: '#333',
    lineHeight:28,
  },
  button:{
    backgroundColor:'#5CACEE',
    fontSize: 16,
    color: '#fff',
    borderRadius: 6,
    paddingVertical:15,
    marginTop:30,
    fontWeight: 'normal'
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText:{
    fontSize: 14,
    color:'#5CACEE',
    fontWeight: 'normal',
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderColor: '#ddd'
  },
  loginEntry:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    margin: 30,
    position:'absolute',
    left:0,
    right:0,
    bottom:0
  },
  loginEntryTxt:{
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:20,
    marginHorizontal:20
  },
  loginEntryImg:{
    width: 20,
    height: 20,
  },
  radioInput:{
    width:14,
    height:14,
    marginRight:10,
    borderRadius:10,
    borderColor:'#ddd',
    borderWidth:3
  },
  radioInputActive:{
    borderColor:'#5CACEE',
  },
  radioLabel:{
    fontSize:14,
    color:'#666',
  },
  radioLabelActive:{
    color:'#5CACEE',
  }
});

