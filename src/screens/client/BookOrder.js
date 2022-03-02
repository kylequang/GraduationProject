import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';






const listWork = [
    {
        id: 1,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: true
    },
    {
        id: 2,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: true
    }, {
        id: 3,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 4,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 5,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 6,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 7,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 8,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 9,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 10,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: true
    }
]

export default function BookOrder() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios'); // to show time
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios'); // to hide back the picker
            setMode('date'); // defaulting to date for next open
        }
    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatePicker = () => {
        showMode('date');
    };
    const formatDate = (date, time) => {
        return `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    };

    

    const [selectWork, setSelectWork] = useState(listWork)



    const handleChange = (id) => {
        let temp = selectWork.map((work) => {
            if (id === work.id) {
                return { ...work, isChecked: !work.isChecked };
            }
            return work;
        });
        setSelectWork(temp);
        console.log(selectWork)

    }


    const renderListWork = ({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
                status={item.isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    handleChange(item.id);
                }}

            />
            <Text>{item.service}</Text>
            <Text style={{ marginLeft: 30 }}>{item.price}/Giờ</Text>
            <Text style={{ marginLeft: 30 }}>{item.insurance}/Tháng</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>THÔNG TIN LIÊN HỆ</Text>
            <View style={styles.contact}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginBottom: 5 }}>Họ Tên: Lê Quang Kỳ</Text>
                    <Text>Thay đổi</Text>
                </View>
                <Text style={{ marginBottom: 5 }}>SDT: 0374448052</Text>
                <Text style={{ marginBottom: 5 }}>Địa Chỉ: 101B Lê Hữu Trác, Phước Mỹ, Sơn Trà</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 5 }}>
                    CHỌN THỜI GIAN:</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.button}>
                    <Text style={{ fontSize: 18 }}>
                        {formatDate(date, time)}
                    </Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    minimumDate={Date.parse(new Date())}
                    display='default'
                    mode={mode}
                    onChange={onChange}
                />
            )}
            <View style={styles.listWork}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>LỰA CHỌN CÔNG VIỆC</Text>

                <FlatList
                    data={selectWork}
                    renderItem={renderListWork}
                    keyExtractor={item => item.id} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    contact: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#33cc33',

    },
    button: {
        width: '40%',
        marginLeft: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1
    },
    listWork: {
        marginTop: 10,
    }
})