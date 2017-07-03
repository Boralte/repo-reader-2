import React from 'react';

class Badge extends React.Component {

    render() {
        return (
          <a
            className={`badge ${this.props.class}`}
            href={this.props.url}
            onClick={this.props.click}
          >
            <i className={`fa fa-${this.props.icon}`} aria-hidden="true" />
            {this.props.text}
          </a>
        );
    }
}

export default Badge;
