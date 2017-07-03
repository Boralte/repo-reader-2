import PropTypes from 'prop-types';
import React from 'react';
import List from './List.jsx';
import '../assets/css/App.css';

const App = (props) => {
    const { directory } = props;
    console.log('app directory:', directory);
    return (
      <div>
        { directory && <List directory={directory} /> }
      </div>
    );
};

App.PropTypes = {
    directory: PropTypes.string.isRequired,
};

export default App;
