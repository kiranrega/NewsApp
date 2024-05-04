import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NewsCardProps} from '../../types';
import FastImage from 'react-native-fast-image';

// This is a React component that displays a news article card
// It is memoized (using React.memo) to prevent unnecessary re-renders
const NewsCard: React.FC<NewsCardProps> = memo(({article}) => {
  // Define the props for the FastImage component
  const imageProps = {
    source: {uri: article.urlToImage},
    style: styles.newsImage,
    resizeMode: FastImage.resizeMode.cover,
    cacheControl: FastImage.cacheControl.immutable,
  };

  return (
    <View style={styles.articleDetails}>
      {/* Render the article image using FastImage */}
      <FastImage {...imageProps} />
      {/* Render the article title */}
      <Text style={styles.newsTitle} numberOfLines={2} ellipsizeMode="tail">
        {article.title}
      </Text>
      {/* Render the news source name */}
      <Text style={styles.newsSource}>{article.source.name}</Text>
      {/* Render the article description */}
      <Text
        style={styles.newsDescription}
        numberOfLines={3}
        ellipsizeMode="tail">
        {article.description}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  articleDetails: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#D6DAC8',
    margin: 20,
    borderRadius: 20,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsSource: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  newsDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
});

export default NewsCard;
