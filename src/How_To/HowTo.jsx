import React from 'react'
import { ReactVideo } from "reactjs-media";
import game from "./game_recording.mov";
import image from "./game-image.png"

function HowTo() {
    return (
        <div className="how-to-container">
            <div> <b>THE DEAL : </b>
                <div>
                    The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places their stack of cards face down, in front of them.
                </div>
            </div>
            <br/>
            <div> <b>THE PLAY :</b>
                <div>
                    Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.
                    If the cards are the same rank, it is a draw and the end of the War. The game will end here. 
                </div>
            </div>
            <br/>
            <div> <b>HOW TO KEEP SCORE :</b>
                <div>
                    The player with the most cards at the time of a draw or all of the cards in there deck is the winner.
                </div>
            </div>
            <br/>
            <ReactVideo
                src={game}
                poster={image}
                primaryColor="red"
                // other props
            />
        </div>
    )
}

export default HowTo
