// eslint:ignore
import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import MiniFormik from './examples/MiniFormik';
import Basic from './examples/Basic';
import Array from './examples/Array';
import Fieldset from './examples/Fieldset';
import './css/Example.css';
import './css/RichEditor.css';
import { COLORS } from './theme';

const ExampleRoute = ({ children, color, ...props }) => (
  <Route
    {...props}
    render={() => (
      <div
        style={{ height: '100%' }}
        className={`formik-example formik-example--${color}`}
      >
        <Link
          to="/"
          style={{
            position: 'absolute',
            bottom: 20,
            left: 16,
            color: '#000',
            fontWeight: '800',
            padding: '.5rem 1rem',
            borderRadius: 4,
            background: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,.2)',
          }}
        >
          <span aria-label="finger" role="img">
            👈
          </span>{' '}
          Back
        </Link>
        <div
          style={{
            height: '100%',
            background: COLORS[color][5],
            padding: '4rem 2rem',
          }}
        >
          <div
            style={{
              borderRadius: '4px',
              boxShadow: '0 8px 16px rgba(0,0,0,.2)',
              background: '#fff',
              maxWidth: 400,
              margin: '0 auto',
              padding: '2rem',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    )}
  />
);

export default function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <div style={{ height: '100%', background: '#666ee8' }}>
            <div
              style={{
                margin: '0 auto',
                maxWidth: 600,
                fontSize: '2rem',
                fontWeight: 800,
                padding: '1rem',
                lineHeight: 1.6,
              }}
            >
              <h1
                style={{
                  color: '#fff',
                  fontWeight: 800,
                  letterSpacing: '-1px',
                  marginBottom: '2rem',
                  lineHeight: 1,
                }}
              >
                Formik Demos
              </h1>

              <Link
                to="/miniformik"
                style={{ display: 'block', color: '#fff' }}
              >
                <span role="img" aria-label="baby">
                  👶
                </span>{' '}
                {`<MiniFormik />`}
              </Link>
              <Link to="/basic" style={{ display: 'block', color: '#fff' }}>
                <span role="img" aria-label="rocket">
                  🚀
                </span>{' '}
                The Basics
              </Link>
              <Link to="/fieldset" style={{ display: 'block', color: '#fff' }}>
                <span role="img" aria-label="build">
                  🛠
                </span>{' '}
                {`Building your own <Fieldset/>`}
              </Link>
              <Link to="/array" style={{ display: 'block', color: '#fff' }}>
                <span role="img" aria-label="fire">
                  🔥
                </span>{' '}
                Nested state + Arrays
              </Link>
              <div
                style={{
                  fontSize: '1.2rem',
                  marginTop: '4rem',
                }}
              >
                <a
                  href="https://jaredpalmer.com/formik"
                  style={{ color: '#fff', display: 'block' }}
                >
                  Docs
                </a>
                {'  '}
                <a
                  href="https://github.com/jaredpalmer/formik"
                  style={{ color: '#fff', display: 'block' }}
                >
                  GitHub
                </a>
                {'  '}
                <a
                  href="https://twitter.com/jaredpalmer"
                  style={{ color: '#fff', display: 'block' }}
                >
                  @jaredpalmer
                </a>
              </div>
            </div>
          </div>
        )}
      />
      <ExampleRoute path="/miniformik" exact color="blue">
        <MiniFormik />
      </ExampleRoute>
      <ExampleRoute path="/basic" exact color="teal">
        <Basic />
      </ExampleRoute>
      <ExampleRoute path="/array" exact color="green">
        <Array />
      </ExampleRoute>
      <ExampleRoute path="/fieldset" exact color="blue">
        <Fieldset />
      </ExampleRoute>
    </Switch>
  );
}
