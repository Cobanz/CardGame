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
                    // console.log(data);
                }
                else
                {
                    resolve("Cannot draw a card from pile")
                }
            })
        })
    }

    function addToPile(cards, pileName)
    {
        let codes = cards.map( card => card.code );
        console.log(codes, "Before add to pile")
        return new Promise( resolve => {
            fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/add/?cards=${codes.join}`)
            .then(res => res.json())
            .then( (data) => {
                if(data.success)
                {
                    resolve(data);
                    console.log(data, "After add to pile");
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

        addToPile( [playerHand.cards[0], oppHand.cards[0]], "playerHand");

        setCardsRemaining({
            player: playerHand.piles.playerHand.remaining,
            opponent: oppHand.piles.opponentHand.remaining
        })

        setCards({
            player: playerHand.cards[0],
            opponent: oppHand.cards[0]
        })
    }

    function cardToNumber(card)
    {
        let {value} = card;

        switch (value)
        {
            case "ACE":
                return 14;
            case "KING":
                return 13; 
            case "QUEEN":
                return 12;
            case "JACK":
                return 11;
            default:
                return parseInt(value);
        }
    }

    async function checkWin()
    {
        let player = cardToNumber(cards.player);
        let opp = cardToNumber(cards.opponent);

        if(player === opp)
        {
            //tie game
            //whoever has the most cards at the time wins the game
        }

        if(player > opp)
        {
            //player wins
            //put both cards in player pile
            // let data = await addToPile([cards.player, cards.opponent], "playerHand");
            // setCardsRemaining({ player: data.remaining})
        }
        else
        {
            //opponent wins
            //put both cards in opponent pile
        }
    }

    return (
        <div>
            <div>
                <button onClick={flipCards}>War</button>
                <div className="player_field">
                    Player
                    Cards Remaining: {cardsRemaining.player}
                    <br></br>
                    Card value: {cardToNumber(cards.player)}
                    <div className="player_deck">
                        {displayCard(cards.player)}
                    </div>
                </div>
                <div className="computer_field">
                    Computer
                    Cards Remaining: {cardsRemaining.opponent}
                    <br></br>
                    Card value: {cardToNumber(cards.opponent)}
                    <div className="computer_deck">
                        {displayCard(cards.opponent)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayArea