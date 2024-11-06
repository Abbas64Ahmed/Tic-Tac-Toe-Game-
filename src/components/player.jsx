import { useState } from "react";

export default function Player({ InitialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(InitialName);
  const [isEditing, setIsEditing] = useState(false);
  // console.log(isEditing);

  function handleEditClick() {
    setIsEditing(!isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    // console.log(event.target.value);
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input type="text" required value={playerName} onChange={handleChange}></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}
