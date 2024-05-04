# News App

This is a React Native app that displays news articles fetched from the NewsAPI. The app features a swipeable card interface, allowing users to swipe to load the next article.

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- React Native development environment set up (follow the [official React Native setup guide](https://reactnative.dev/docs/environment-setup))

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/your-repo/news-app.git
\`\`\`

2. Navigate to the project directory:

\`\`\`bash
cd news-app
\`\`\`

3. Install dependencies:

\`\`\`bash
npm install
\`\`\`

### Running the App

1. Start the Metro bundler:

\`\`\`bash
npm start
\`\`\`

2. Run the app on your preferred platform:

- For Android:

\`\`\`bash
npm run android
\`\`\`

- For iOS:

\`\`\`bash
npm run ios
\`\`\`

### Add API key in index.ts Constants folder to fetch News

## App Architecture

The app is built using React Native and follows a modular architecture. Here's an overview of the main components:

1. **NewsFeed.tsx**: This is the main component that handles data fetching using the SWR library and the `fetcher` function. It renders the `NewsCard` component with the current article data and handles the swipe gesture using the `SwipeButton` component.

2. **NewsCard.tsx**: This component displays the details of a news article, including the image, title, source, and description.

3. **SwipeButton.tsx**: This component provides a swipeable button with an animated gradient and swipe gesture handling using React Native Reanimated.

4. **fetcher.ts**: This file contains the `fetcher` function, which is a custom fetcher used with SWR to fetch news articles from the NewsAPI.

5. **index.ts**: This file exports the API key and the API URL for fetching news articles.

## Dependencies

- **axios**: Used for making HTTP requests to the NewsAPI.
- **react-native-fast-image**: A high-performance image component for React Native.
- **react-native-gesture-handler**: Provides a native-driven gesture system for building better touch-based experiences.
- **react-native-linear-gradient**: A React Native library for creating linear gradients.
- **react-native-reanimated**: A React Native library for creating fluid animations.
- **swr**: A React Hooks library for data fetching, caching, and revalidation.
