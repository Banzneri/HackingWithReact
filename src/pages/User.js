import React from 'react';
import ajax from 'superagent';
import { NavLink, Link } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentWillMount() {
        const baseUrl = 'https://api.github.com/users'
        ajax.get(`${baseUrl}/${this.props.match.params.name}/events`)
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({events: response.body});
                } else {
                    console.log('There was an error fetching data from github', error);
                }
            }
        );
    }

    renderUser(value, index) {
        return (
            <div key={index}>
                {value.actor.login}
                <a href={value.repo.url}>{value.repo.url}</a>
                {value.type}
            </div>
        );
    }
    
    render() {
        return (
            <div>
                <p>You are here: <NavLink to="/" activeClassName="active">Home</NavLink></p>
                {this.state.events.map((value, index) => (
                    this.renderUser(value, index)
                ))}
            </div>
        );
    }
}

export default User;