import {StatusBar} from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import * as Location from 'expo-location'
import axios from 'axios'
import {weatherHistoryApi} from "./api";

export default function HomeScreen() {

  const [location, setLocation] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [addressComponent, setAddressComponent] = useState('')
  const [weather, setWeather] = useState({})
  const hours = new Date().getHours()
  const isDayTime = hours > 6 && hours < 20
  let weatherConditions = ''

  const temperature = Math.round(weather['temp'] - 273.15)
  const WEATHER_API_KEY = '142f05171cf9354e13843da2c361c122'

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation({...location});
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude.toFixed(2)}&lon=${location.coords.longitude.toFixed(2)}&appid=${WEATHER_API_KEY}`)
        .then((res) => {
          setWeather({...res.data.main})
          setAddressComponent(res.data.name)
          weatherHistoryApi.sendWeather({
            ...res.data,
            date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`
          })
        })
        .catch(err => alert(err))
    })();

  }, [])

  if (errorMsg) {
    alert(errorMsg)
    return null
  }

  if (temperature < 0) {
    weatherConditions = 'FREEEZING'
  } else if (temperature < 20) {
    weatherConditions = 'OPTIMAL'
  } else {
    weatherConditions = 'HOOOOOT'
  }

  return (
    <View style={isDayTime ? styles.containerDay : {...styles.containerDay, backgroundColor: 'lightblue'}}>
      <View style={styles.userLocationContainer}>
        <View style={styles.coords}>
          {location.coords &&
          <Text style={styles.homeScreenTextStyle}>{`Latitude ${location.coords.latitude.toFixed(2)}`}</Text>}
          {location.coords &&
          <Text style={styles.homeScreenTextStyle}>{`Longitude ${location.coords.longitude.toFixed(2)}`}</Text>}
        </View>
        <View style={styles.city}>
          <Text style={styles.homeScreenTextStyle}>{`Your location is:
        ${addressComponent}`}</Text>
        </View>
      </View>
      <View style={styles.weather}>
        <Text style={styles.homeScreenTextStyle}> {`Weather conditions for today are ${weatherConditions}`} </Text>
        <Text style={styles.homeScreenTextStyle}>{`Temperature - ${temperature}C, feels like - ${temperature}C`}</Text>
        <Text style={styles.homeScreenTextStyle}>{`Humidity - ${weather['humidity']}%`}</Text>
        <Text style={styles.homeScreenTextStyle}>{`Pressure - ${weather['pressure'] * 0.75} mm Hg`}</Text>
      </View>
      <StatusBar hidden style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  containerDay: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLocationContainer: {
    flex: .2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  weather: {
    flex: .8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: 50
  },
    homeScreenTextStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    }
});
