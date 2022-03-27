import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons ,FontAwesome, FontAwesome5 ,MaterialCommunityIcons } from '@expo/vector-icons';
import { getCurrentUser } from '../../service/getData';
import { auth } from '../../database/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Profile({navigation}) {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [dataUser, setDataUser] = useState([]);
    useEffect(async () => {
        const data = await getCurrentUser();
        setDataUser(data);
    }, [])
    return (

        <SafeAreaView style={styles.container}>
            {
                dataUser && <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity style={{ position: 'absolute', right: 0, margin: 15 }}>
                            <Text style={{ color: 'blue' }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <View style={styles.headerContent}>
                            <Image style={styles.avatar}
                                source={{ uri: dataUser.photoURL }} />
                            <Text style={styles.name}>{dataUser.name}</Text>
                            <Text style={styles.userInfo}>Hộ Gia Đình</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="list-circle-outline" size={35} color={'#ff6600'} />
                            <Text>Đơn đặt</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='circle-edit-outline' size={35} color={'#ff6600'} />
                            <Text>Đang sửa</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome5 name="check-circle" size={35} color={'#ff6600'} />
                            <Text>Đã Xong</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='cancel' size={35} color={'#ff6600'} />
                            <Text>Hủy</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 15 }}>
                        <View style={styles.row}>
                        <FontAwesome name="intersex" size={30} color={'#ff6600'} />
                            <Text style={styles.info}>Giới tính: {dataUser.sex}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name='account-circle-outline' size={30} color={'#ff6600'} />
                            <Text style={styles.info}>Độ Tuổi: {dataUser.age}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name='phone-forward' size={30} color={'#ff6600'} />
                            <Text style={styles.info}>SĐT: {dataUser.phoneNumber}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name='email-box' size={30} color={'#ff6600'} />
                            <Text style={styles.info}>Email: {dataUser.email}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name='map-marker-circle' size={30} color={'#ff6600'} />
                            <Text style={styles.info}>Địa Chỉ: 101B Lê Hữu Trác,Phước Mỹ</Text>
                        </View>

                    </View>
                    <View style={styles.viewButton}>
                        <Text style={{ fontSize: 16 }}>Hoạt động</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "green" }}
                            thumbColor={isEnabled ? "#ff6600" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled} />
                    </View>
                    <TouchableOpacity
                        onPress={
                            () => {
                                auth.signOut().then(() => { console.log("Sign out") })
                                AsyncStorage.clear().then(() => console.log('Cleared'))
                                navigation.navigate('LoginAgain')
                            }}>
                        <View style={styles.viewButton}>
                            <Text style={{ fontSize: 16 }} >Đăng Xuất</Text>
                            <View >
                                <MaterialCommunityIcons name="logout-variant" size={25} color={"black"} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            }
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: "#ff9933",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#333333",
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    info: {
        fontSize: 17,
        marginLeft: 10,
        color: "black",
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
    }
});