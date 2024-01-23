// GroupCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ groupId, groupName, members }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`${groupId}`);
  };

  return (
    <Card className='my-3' onClick={handleCardClick}>
      <Card.Header>{groupName}</Card.Header>
      <Card.Body>
        {members.map((member, index) => (
          <div className='mb-2' key={index}>
            <strong>{member.userId.name}</strong>, balance: {parseFloat(member.balance)}€
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default GroupCard;
