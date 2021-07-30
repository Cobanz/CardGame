import React, { useEffect, useState } from 'react';

function Game() {
    let deck_id = "vgqhkmecfsol";
    const [playerHand, setPlayerHand] = useState([]);
    const [opponentHand, setOpponentHand] = useState([]);

    function fetchDeckId()
    {
        let promise = null;

        if(!deck_id)
        {
            promise = new Promise( resolve => {
                fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
                    .then( res => res.json())
                    .then( data => {
                        deck_id = data.deck_id;
                        console.log(deck_id);
                        resolve(deck_id);
                    })
            })

        }
        else
        {//shuffle the deck
            promise = new Promise( resolve => {
                fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
                    .then( res => res.json())
                    .then( data => {
                        deck_id = data.deck_id;
                        console.log(deck_id);
                        resolve(deck_id);
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
            fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`)
            .then( res => res.json())
        )
    }

    function addPlayerHand(cards)
    {
        let codes = cards.map( card => {return card.code} );

        return (
            fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/pile/playerHand/add/?cards=${codes.join()}`)
            .then( res => res.json() )
            .then( data => {
                console.log(data);
                setPlayerHand(data.cards);
            })
        )
    }

    function addOpponentHand(cards)
    {
        let codes = cards.map( card => {return card.code} );

        return (
            fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/pile/opponentHand/add/?cards=${codes.join()}`)
            .then( res => res.json() )
            .then( data => {
                console.log(data);
            })
        )
    }

    async function startupSequence()
    {
        let response = await fetchDeckId();
        console.log(response);

        splitDeck()
            .then( data => addPlayerHand(data.cards) );
        splitDeck()
            .then( data => addOpponentHand(data.cards) );
    }

    useEffect( () => {
        startupSequence();
    } )

    // useEffect( () => { splitDeck() } )

    return (
        <div>
            Game {deck_id}
        </div>
    )
}



export default Game
