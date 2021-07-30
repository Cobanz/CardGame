import React, { useState } from 'react'

function PlayArea(props) {
    let {deck_id} = props;
    const [cards, setCards] = useState({
        player: {},
        opponent: {}
    });
    const [cardsRemaining, setCardsRemaining] = useState({
        player: 26,
        opponent: 26
    });

    function displayCard(card)
    {
        if(card)
        {
            return <img alt={card.code} src={card.image} />
        }
    }

    function drawCard(pileName)
    {
       return new Promise( resolve => {
            fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/draw/?count=1`)
            .then(res => res.json())
            .then( (data) => {
                if(data.success)
                {
                    resolve(data);
                    console.log(data);
                }
                else
                {
                    resolve("Cannot draw a card from pile")
                }
            })
        })
    }
    
    async function flipCards()
    {
        let oppHand = await drawCard("opponentHand");
        let playerHand = await drawCard("playerHand");

        setCardsRemaining({
            player: playerHand.piles.playerHand.remaining,
            opponent: oppHand.piles.opponentHand.remaining
        })

        setCards({
            player: playerHand.cards[0],
            opponent: oppHand.cards[0]
        })
    }

    return (
        <div>
            <div>
                <button onClick={flipCards}>War</button>
                <div className="player_field">
                    player
                    <div className="player_deck">
                        {displayCard(cards.player)}
                    </div>
                </div>
                <div className="computer_field">
                    computer
                    <div className="computer_deck">
                        {displayCard(cards.opponent)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayArea