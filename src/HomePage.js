import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class HomePage extends React.Component {
    render() {
        if (!isLoaded(this.props.homepage)) {
            return <div>Loading...</div>;
        }

        const decks = Object.keys(this.props.homepage).map(id => {
            return (
                <div key={id}>
                    <Link class="dropdown-item" to={`/viewer/${id}`}>{this.props.homepage[id].name}</Link>
                </div>
            );
        });

        return(
            <div>
                <h2>Home Page</h2>
                <div class='wrapper'>
                    <Link to="/editor"><button class="btn btn-primary">Create New Card Deck</button></Link>
                </div>
                <hr />
                <div class='wrapper'>
                    <h2>Card Decks</h2>
                </div>
                <div class='wrapper'>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Decks of Cards
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {decks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { homepage: state.firebase.data.homepage };
}

export default compose(
    firebaseConnect(['/homepage']), 
    connect(mapStateToProps), 
)(HomePage);
