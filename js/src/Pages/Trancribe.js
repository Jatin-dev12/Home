/* eslint-disable no-undef */
import React, { Component } from 'react';
import { useTranslation, Trans } from 'react-i18next';


const MyFunctionalComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{t('Welcome to React')}</h1>
      </header>
    </div>
  );
};

const MyClassComponent = withTranslation()(class extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{t('Welcome to React')}</h1>
        </header>
      </div>
    );
  }
});

const MyTransComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <Trans>Welcome to <strong>React</strong></Trans>
      </header>
    </div>
  );
}

// i18n translations might still be loaded by the http backend
// use react's Suspense
const Trancribe = () => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Suspense fallback="loading">
      <MyFunctionalComponent />
      <MyClassComponent />
      <MyTransComponent />
    </Suspense>
  );
};

export default Trancribe;