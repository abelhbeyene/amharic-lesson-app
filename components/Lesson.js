import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	TouchableHighlight,
	Navigator,
	Image
} from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';


import Styles from 'myapp/components/Styles';

export default class Lesson extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lessonData: this.props.lessonData,
			lessonContent: require('myapp/_data/allLessonsContent.json')
		}
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });		
		this.state.dataSource = ds.cloneWithRows(this.state.lessonContent[this.state.lessonData.data]);
	}

	playSound(row) {
		let url = 'http://amharicteacher.com/sounds/wisha.ogg';
		ReactNativeAudioStreaming.pause();
		ReactNativeAudioStreaming.resume();
		ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: false});
		ReactNativeAudioStreaming.stop();
	}

	// named row because thats the default value - would name it item
	renderLesson(row) {
		return (
			<View style={Styles.lessonCol}>
				<TouchableHighlight onPress={this.playSound.bind(this, row)}>
					<Image 
						source={{ uri: 'http://amharicteacher.com/images/' + row + '.png' }} 
						style={{width: 115, height: 110}}
					/>
				</TouchableHighlight>
				<Text style={Styles.itemDesc}>{row[0].toUpperCase() + row.substring(1)}</Text>
			</View>
		);
	}

	onBackBtnPress() {
		this.props.navigator.push({ 
			id: 'lessons', 
			lessonListData: this.props.lessonListData 
		});
	}

	render() {
		return (
			<View>
				<TouchableHighlight onPress={this.onBackBtnPress.bind(this)}>
					<Text style={Styles.btn}>Back</Text>
				</TouchableHighlight>
				<Text style={Styles.pageTitle}>{this.props.title}: {this.state.lessonData.name}</Text>
				<ListView
					contentContainerStyle={Styles.lessonItemsContainer}
					dataSource={this.state.dataSource}
					renderRow={this.renderLesson.bind(this)}
				/>
			</View>
		);
	}
}

AppRegistry.registerComponent('Lesson', () => Lesson);
