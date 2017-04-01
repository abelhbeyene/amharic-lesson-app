/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';


export default StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: 'blue'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	btn: {
		backgroundColor: '#CCC',
		fontSize: 22,
		textAlign: 'center',
		margin: 10,
		padding: 5,
		color: '#FFF'
	},
	row: {
		fontSize:16,
		textAlign:'center',
		borderColor: '#EEE',
		color: '#000',
		marginBottom: 4,
		borderBottomWidth: 2,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomColor: '#3B3738',
		borderTopColor: '#3B3738',
		borderLeftColor: '#3B3738',
		borderRightColor: '#3B3738',
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: 'center'
	},
	pageTitle: {
		fontSize: 25,
		textAlign: 'center',
		borderBottomWidth: 2,
		borderBottomColor: '#CCC',
		paddingBottom: 10,
		marginBottom: 10
	},
	lessonItemsContainer: {
		flexDirection: 'row',
        flexWrap: 'wrap'
	},
	lessonCol: {
		margin: 3,
		width: 114,
		height: 148
	},
	itemDesc: {
		backgroundColor: '#333',
		color: '#fff',
		textAlign: 'center',
		paddingTop: 5,
		paddingBottom: 5
	}
});

