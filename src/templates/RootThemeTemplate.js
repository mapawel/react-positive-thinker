import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from 'themes/GlobalStyle';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'themes/mainTheme';
import { ToastContainer } from 'react-toastify';
import 'config/toaststyles.css';

const RootThemeTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
    />
    {children}
  </ThemeProvider>
);

RootThemeTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootThemeTemplate;
