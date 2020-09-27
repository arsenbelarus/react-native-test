import axios from "axios";

const axiosFireBase = axios.create({
    baseURL: "https://test-react-native-4ca86.firebaseio.com/",
    headers: {
        "Content-Type": "text/plain",
        "API-KEY": "AIzaSyCWw0lFOnIV1rcLErCU3Ej5kGocQP1cpGQ",
    },
})

export const weatherHistoryApi = {
    sendWeather (data) {
        return axiosFireBase.post("weather.json", data)
    },
    getWeather () {
        return axiosFireBase.get("weather.json")
    }
}