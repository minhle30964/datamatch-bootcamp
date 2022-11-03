import React from 'react';
import './CardEditor.css';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {front: '', back: ''};
    }
    
    addCard = () => {
        this.props.addCard(this.state);
        this.setState({front: '', back: ''});
    };

    deleteCard = index => {
        this.props.deleteCard(index);
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const cards = this.props.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick = {() => this.deleteCard(index)}>Delete Card</button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Card Editor</h2>
                <div class = 'wrapper'>
                    <button onClick = {this.props.switchMode}>Go to Card Viewer</button>
                </div>
                <hr />
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
                    <button onClick = {this.addCard}>Add Card</button>
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

export default CardEditor;
