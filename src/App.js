/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Board from './components/Board';
import Navbar from './components/Navbar';

import initializeDeck from './desk'

export default function App() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [wins, setWins] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
  resizeBoard()
  setCards(initializeDeck())
}, [])

useEffect(() => {
  if (cards.length) {
    preloadImages()
  }
}, [cards])

useEffect(() => {
  console.log("Брой карти:", cards.length);
  console.table(cards);
}, [cards]);

  useEffect(() => {
    resizeBoard()
    setCards(initializeDeck())
    preloadImages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard)
    return () => window.removeEventListener('resize', resizeListener)
  })

  useEffect(() => {
    checkScore();
  
  }, [score]); // Only re-run the effect if count changes

  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    }
    else {
      if (sameCardClicked(id)) return
      setFlipped([flipped[0],id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
        updateScore(score, checkScore);
      } else {
        noMatch();
      }
    }
  }

  const noMatch = () => {
    updateGuesses(wrongGuesses, checkGuesses);
    setTimeout(resetCards, 1000);
  }

  function updateScore(score, callback) {
    var newScore = score + 1;
    setScore(score + 1);
    callback(newScore);
  }

  function updateGuesses(wrongGuesses, callback) {
    var newGuesses = wrongGuesses + 1;
    setWrongGuesses(wrongGuesses + 1);
    callback(newGuesses);
  }

  const checkScore = (score) => {
    if (score>7) {
      setWins(wins + 1);
      setTimeout(newGame, 2000);
    }
  }

  const checkGuesses = (wrongGuesses) => {
    if (wrongGuesses>13) {
      setLosses(losses + 1);
      setTimeout(newGame, 2000);
    }
  }

  const newGame = () => {
    setSolved([]);
    setCards(initializeDeck());
    setWrongGuesses(0);
    setScore(0);
  }

  const preloadImages = () => {
    console.log(cards.length)
    // eslint-disable-next-line array-callback-return
    cards.map(card => {
      const src = `/images/${card.type}.png`
      new Image().src = src
    })
  }

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  }

  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card)=> card.id ===id);
    const flippedCard = cards.find((card) => flipped[0]===card.id);
    return flippedCard.type ===clickedCard.type;
  }

  const resizeBoard = () => {
    setDimension(Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ))
  }

  return (
    <div 
      className="app"
      style={{
        textAlign: "center"
      }}
    >
      <Navbar 
        wins={wins}
        losses={losses}
        score={score}
        wrongGuesses={wrongGuesses}
        newGame={newGame}
      />
      <Board 
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  )
}