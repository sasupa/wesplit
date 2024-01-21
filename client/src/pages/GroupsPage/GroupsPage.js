// ExpensePage.js
import React, { useEffect, useState } from 'react';
import { fetchGroups } from '../../utils/apiUtils';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import GroupCard from '../../components/GroupCard/GroupCard';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchGroups()
      .then((data) => {
        setGroups(data.groups);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error('Fetching groups failed: ', error);
        setError(error.message);
        setLoading(false); // Set loading to false even when there's an error
      });
  }, []);

  return (
    <Container className='py-5'>
      <h1 className='text-center mb-4'>Your Groups</h1>

      {loading ? (
        <LoadingSpinner /> // Show loading spinner when loading
      ) : error ? (
        <div>Error: {error}</div> // Show error message if there's an error
      ) : (
        <div>
          {/* Display groups result */}
          {groups.map((group, index) => (
            <GroupCard
              key={index}
              groupId={group._id}
              groupName={group.name}
              members={group.members}
            />
          ))}
        </div>
      )}

      <Footer />
    </Container>
  );
};

export default GroupsPage;
