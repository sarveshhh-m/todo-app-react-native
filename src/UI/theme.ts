import {DefaultTheme} from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4a90e2', // Dark blue color for primary actions
    background: '#2c3e50', // Dark background color
    card: '#34495e', // Dark gray color for cards
    text: '#ecf0f1', // Light gray text color
    border: '#7f8c8d', // Medium gray border color
  },
};

export default theme;
