import React, { useEffect, useState} from 'react';
import PlayArea from './PlayArea';

function Game() {
    const [deckId, setDeckId] = useState(localStorage.deck_id);

    //RETURNS A PROMISE
    function shuffleDeck()
    {
        let promise = new Promise( resolve => {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
                .then( res => res.json())
                .then( data => {
                    resolve(data.deck_id);
                })
                .catch( err => {
                    resolve(false);
                })
        })

        return promise;
    }

    //RETURNS A PROMISE
    function fetchDeckId()
    {
        let promise = new Promise( resolve => {
            fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
                .then( res => res.json())
                .then( data => {
                    localStorage.deck_id = data.deck_id;
                    resolve(data.deck_id);
                })
                .catch( err => {
                    resolve(err);
                })
        })

       
        return promise;
    }

    //Returns a Promise with the data from deckofcardsapi
    function splitDeck()
    {
        let count = 26;

        // grab first 26 cards
        return (
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
            .then( res => res.json())
        )
    }

    //Returns an empty Promise (SAD!)

    function addCardsToPile(cards, pileName)
    {
        let codes = cards.map( card => {return card.code} );

        return (
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${codes.join()}`)
            .then( res => res.json() )
            .then( data => {
                console.log(data);
            })
        )
    }

    async function startupSequence()
    {
        if( await shuffleDeck() ) //If the deck shuffle fails, it's probably because there is no deck_id or the current deck_id is invalid
        {
            console.log("Successfully initialized with deck id: " + localStorage.deck_id);
        }
        else
        {

            let newId = await fetchDeckId();
            setDeckId(newId);
            //console.log("Successfully initialized with deck id: " + newId);
        }

        await splitDeck()
            .then( data => addCardsToPile(data.cards, "playerHand") );
        await splitDeck()
            .then( data => addCardsToPile(data.cards, "opponentHand") );
    }

    useEffect( () => {
        startupSequence();
    } )

   


    return (
        <div className="game_container">
            <div>
                Game : {deckId}
                <PlayArea restart={startupSequence} deck_id={deckId} />
            </div>
        </div>
    )
}


export default Game