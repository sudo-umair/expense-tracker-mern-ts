import styles from 'App.module.css';
import AppRouter from 'navigation/AppRouter';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <AppRouter />
    </div>
  );
};

export default App;
