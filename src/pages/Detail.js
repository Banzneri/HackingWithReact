import React from 'react';
import ajax from 'superagent';
import { NavLink, Link } from 'react-router-dom';

const commitUrl = 'https://api.github.com/repos/facebook/react/commits';
const forkUrl = 'https://api.github.com/repos/facebook/react/forks';
const pullUrl = 'https://api.github.com/repos/facebook/react/pulls';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { commits: [],
                        forks: [],
                        pulls: [],
                        curArray: [],
                        currentRender: this.renderCommits};
    }

    componentWillMount() {
        console.log("mounting");
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
        this.setState({currentRender: this.renderCommits, curArray: this.state.commits})
    }

    fetchFeed(type) {
        const baseUrl = 'https://api.github.com/repos/facebook';
        ajax.get(`${baseUrl}/${this.props.match.params.repo}/${type}`)
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({[type]: response.body});
                } else {
                    console.log('There was an error fetching data from github', error);
                }
            }
        );
    }

    buttonClickedCommits() {
        this.setState({currentRender: this.renderCommits, curArray: this.state.commits})
    }

    buttonClickedForks() {
        this.setState({currentRender: this.renderForks, curArray: this.state.forks})
    }

    buttonClickedPulls() {
        this.setState({currentRender: this.renderPulls, curArray: this.state.pulls})
    }

    renderCommits(value, index) {
        const author = value.author ? value.author.login : 'Anonymous';
        return (
            <div key={index}>
                <p>
                    <strong><Link to={`/user/${author}`}>{author}: </Link></strong>
                    <a href={value.html_url}>{value.commit.message}</a>
                </p>
            </div>
        );
    }

    renderForks(value, index) {
        return (
            <div key={index}>
                <p>
                    <strong><Link to={`/user/${value.owner.login}`}>{value.owner.login}: </Link></strong>
                    <a href={value.html_url}>{value.id}</a>
                </p>
            </div>
        );
    }

    renderPulls(value, index) {
        return (
            <div key={index}>
                <p>
                    <strong><Link to={`/user/${value.user.login}`}>{value.user.login}: </Link></strong>
                    <a href={value.html_url}>{value.id}</a>
                </p>
            </div>
        );
    }

    render() {
        const render = this.state.currentRender;
        return (
            <div>
                <h2>{this.props.match.params.repo}</h2>
                <button onClick={this.buttonClickedCommits.bind(this)}>Commits</button>
                <button onClick={this.buttonClickedForks.bind(this)}>Forks</button>
                <button onClick={this.buttonClickedPulls.bind(this)}>Pulls</button>
                <p>You are here : <NavLink to="/" activeClassName="active">Home</NavLink> > {this.props.match.params.repo}</p>
                {this.state.curArray.map((value, index) => (render(value, index)))}
            </div>
        );
    }
}

export default Detail;