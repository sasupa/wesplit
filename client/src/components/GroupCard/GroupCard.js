// GroupCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ groupId, groupName, m1, m1b, m2, m2b }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/expenses/${groupId}`);
      };

  return (
    <Card className="my-3" onClick={handleCardClick}>
      <Card.Header>{groupName}</Card.Header>
      <Card.Body>
          <div className="mb-2">
            <strong>{m1}:</strong> Balance: {m1b}€
          </div>
          <div className="mb-2">
            <strong>{m2}:</strong> Balance: {m2b}€
          </div>
      </Card.Body>
    </Card>
  );
};

export default GroupCard;