import React from 'react';
import './CardViewer.css';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            back: true,
            display: "Click to Begin",
        };
    }

    flipCard = cards => {
        if (this.state.back) {
            this.setState({display: cards[this.state.index].front, back: !this.state.back});
        } else {
            this.setState({display: cards[this.state.index].back, back: !this.state.back});
        }
    };

    setDisplay = (cards, index) => {
        this.setState({index, display: cards[index].front, back: false});
    }

    lastCard = cards => {
        if (this.state.index > 0) {
            this.setDisplay(cards, this.state.index - 1);
        }
    };

    nextCard = cards => {
        if (this.state.index < cards.length - 1) {
            this.setDisplay(cards, this.state.index + 1);
        }
    };

    render() {
        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page Not Found</div>;
        }

        const cards = this.props.cards.slice();
        return (
            <div>
                <h2>{this.props.name} Deck Card Viewer</h2>
                <div class = 'wrapper'>
                    <Link to="/"><button class="btn btn-secondary">Go to Home Page</button></Link>
                </div>
                <hr />
                <p class = 'wrapper lead'>Progress: Card {this.state.index + 1} / {cards.length}</p>
                <div class="card" onClick = {() => this.flipCard(cards)}>
                    <div class="card-body">
                        <h1 class="display-2">{this.state.display}</h1>
                    </div>
                </div>
                <div class = 'wrapper'>
                    <button onClick = {() => this.lastCard(cards)} type="button" class="btn btn-outline-primary btn-lg">Previous Card</button>
                    <button onClick = {() => this.nextCard(cards)} type="button" class="btn btn-outline-primary btn-lg">Next Card</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { name: name, cards: cards };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
    }), 
    connect(mapStateToProps),
)(CardViewer);
