import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Moment from 'moment';
import "moment/min/locales";

export default function CardNotification(props) {
  return (
    <View style={styles.notification} key={props.item.time}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ height: 25, width: 25 }} source={require('../../../assets/logo/logo_app.png')} />
          <Text style={{ fontSize: 16, marginLeft: 5,color:'#ff9933', fontWeight: 'bold' }}>HelpHouse</Text>
        </View>
        <Text>{ Moment(props.item.time.toDate()).locale('vi').fromNow()}</Text>
      </View>
      <Text >{props.item.title}</Text>
      <Text style={{ fontSize: 16 }}>{props.item.body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  notification: {
    marginVertical: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  }
})