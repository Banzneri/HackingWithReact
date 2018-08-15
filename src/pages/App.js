import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <Link to="/"><h1>Unofficial Github Browser v0.1</h1></Link>
            </div>
        );
    }
}

export default App;