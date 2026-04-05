import React, { useState, useEffect } from 'react'
import UserProfile from './user-profile';
import Container from '../../components/cards/container.card';
import EmptyState from '../../components/cards/empty-state.card';
import { AVendor } from '../../actions/a.vendor';
import { GetId, GetSession } from '../../library/session-hub';

const VendorPage = () => {
  const [lib, setLib] = useState({});

  const fetchData = async () => {
    const [id, token] = await Promise.all([GetId(), GetSession()]);

    if (!id || !token) {
      setLib({ error: "Invalid authentication token!" });
      return;
    }
    try {
      const { success, message, error, data } = await AVendor.Details(id, token);
      if (success) {
        setLib({
          doc: data,
          gallery: data?.gallery.length > 0 ? data?.gallery : ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'],
          error: data?._id ? null : "No data found!"
        });
      } else {
        setLib({ error: error || message });
      }
    } catch (err) {
      console.error(err);
      setLib({ error: err.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (lib.error) return <EmptyState title={lib.error} />;

  return (
    <div>
      <Container>
        <UserProfile lib={lib} />
      </Container>
    </div>
  )
}

export default VendorPage;