import React from 'react';

class DirButton extends React.Component {

    render() {
        return (
          <div className="dirButton">
            <button className="dir-button" onClick={this.props.pickDir}><span> Choose Directory </span> </button>
          </div>
        );
    }
}

export default DirButton;
