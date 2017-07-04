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
        exec(`cd ${path} && npm ${script !== 'install' ? 'run' : ''} ${script}`, (error, stdout, stderr) => {
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

    installScript = {
        install: 'npm i',
    }

    render() {
        const scripts = { ...this.installScript, ...this.props.scripts };
        console.log('scripts', scripts);
        return (
          <div>
            <h4>{this.props.show && 'Scripts:'}</h4>
            <div>
              {this.props.show && Object.keys(
                    scripts).map(
                        (script) => {
                            console.log(script);
                            return (<Badge
                              class={this.state.script === script ? 'green' : 'script'}
                              text={script}
                              icon={this.state.script === script ? 'circle-o-notch fa-spin fa-fw' : 'code'}
                              click={() => {
                                  this.setState({
                                      script,
                                  }, () => this.runScript(script, this.props.path));
                              }}
                            />);
                        })
                }
            </div>
          </div>
        );
    }
}

export default Script;
