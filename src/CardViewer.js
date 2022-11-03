import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
    render() {
        return (
            <div>
                <h2>Card Viewer</h2>
                <div class = 'wrapper'>
                    <button onClick = {this.props.switchMode}>Go to Card Editor</button>
                </div>
                <hr />
                <div class="card">
                    <div class="card-body">
                        <h1 class="display-2">2 + 2</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardViewer;
