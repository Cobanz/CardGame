import React, { useState } from 'react';
import GameOver from "./GameOver.jsx"
// import cardBack from './card-back.jpeg'



function PlayArea(props) {
    let {deck_id} = props;
    const [shownCard, setShownCard] = useState({
        player: {},
        opponent: {}
    });
    const [cardsRemaining, setCardsRemaining] = useState({
        player: 26,
        opponent: 26
    });

    const [isGameOver, setIsGameOver] = useState(false)


    function displayCard(card)
    {
        if(card)
        {
            return <img alt={card.code} src={card.image} />
        }
        // else {
        //     return <img src={cardBack}/>
        // }
    }
    //Returns a promise which resolves to the card data
    function drawCard(pileName)
    {
       return new Promise( resolve => {
            fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/draw/?count=1`)
            .then(res => res.json())
            .then( (data) => {
                if(data.success)
                {
                    resolve(data);
                    console.log(data, "draw card");
                }
                else
                {
                    resolve("Cannot draw a card from pile")
                    console.log(data, "draw card");
                }
            })
        })
    }
    
    //Returns a promise which resolves to the pile data
    function addToPile(cards, pileName)
    {
        let codes = cards.map( card => card.code );
        console.log(codes, "Before add to pile")

        return new Promise( resolve => {
            fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/add/?cards=${codes.join(",")}`)
            .then(res => res.json())
            .then( (data) => {
                if(data.success)
                {
                    resolve(data);
                    // console.log(data, "After add to pile");
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
        console.log("begin war");
        let oppHand = await drawCard("opponentHand");
        let playerHand = await drawCard("playerHand");

        let data = await checkWin();

        console.log(data, "war result");

        if(data)
        {
            setCardsRemaining({
                player: data.piles.playerHand.remaining,
                opponent: data.piles.opponentHand.remaining
            })
        }

        setShownCard({
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
        let player = cardToNumber(shownCard.player);
        let opp = cardToNumber(shownCard.opponent);

        if(player === opp)
        {
            //tie game
            //whoever has the most cards at the time wins the game
            setIsGameOver(true) 
            return null;
        }

        if(player > opp)
        {
            //player wins
            //put both cards in player pile
            let data = await addToPile( [shownCard.player, shownCard.opponent], "playerHand");
            return data;
        }
        else
        {
            //opponent wins
            //put both cards in opponent pile
            let data = await addToPile( [shownCard.player, shownCard.opponent], "opponentHand");
            return data;
        }
    }

    function reset() {
        console.log("YEET GAME OVER RESET TIME")
        setIsGameOver(false)
        props.restart()
    }

    return (
        <div>
            <div>
            {isGameOver ? <GameOver reset={reset} isGameOver={isGameOver} cardsRemaining={cardsRemaining}></GameOver> : null }
                <button onClick={flipCards}>War</button>
                <div className="player_field">
                    Player Remaining: {cardsRemaining.player}
                    <br></br>
                    Card value: {cardToNumber(shownCard.player)}
                    <div className="player_deck">
                        {displayCard(shownCard.player)}
                    </div>
                </div>
                <div className="computer_field">
                    Computer Remaining: {cardsRemaining.opponent}
                    <br></br>
                    Card value: {cardToNumber(shownCard.opponent)}
                    <div className="computer_deck">
                        {displayCard(shownCard.opponent)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayArea