import React from 'react';
import PropTypes from 'prop-types';
import Badge from './Badge.jsx';
import GitButton from './GitButton.jsx';
import Script from './Script.jsx';
import Dependencies from './Dependencies.jsx';
import ProcessData from '../utils/processData';
import fetchGithub from '../utils/fetchGithub';
import githubUrl from '../utils/githubUrl';
import findReadme from '../utils/findReadme';
import findJson from '../utils/findJson';


class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: props.name,
            },
            badge: {},
            hasReadme: false,
            hasJson: false,
            jsonData: null,
            url: null,
            showJson: false,
            showDep: false,
            showGitButton: false,
            dependencies: 0,
        };
    }

    componentWillMount() {
        this.setState({
            badge: {},
            hasReadme: false,
            hasJson: false,
            jsonData: null,
            url: null,
            showJson: false,
            showDep: false,
            showGitButton: false,
            dependencies: 0,
        });
        this.fetchData();
    }

    showJson= () => {
        if (this.state.jsonData && !this.state.showJson) {
            this.setState({
                showJson: true,
            });
        } else {
            this.setState({
                showJson: false,
            });
        }
    }

    showDep= () => {
        if (this.state.jsonData && !this.state.showDep) {
            this.setState({
                showDep: true,
            });
        } else {
            this.setState({
                showDep: false,
            });
        }
    }

    countDependencies= () => {
        let depCount = this.state.jsonData ? Object.keys(this.state.jsonData.dependencies).length : 0;
        depCount = this.state.jsonData ? depCount + Object.keys(this.state.jsonData.devDependencies).length : depCount + 0;

        this.setState({
            dependencies: depCount,
        });
    }

    fetchData= () => {
        githubUrl(this.props.path).then((url) => {
            console.log(url);
            findReadme(this.props.path).then((hasReadme) => {
                console.log('readme result', hasReadme);
                findJson(this.props.path).then((jsonData) => {
                    console.log('json contents', jsonData);
                    fetchGithub(url).then((data) => {
                        console.log(data);
                        console.log('URL', url);
                        const badge = ProcessData(data);
                        this.setState({
                            url,
                            badge,
                            data,
                            hasReadme,
                            jsonData,
                        });
                        this.countDependencies();
                    });
                });
            });
        });
    }
    renderGitButton= (homeUrl) => {
        if (homeUrl && homeUrl !== 'https://github.com/404') {
            console.log(`homeURL = ${homeUrl}`);
            return true;
        }
        return false;
    }

    render() {
        console.log('html_url', this.state);
        console.log('has readme?', this.state.hasReadme);
        return (
          <div className={`repo-item ${this.state.badge.issueStatus}`} >
            <div>
              <a className="header" href={this.state.badge.homeLink}>{ this.props.name}</a>
            </div>
            <div className="badge-container">
              <Badge
                class={this.state.hasReadme ? 'green' : 'red'}
                url={this.state.data.html_url && `${this.state.data.html_url}/blob/master/README.md`}
                icon={'file'}
                text={'readme'}
              />
              <Badge
                class={this.state.jsonData ? 'green' : 'red'}
                icon={'file'}
                text={'json'}
                click={this.showJson}
              />
              <Badge
                class={this.state.badge.issueStatus}
                url={this.state.badge.issuesUrl}
                icon={'bug'}
                text={`issues: ${this.state.badge.issueCount}`}
              />
              <Badge
                text={this.state.badge.language}
              />
              <Badge
                class={'star'}
                url={this.state.badge.starLink}
                icon={'star'}
                text={`${this.state.badge.stars}`}
              />
              <Badge
                class={'watch'}
                url={this.state.badge.watcherLink}
                icon={'eye'}
                text={`${this.state.badge.watchers}`}
              />
              <Badge
                class={'size'}
                text={`${this.state.badge.size}`}
              />
              <Badge
                class={'dependencies'}
                text={`Dependencies: ${this.state.dependencies}`}
                click={this.showDep}
              />
            </div>
            {this.renderGitButton(this.state.url) &&
            <GitButton
              url={this.state.data.html_url}
            />
            }
            <p>{this.state.badge.description}</p>
            <div className={'script-container'}>
              <Script
                show={this.state.showJson}
                scripts={this.state.jsonData && this.state.jsonData.scripts}
                path={this.props.path}
              />
            </div>
            {this.state.showDep && <Dependencies
              deps={this.state.jsonData && this.state.jsonData.dependencies}
              devDeps={this.state.jsonData && this.state.jsonData.devDependencies}
            />}
          </div>
        );
    }
}

Details.PropTypes = {
    name: PropTypes.string.isRequired,
};

export default Details;
