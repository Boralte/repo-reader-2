
import React from 'react';
import Header from '../components/Header.jsx';
import DirButton from '../components/DirButton.jsx';
import App from '../components/App.jsx';

const { dialog } = require('electron').remote;
const { shell } = require('electron');

const $ = window.$ = require('jquery');

$(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
});


class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directory: null,
        };
    }

    pickDir = () => {
        dialog.showOpenDialog({ properties: ['openDirectory'] }, (dir) => {
            if (!dir) return;
            console.log('Log dir:', dir);
            this.setState({
                directory: dir[0],
            });
        });
    };

    render() {
        console.log(this.state.directory);
        return (
          <div>
            <Header />
            <DirButton pickDir={this.pickDir} />
            <App directory={this.state.directory} />
          </div>
        );
    }
}

export default AppContainer;

