import React from 'react';

class GitButton extends React.Component {

    render() {
        return (
          <a
            className={'link'}
            href={this.props.url}
          >
            <i className={'fa fa-github-square'} aria-hidden="true" />
          </a>
        );
    }
}

export default GitButton;
