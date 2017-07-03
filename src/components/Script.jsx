import React from 'react';
import Badge from './Badge.jsx';

const exec = require('child_process').exec;

class Script extends React.Component {

    runScript= (script, path) => {
        exec(`cd ${path} && npm run ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.error(path, `exec error: ${error}`);
                callback(new Error('Not a directory'), false);
            } else {
                callback(null, true);
            }
        });
    }

    render() {
        return (
          <div>
            <h4>{this.props.show && 'Scripts:'}</h4>
            <ul>{this.props.show && Object.keys(
                    this.props.scripts).map(
                        script => (<Badge
                          class={'script'}
                          text={JSON.stringify(script)}
                          onClick={this.runScript(JSON.stringify(script), this.props.path)}
                        />
                        ))}
            </ul>
          </div>
        );
    }
}

export default Script;
