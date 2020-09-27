import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, TouchableHighlight} from "react-native";
import {weatherHistoryApi} from "./api";


export default function HistoryScreen() {
    const [historyData, setHistoryData] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [dataForModal, setDataForModal] = useState({})

    useEffect(() => {
        weatherHistoryApi.getWeather().then(res => {
            if (res.status === 200) {
                const modifiedData = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key], key,
                    }
                })
                setHistoryData(modifiedData.reverse())
            }
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> History of weather requests </Text>
            </View>
            <ScrollView>
                <View>
                    {historyData.length > 0 && historyData.map((item) => {
                        return (
                            <TouchableOpacity key={item.key} onPress={() => {
                                setModalVisible(true)
                                setDataForModal(item)
                            }}>
                                <View style={styles.historyItem} onPress={() => {
                                    setModalVisible(true)
                                    setDataForModal(item)
                                }}>
                                    <Text style={styles.historyItemText}>
                                        Date: {item.date}, Time: {item.time}, Temp: {item.main['temp'] - 273.15}C
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            { modalVisible &&
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Date: {dataForModal.date}</Text>
                            <Text style={styles.modalText}>Time: {dataForModal.time}</Text>
                            <Text style={styles.modalText}>Temp: {dataForModal.main['temp']-273.15}</Text>
                            <Text style={styles.modalText}>Humidity: {dataForModal.main['humidity']}%</Text>
                            <Text style={styles.modalText}>Pressure: {dataForModal.main['pressure']*.75} mm HR</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide</Text>
                            </TouchableHighlight>
                        </View>

                </Modal>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'lightgrey',
        alignItems: 'stretch',
        paddingHorizontal: 20
    },
    header: {
        marginVertical: 20,
        width: '100%',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    historyItem: {
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    historyItemText: {
        fontSize: 18,
    },
    centeredView: {
    },
    modalView: {
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 35,
        marginTop: '10%',
        marginBottom: 150,
        alignItems: "center",
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'white'
    }
});