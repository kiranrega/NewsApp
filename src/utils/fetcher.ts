import axios from 'axios';
import {Article, NewsResponse} from '../types';

// This is a custom fetcher function used with SWR (a React Hooks library for data fetching)
// It takes a URL as input and returns an array of Article objects
export const fetcher = async (url: string): Promise<Article[]> => {
  // Make a GET request to the provided URL using axios
  const res = await axios.get<NewsResponse>(url);
  // Extract the array of articles from the response data and return it
  return res.data.articles;
};
