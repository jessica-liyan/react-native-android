import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import store from 'react-native-simple-store';

var options = {
    //底部弹出框选项
    title:'更改头像',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'相机',
    chooseFromLibraryButtonTitle:'相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}

export default class ChangeHeadPic extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      avatarSource:null
    }
    store.get('userInfo').then(res => {
      console.log(res)
      this.setState({
        id: res.userId,
        avatarSource: res.headPic
      })
    })
    console.log(ImagePicker)
    this._imagePicker = this._imagePicker.bind(this)
  }

  _imagePicker(){
    ImagePicker.showImagePicker(options, (res) => {
      console.log('res = ', res);
      if (res.didCancel) {
        console.log('点击了取消');
      }
      else if (res.error) {
        console.log('出现错误：', res.error);
      }
      else if (res.customButton) {
        console.log('自定义按钮：', res.customButton);
      }
      else {
        if (Platform.OS === 'android') {
          source = res.uri;
        } else {
          source = res.uri.replace('file://','');
        }
        // let source = { uri: 'data:image/jpeg;base64,' + res.data };

        this.setState({
          avatarSource: source
        });
        store.update('userInfo',{
          headPic: this.state.avatarSource
        })
        Actions.SetHeadPic()
      }
    });
  }

  render() {
    return (
      <TouchableOpacity style={{backgroundColor:'#333',flex:1,alignSelf:'center',justifyContent:'center'}} onPress={this._imagePicker}>
        <Image source={{uri: this.state.avatarSource}} style={styles.headImg} />
      </TouchableOpacity>
    );
  }
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headImg:{
    width: width,
    height: 200,
  }
});
