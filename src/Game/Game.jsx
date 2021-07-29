import React, { useEffect } from 'react';

function Game() {
    let deck_id = "vgqhkmecfsol";

    function fetchDeckId()
    {
        if(!deck_id)
        {
            fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
                .then( res => res.json())
                .then( data => {
                    deck_id = data.deck_id;
                    console.log(deck_id);
                })
        }
    }

    function splitDeck()
    {
        let count = 26;

        // grab first 26 cards
        return (
            fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`)
            .then( res => res.json())
            .then( data => {
                console.log(data);
                addPlayerHand(data.cards) // put them in a player pile
            })
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
            })
        )
    }

    // useEffect( () => {
    //     splitDeck()
    //         .then( data => addPlayerHand(data.cards));
    // } )

    useEffect( () => { splitDeck() } )

    return (
        <div>
            Game {deck_id}
        </div>
    )
}



export default Game
