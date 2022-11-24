import React from 'react';
import './CardEditor.css';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return(
            <div class = 'wrapper'>
                <Link to="/editor"><button class="btn btn-secondary">Go to Card Editor</button></Link>
                <Link to="/viewer"><button class="btn btn-secondary">Go to Card Viewer</button></Link>
            </div>
        );
    }
}

export default HomePage;
