import React from "react";
import "./styles.css";

const Navbar = props => (  //props ar : wins, losses, score, wrongGuesses, newGame
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div>
      <ul className="navbar-nav">
      <li className="instruction">
          <div>MEMORY GAME</div>
  
            <div className="instruction">Match the cards! </div>
        </li>
        <li className="nav-item">
          <button className="restart" onClick={() => props.newGame()}>
            Restart Game
          </button>
        </li>
        <li className="nav-item">
         
              <div className="wins">Wins: {props.wins} </div>         
              <div className="losses">Losses: {props.losses} </div>
          
        </li>
        <li className="nav-item">
            <div className="score">Score: {props.score}/8</div>

            <div className="wrongGuesses">Incorrect: {props.wrongGuesses}/8</div>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;