import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	TouchableHighlight,
	Navigator
} from 'react-native';

import Styles from 'myapp/components/Styles';

export default class Lessons extends Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource	: ds.cloneWithRows( this.props.lessonListData )
		}
	}

	onSubMenuPress(lessonData, rowID) {
		this.props.navigator.push({
			id:'lesson', 
			lessonData: lessonData,
			lessonListData: this.props.lessonListData
		})
	}

	renderSubMenu(lessonData, sectionID, rowID) {
		if(!lessonData.name) return;
		return(
			<TouchableHighlight onPress={this.onSubMenuPress.bind(this, lessonData, rowID)}>
				<Text style={Styles.row}>{lessonData.name}</Text>
			</TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={Styles.container}>
				<TouchableHighlight onPress={()=>this.props.navigator.push({ id: 'home'})}>
					<Text style={Styles.btn}>Back</Text>
				</TouchableHighlight>

				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderSubMenu.bind(this)}
				/>
			</View>
		);
	}
}

AppRegistry.registerComponent('Lessons', () => Lesson);
