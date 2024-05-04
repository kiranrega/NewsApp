import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

// Define constants for component dimensions
const BUTTON_WIDTH = 350;
const BUTTON_HEIGHT = 100;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

interface SwipeButtonProps {
  onToggle: (isToggled: boolean) => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = memo(({onToggle}) => {
  // Use a shared value to store the swipe position
  const X = useSharedValue(0);
  const [toggled, setToggled] = React.useState(false);

  // Callback function to handle swipe completion
  const handleComplete = React.useCallback(
    (isToggled: boolean) => {
      setToggled(isToggled);
      onToggle(isToggled);
    },
    [onToggle],
  );

  // Gesture handler for the swipe interaction
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        // If the swipe was previously completed, adjust the position based on the swipe range
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        // If not completed, use the translation directly
        newValue = e.translationX;
      }

      // Clamp the position within the swipe range
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      // Reset the position with a spring animation
      X.value = withSpring(0);
      // Call the handleComplete function with the swipe completion state
      runOnJS(handleComplete)(
        X.value > BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2,
      );
    },
  });

  // Define input ranges for interpolation
  const InterpolateXInput = [0, H_SWIPE_RANGE];

  // Define animated styles for various components
  const AnimatedStyles = {
    colorWave: useAnimatedStyle(() => ({
      width: H_WAVE_RANGE + X.value,
      opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
    })),
    swipeable: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        X.value,
        [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
        ['#06d6a0', '#fff'],
      ),
      transform: [{translateX: X.value}],
    })),
    swipeText: useAnimatedStyle(() => ({
      opacity: interpolate(
        X.value,
        InterpolateXInput,
        [0.7, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            X.value,
            InterpolateXInput,
            [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
            Extrapolate.CLAMP,
          ),
        },
      ],
    })),
  };

  // Create an animated component for the linear gradient
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  return (
    <View style={styles.swipeCont}>
      {/* Render the color wave */}
      <AnimatedLinearGradient
        style={[AnimatedStyles.colorWave, styles.colorWave]}
        colors={['#06d6a0', '#1b9aaa']}
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}
      />
      {/* Render the swipeable component with gesture handler */}
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
      </PanGestureHandler>
      {/* Render the swipe text */}
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        Swipe To Get News
      </Animated.Text>
    </View>
  );
});

// Define styles for the components
const styles = StyleSheet.create({
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: '#fff',
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
    color: '#1b9aaa',
    marginLeft: 20,
  },
});

export default SwipeButton;
