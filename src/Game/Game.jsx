import React, { useEffect} from 'react';
import PlayArea from './PlayArea';

function Game() {
    let deck_id = localStorage.deck_id;

    function fetchDeckId()
    {
        let promise = null;

        if(!deck_id)
        {
            promise = new Promise( resolve => {
                fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
                    .then( res => res.json())
                    .then( data => {
                        localStorage.deck_id = data.deck_id;
                        resolve(deck_id);
                    })
                    .catch( err => {
                        resolve(err);
                    })
            })

        }
        else
        {//shuffle the deck
            promise = new Promise( resolve => {
                fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
                    .then( res => res.json())
                    .then( data => {
                        resolve(deck_id);
                    })
                    .catch( err => {
                        resolve(err);
                    })
            })
        }

        return promise;
    }

    function splitDeck()
    {
        let count = 26;

        // grab first 26 cards
        return (
            fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`)
            .then( res => res.json())
        )
    }

    function addCardsToPile(cards, pileName)
    {
        let codes = cards.map( card => {return card.code} );

        return (
            fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/add/?cards=${codes.join()}`)
            .then( res => res.json() )
            .then( data => {
                // console.log(data);
            })
        )
    }

    async function startupSequence()
    {
        let response = await fetchDeckId();
        console.log("Successfully initialized with deck id: " + response);

        splitDeck()
            .then( data => addCardsToPile(data.cards, "playerHand") );
        splitDeck()
            .then( data => addCardsToPile(data.cards, "opponentHand") );
    }

    useEffect( () => {
        startupSequence();
    } )

    return (
        <div className="game_container">
            <div>
                Game : {deck_id}
                <PlayArea deck_id={deck_id} />
            </div>
        </div>
    )
}


export default Game