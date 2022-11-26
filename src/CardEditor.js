import React from 'react';
import './CardEditor.css';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {front: "front 1", back: "back1"},
                {front: "front 2", back: "back2"},
              ], 
            front: '', 
            back: '', 
            name: '', 
        };
    }
    
    addCard = () => {
        if (this.state.front.trim() !== "" && this.state.back.trim() !== "") {            
            const newCard = {front: this.state.front, back: this.state.back};
            const cards = this.state.cards.slice().concat(newCard);
            this.setState({cards, front: '', back: ''});
        }
    };

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({cards});
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    createDeck = () => {
        const deckId = this.props.firebase.push('/flashcards').key;
        const updates = {};
        const newDeck = { name: this.state.name, cards: this.state.cards };
        updates[`/flashcards/${deckId}`] = newDeck;
        updates[`/homepage/${deckId}`] = { name: this.state.name };
        const onComplete = () => {
            this.props.history.push(`/viewer/${deckId}`);
        };
        this.props.firebase.update('/', updates, onComplete);
    };

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button class="btn btn-outline-secondary" onClick = {() => this.deleteCard(index)}>Delete Card</button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Card Editor</h2>
                <div class = 'wrapper'>
                    <Link to="/"><button class="btn btn-secondary">Go to Home Page</button></Link>
                    <button 
                        disabled={!this.state.name.trim() || this.state.cards.length === 0} 
                        class="btn btn-success" 
                        onClick = {this.createDeck} 
                    >
                        Create Deck
                    </button>
                </div>
                <hr />
                <div class='wrapper'>
                    <div>Deck Name: 
                        <input 
                            name = 'name'
                            onChange = {this.handleChange} 
                            placeholder = 'Name of Deck'
                            value = {this.state.name} 
                        />
                    </div>
                </div>
                <div class = 'wrapper'>
                    <input 
                        name = 'front' 
                        onChange = {this.handleChange} 
                        placeholder = 'Front of Card' 
                        value = {this.state.front} 
                    />
                    <input 
                        name = 'back' 
                        onChange = {this.handleChange} 
                        placeholder = 'Back of Card' 
                        value = {this.state.back} 
                    />
                    <button class="btn btn-primary" onClick = {this.addCard}>Add Card</button>
                </div>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
            </div>
        );
    }
}

export default compose(firebaseConnect(), withRouter)(CardEditor);
