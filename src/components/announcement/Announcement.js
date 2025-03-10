import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayPokemonCard from "../displaypokemoncard/DisplayPokemonCard";

function Announcement({
  selectedPokemon,
  randomPokemon,
  playerID,
  score,
  setScore,
}) {
  let winner;
  const navigate = useNavigate();
  //const updateScoreURL = `http://localhost:3080/game/leaderboard/${playerID}`;
  const updateScoreURL = `${process.env.REACT_APP_API_ENDPOINT}/game/leaderboard/${playerID}`;

  const goToStart = () => {
    axios
      .put(updateScoreURL, { score, active: false })
      .then((res) => console.log(res));
    navigate("/");
  };
  const goToNewFight = () => {
    setScore((prevScore) => prevScore + 1);
    navigate("/pokefight");
  };

  if (selectedPokemon.info.base.Attack > randomPokemon.info.base.HP) {
    winner = true;
  } else {
    winner = false;
  }

  return (
    <div className="announcement-container">
      {winner && (
        <>
          <h3>You Won !</h3>
          <div className="winner">
            <DisplayPokemonCard pokemonToDisplay={selectedPokemon} />
          </div>

          <button className="playbtn" id="nextTime" onClick={goToNewFight}>
            Let's fight again
          </button>
        </>
      )}
      {!winner && (
        <>
          <h3>You lost the fight, the computer won</h3>
          <div className="winner">
            <DisplayPokemonCard pokemonToDisplay={randomPokemon} />
          </div>

          <button className="playbtn" id="nextTime" onClick={goToStart}>
            Maybe next time
          </button>
        </>
      )}
    </div>
  );
}

export default Announcement;
