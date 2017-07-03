import React from 'react';
import PropTypes from 'prop-types';
import getDirectories from '../utils/filesystem';
import path from 'path';
import Details from './Details.jsx';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            directories: null,
        };
    }

    componentWillMount() {
        console.log('willMount');
        this.refreshDirectories(this.props.directory);
    }

    componentWillReceiveProps(nextprops) {
        this.refreshDirectories(nextprops.directory);
    }

    refreshDirectories(dir) {
        this.setState({
            directories: null,
        });
        console.log('refreshed dir', dir);
        dir && getDirectories(dir).then((directories) => {
            console.log('New directories', directories);
            this.setState({
                directories,
            });
        });
    }

    // shouldComponentUpdate(nextProps) {
    //     const differentDirectory = this.props.directory !== nextProps.directory;
    //     return differentDirectory;
    // }

    renderList() {
        return (
          <div className={'repo-list'}>
            {this.state.directories.map((dir, index) => {
                const dirPath = path.join(this.props.directory, dir);
                return <Details key={index} name={dir} path={dirPath} />;
            })
            }
          </div>
        );
    }

    render() {
        return (
            this.state.directories ? this.renderList() : null
        );
    }
}

List.PropTypes = {
    directory: PropTypes.string.isRequired,
};

export default List;
