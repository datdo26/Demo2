import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import sampleData from './src/sampleData';
import colors from './src/values/colors';
import sizes from './src/values/sizes';

export default class List extends Component {
  state = {};
  renderListItem = item => {
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemLabel}>{item.value}</Text>
      </View>
    );
  };

  renderSectionHeader = section => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
      </View>
    );
  };

  renderCustomListHeader = () => {
    return <View style={styles.listHeaderContainer}></View>;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlphabetList
          style={{flex: 1}}
          data={sampleData}
          renderCustomItem={this.renderListItem}
          renderCustomSectionHeader={this.renderSectionHeader}
          renderCustomListHeader={this.renderCustomListHeader}
          getItemHeight={() => sizes.itemHeight}
          sectionHeaderHeight={sizes.headerHeight}
          listHeaderHeight={sizes.listHeaderHeight}
          indexLetterStyle={{color: colors.primary}}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },

  listItemContainer: {
    flex: 1,
    height: sizes.itemHeight,
    paddingHorizontal: sizes.spacing.regular,
    justifyContent: 'center',
    borderTopColor: colors.seperatorLine,
    borderTopWidth: 1,
  },

  listItemLabel: {
    color: colors.text.dark,
    fontSize: 14,
  },

  sectionHeaderContainer: {
    height: sizes.headerHeight,
    backgroundColor: colors.background.dark,
    justifyContent: 'center',
    paddingHorizontal: sizes.spacing.regular,
  },

  sectionHeaderLabel: {
    color: colors.background.light,
  },

  listHeaderContainer: {
    height: sizes.listHeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
