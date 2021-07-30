import React, { useState } from 'react'

function PlayArea(props) {
    let {deck_id} = props;
    const [cards, setCards] = useState({
        player: {},
        opponent: {}
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
            fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/draw/?count=1`)
            .then(res => res.json())
            .then( (data) => {
                if(data.success)
                {
                    resolve(data.cards[0]);
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
        let oppCard = await drawCard("opponentHand");
        let playerCard = await drawCard("playerHand");

        setCards({
            player: playerCard,
            opponent: oppCard
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