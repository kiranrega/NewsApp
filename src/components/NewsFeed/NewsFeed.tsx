import React, {memo, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import useSWR from 'swr';
import {fetcher} from '../../utils/fetcher';
import {Article} from '../../types';
import {API_URL} from '../../constants';
import SwipeButton from '../SwipeButton/SwipeButton';
import NewsCard from '../NewsCard.tsx/NewsCard';

// This is the main NewsFeed component
const NewsFeed: React.FC = memo(() => {
  // State to keep track of the current article index
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  // State to control when to show the loader
  const [showLoader, setShowLoader] = useState(false);

  // Use the useSWR hook to fetch data from the API
  const {data, error} = useSWR<Article[]>(
    showLoader ? API_URL : null, // Conditionally pass the API URL or null based on showLoader
    fetcher, // Use the custom fetcher function
    {
      revalidateOnFocus: false, // Disable automatic revalidation when the app regains focus
    },
  );

  // Callback function to handle swipe gesture
  const handleSwipe = useCallback(() => {
    setShowLoader(true); // Show the loader when swiping
    if (data) {
      // If data is available
      const nextIndex = currentArticleIndex + 1; // Calculate the next article index
      if (nextIndex < data.length) {
        // If the next index is within the data array bounds
        setCurrentArticleIndex(nextIndex); // Update the current article index
      } else {
        // If the next index is out of bounds
        setCurrentArticleIndex(0); // Reset the current article index to 0
      }
    }
  }, [currentArticleIndex, data]); // Memoize the handleSwipe function with currentArticleIndex and data as dependencies

  // Side effect to reset the currentArticleIndex when new data is fetched
  useEffect(() => {
    if (data && data.length > 0) {
      // If data is available and not empty
      setCurrentArticleIndex(0); // Reset the current article index to 0
    }
  }, [data]); // Run this effect whenever data changes

  // If there's an error fetching data, display an error message
  if (error) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  // Get the current article object based on the currentArticleIndex
  const currentArticle = data?.[currentArticleIndex];

  return (
    <View style={styles.root}>
      {/* If the loader is showing and data is not available yet, display an ActivityIndicator */}
      {showLoader && !data && (
        <ActivityIndicator size="large" color="#EFBC9B" style={styles.loader} />
      )}
      {/* If the current article is available, render the NewsCard component */}
      {currentArticle && <NewsCard article={currentArticle} />}
      {/* Render the SwipeButton component and pass the handleSwipe function as a prop */}
      <SwipeButton onToggle={handleSwipe} />
    </View>
  );
});

// Styles for the NewsFeed component
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9CAFAA',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 10,
  },
});

export default NewsFeed;
