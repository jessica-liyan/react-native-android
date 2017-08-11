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
  ToastAndroid,
  DeviceEventEmitter,
  NativeModules
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import store from 'react-native-simple-store';
import ImageCropPicker from 'react-native-image-crop-picker/index.d.ts';

// var ImagePicker = NativeModules.ImageCropPicker;

export default class SetHeadPic extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      avatarSource:null
    }
    console.log(NativeModules.ImageCropPicker)
    console.log(ImageCropPicker)
    store.get('userInfo').then(res => {
      console.log(res)
      this.setState({
        id: res.userId,
        avatarSource: res.headPic
      })
    })
    this.updateHeadPic = this.updateHeadPic.bind(this)
    this._ImagePicker = this._ImagePicker.bind(this)
  }

  componentDidMount(){
    this.subscription = DeviceEventEmitter.addListener('updateHeadPic', this.updateHeadPic)
  }

  componentWillUnmount(){
    this.subscription.remove();
  }

  updateHeadPic(){
    const {id, avatarSource} = this.state;
    fetch('http://liuwbox.com/zzbao/app/user/headPic/update.htm?userId='+id+'&userPic='+avatarSource+'', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      console.log(res,'照片上传')
      ToastAndroid.show(res.msg, ToastAndroid.SHORT)
    })
  }

  _ImagePicker(){
    console.log(ImageCropPicker)
    ImageCropPicker.openCamera({
        width: 300, 
        height: 400, 
        cropping: true
    }).then(image => {
        console.log(image);
    });
    // ImageCropPicker.openCropper({
    //   path: this.state.avatarSource,
    //   width: 300,
    //   height: 400
    // }).then(image => {
    //   console.log(image);
    // });
  }

  render() {
    return (
      <TouchableOpacity onPress={this._ImagePicker}>
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
