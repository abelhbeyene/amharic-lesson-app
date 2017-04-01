/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator
} from 'react-native';
import Styles from './components/Styles';
import Home from './components/Home';
import Lessons from './components/Lessons';
import Lesson from './components/Lesson';

export default class myapp extends Component {
	renderScene(route, navigator) {
		switch (route.id) {
			case 'home':
				return (<Home navigator={navigator} title='Home' />)
			case 'lessons':
				return (<Lessons lessonListData={route.lessonListData} navigator={navigator} title='Lessons List' />)
			case 'lesson':
				return (<Lesson lessonListData={route.lessonListData} lessonData={route.lessonData} navigator={navigator} title='Lesson' />)
		}
	}


	render() {
		return (
			<Navigator
				initialRoute={{ id: 'home' }}
				renderScene={this.renderScene}
				configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
			/>
		);
	}
}

AppRegistry.registerComponent('myapp', () => myapp);
