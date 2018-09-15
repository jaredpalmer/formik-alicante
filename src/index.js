import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { css } from 'glamor';
import { COLORS } from './theme';
const { base, black, ...cols } = COLORS;

// Cool example colors.
Object.keys(cols).forEach((color: string) => {
  css.global(
    `.formik-example.formik-example--${color} button[type='submit'],
  .formik-example.formik-example--${color} button.primary`,
    {
      background: COLORS[color][5],
    }
  );
  css.global(
    `.formik-example.formik-example--${color} button[type='submit']:focus,
    .formik-example.formik-example--${color} button.primary:focus`,
    {
      background: COLORS[color][6],
    }
  );
  css.global(
    `.formik-example.formik-example--${color} button[type='submit']:active,
    .formik-example.formik-example--${color} button.primary:active`,
    {
      background: COLORS[color][7],
    }
  );

  css.global(
    `.formik-example.formik-example--${color} input:focus, .formik-example.formik-example--${color} select:focus`,
    {
      borderColor: COLORS[color][4],
      boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 0 3px ${
        COLORS[color][1]
      }`,
      outline: 'none',
    }
  );
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
