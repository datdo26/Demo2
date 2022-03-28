import {StyleSheet, Text, View, SectionList, SafeAreaView} from 'react-native';
import React from 'react';

const Data_section = [
  {
    title: 'A',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'B',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'C',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'D',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'E',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'F',
    data: [
      'Julia Comstock',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },
  {
    title: 'G',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'H',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'J',
    data: [
      'Lillie-Mai Allen',
      'Julia Comstock',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'K',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Julia Comstock',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'L',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Julia Comstock',
      'Rosemary Waterlow',
    ],
  },

  {title: 'M', data: ['Lillie-Mai Allen']},
  {title: 'N', data: ['Lillie-Mai Allen']},
  {
    title: 'O',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },
  {title: 'P', data: ['Lillie-Mai Allen', 'Emmanuel Goldstein']},
  {title: 'Q', data: ['Lillie-Mai Allen', 'Emmanuel Goldstein']},
];

const Alphabet = () => {
  const renderItem = ({item, index}) => {
    return <Text style={styles.itemStyle}>{item}</Text>;
  };

  const renderSectionHeader = ({section}) => {
    return (
      <Text
        style={{
          padding: 10,
          fontSize: 25,
          fontWeight: 'bold',
          backgroundColor: 'gray',
        }}>
        {section.title}
      </Text>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SectionList
        sections={Data_section}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Alphabet;

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    fontSize: 25,
    height: 50,
  },
});
