import React from 'react';
import {AsyncStorage} from "react-native";
import {Notifications} from "expo";
import * as Permissions from 'expo-permissions'
import {setUserPermission} from "./api";
import {NOTIFICATION_KEY} from "./keys";


export const getToken = async () => {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = status

    if(status !== "granted") {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        return;
    }

    try {
        let token = await Notifications.getExpoPushTokenAsync();
        await setUserPermission(token)

    } catch (e) {
        console.log(e)
    }


}

const createNotification = () => {
    return {
        title: 'Log your stats!',
        body: "👋 don't forget to log your stats for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export const setLocalNotification = async () => {
    await AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
