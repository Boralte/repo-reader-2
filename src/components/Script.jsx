import React from 'react';
import Badge from './Badge.jsx';

const exec = require('child_process').exec;

class Script extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            script: null,
        };
    }

    runScript= (script, path) => {
        console.log('state', this.state.script);
        exec(`cd ${path} && npm run ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.error(path, `exec error: ${error}`);
            } else {
                console.log(stdout);
            }
            this.setState({
                script: null,
            });
        });
    }

    render() {
        return (
          <div>
            <h4>{this.props.show && 'Scripts:'}</h4>
            <div>{this.props.show && Object.keys(
                    this.props.scripts).map(
                        script => (<Badge
                          class={this.state.script ? 'green' : 'script'}
                          text={script}
                          icon={this.state.script ? 'circle-o-notch fa-spin fa-fw' : 'code'}
                          click={() => {
                              this.setState({
                                  script,
                              }, () => this.runScript(script, this.props.path));
                          }}

                        />
                        ))}
            </div>
          </div>
        );
    }
}

export default Script;
