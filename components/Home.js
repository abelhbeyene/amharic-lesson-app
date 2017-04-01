import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	View,
	ListView,
	TouchableHighlight,
	Navigator,
	WebView
} from 'react-native';
import Styles from 'myapp/components/Styles';


export default class Home extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			menuDataSource: ds.cloneWithRows([]),
			pageTitle: this.props.title
		};
	}

	// fetch the menu
	fetchData() {
		let menuData = require('myapp/_data/home.json');
		this.setState({
			menuDataSource: this.state.menuDataSource.cloneWithRows(Object.keys(menuData)),
			menuData: menuData
		});

	}

	// Init data fetch
	componentDidMount() {
		this.fetchData();
	}

	onPress(menuItem) {
		this.props.navigator.push({
			id: 'lessons',
			lessonListData: this.state.menuData[menuItem].map((el)=>{
					return {name:el.name, data:el.data};
			})
		});
	}

	renderRow(menuItem, sectionId, rowId, highlightRow) {
		if(!menuItem) return;
		return (
			<TouchableHighlight onPress={() => { this.onPress(menuItem) }}>
				<Text style={Styles.row}>{menuItem}</Text>
			</TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={Styles.container}>
				<Text style={Styles.pageTitle}>{this.state.pageTitle}</Text>
				<ListView
					dataSource={this.state.menuDataSource}
					renderRow={this.renderRow.bind(this)}
				/>
			</View>
		);
	}
}

AppRegistry.registerComponent('Home', () => Home);
