import React from 'react';
import style from './FriendList.module.css'

function FriendList() {
  const friends = ['Amigo 1', 'Amigo 2', 'Amigo 3']; // Añade tus amigos aquí

  return (
    <div className="sidebar">
      <h2>Amigos</h2>
      <ul className="friend-list">
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
