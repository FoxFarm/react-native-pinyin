/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {SearchResultData} from "./SearchResultData";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let c = ["我不是大神", "整理好", "即撒谎的", "撒的", "ds而为a",
    "sweet", "恶趣味威个", "wedge", "让我欺负", "额外", "委屈发DVD等科技的发达 ", "大大说的", "大大说的", "的撒的撒的", "大大说的",
    "重庆大", "重庆大、效", "重庆中大", "重庆我企鹅大", "重庆而且我大", "重庆而且我大"];
type Props = {};
let list = [];
import {CNPinyinIndexFactory, CNPinyinFactory} from 'rn-pinyin'
export default class App extends Component<Props> {
    constructor() {
        super();
        for (let i = 0; i < c.length; i++) {
            list.push(new SearchResultData(c[i]));
        }
        this.arrayList = new CNPinyinFactory().createCNPinyinList(list);
    }
    tweenSprite(keywork) {
        this.arrResult = (new CNPinyinIndexFactory().indexList(this.arrayList, keywork))
        alert(JSON.stringify(this.arrResult))
    }
  render() {
    return (
      <View style={styles.container}>
          <TextInput style={{
          fontSize: 15,
          height: 46,
          padding: 0,
          flex: 1
          }}
          placeholder="输入联系人姓名检索对话"
          onChangeText={this.tweenSprite.bind(this)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
