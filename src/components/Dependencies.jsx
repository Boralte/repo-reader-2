import React from 'react';

class Dependencies extends React.Component {

    render() {
        console.log('dependencies', this.props.devDeps);
        return (
          <div>
            <h4>Dependencies:</h4>
            <ul>{this.props.deps && Object.keys(
                    this.props.deps).map(
                        dep => <li>{dep} - {this.props.deps[dep]}</li>,
                    )}
            </ul>
            {this.props.devDeps && Object.keys(this.props.devDeps).length &&
            <div>
              <h4>Dev Dependencies:</h4>
              <ul>{this.props.devDeps &&
                   Object.keys(
                            this.props.devDeps).map(
                                devDep => <li>{devDep} - {this.props.devDeps[devDep]}</li>,
                                )}
              </ul>
            </div>
            }
          </div>
        );
    }
}

export default Dependencies;
