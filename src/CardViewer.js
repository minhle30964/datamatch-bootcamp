import React from 'react';
import './CardViewer.css';

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
        const cards = this.props.cards.slice();
        return (
            <div>
                <h2>Card Viewer</h2>
                <div class = 'wrapper'>
                    <button onClick = {this.props.switchMode}>Go to Card Editor</button>
                </div>
                <hr />
                <p class = 'wrapper lead'>Progress: Card {this.state.index + 1} / {cards.length}</p>
                <div class="card" onClick = {() => this.flipCard(cards)}>
                    <div class="card-body">
                        <h1 class="display-2">{this.state.display}</h1>
                    </div>
                </div>
                <div class = 'wrapper'>
                    <button onClick = {() => this.lastCard(cards)} type="button" class="btn btn-primary btn-lg">Previous Card</button>
                    <button onClick = {() => this.nextCard(cards)} type="button" class="btn btn-primary btn-lg">Next Card</button>
                </div>
            </div>
        );
    }
}

export default CardViewer;
