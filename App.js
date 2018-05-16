/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Alert
} from 'react-native';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const utcDateToString = (momentInUTC: moment): string => {
    return moment.utc(momentInUTC).toISOString();
};

const showAlert = (alertTitle: string, alertMessage: string) => {
    Alert.alert(alertTitle, alertMessage, [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Ok', onPress: () => console.log('Ok Pressed')}
    ]);
};

export default class App extends Component<Props> {
  render() {

    const eventTitle = 'FAISE Review Appointment';
    const nowUTC = moment.utc();

      RNCalendarEvents.authorizationStatus().then(item => {
          showAlert('Calendar Auth Status', `message: ${item}`);
      });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Calendar Events
        </Text>
        <Text style={styles.welcome}>Event title: {eventTitle}</Text>
        <Text>
          date:{' '}
            {moment
                .utc(nowUTC)
                .local()
                .format('lll')}
        </Text>

        <Button
            onPress={() => {
                App.addToCalendar(eventTitle, nowUTC);
            }}
            title="Add to calendar"
        />
      </View>
    );
  }

  static addToCalendar = (title: string, startDateUTC: moment) => {
      const eventDetails = {
        notes: 'Remember to call client about FAISE review.',
        startDate: utcDateToString(startDateUTC),
        endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours'))
      };

      //showAlert('eventDetails:', JSON.stringify(eventDetails));

      RNCalendarEvents.saveEvent(title, eventDetails).then((item) => {
          console.log("**** EVENT SAVED ****");
          console.log(`${JSON.stringify(item)}`);
          showAlert('Calendar added successfully', `message:${item}`);
      }).catch((err) => {
          showAlert('Add To Calendar Failed', `error message: ${err.message}`);
      });

      // RNCalendarEvents.saveEvent('Title of event', {
      //     startDate: '2016-08-19T19:26:00.000Z',
      //     endDate: '2017-08-19T19:26:00.000Z'
      // }).then((item) => {
      //     console.log("**** EVENT SAVED ****");
      //     console.log(`${JSON.stringify(item)}`);
      //     showAlert('Calendar added successfully', `message:${item}`);
      // }).catch((err) => {
      //     showAlert('Add To Calendar Failed', `error message: ${err.message}`);
      // });
  };
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
