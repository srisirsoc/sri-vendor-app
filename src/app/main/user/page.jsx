import React from 'react'
import UserProfile from './user-profile';
import Container from '@/components/cards/container.card';
import { GetId, GetSession } from '@/library/session-hub';
import { AVendor } from '@/actions/a.vendor';
import EmptyState from '@/components/cards/empty-state.card';

const page = async () => {
  const lib = {};
  const [id, token] = await Promise.all([GetId(), GetSession()]);
  lib.id = id || null;
  lib.token = token || null;

  if (!lib.id || !lib.token) return <EmptyState title={"Invalid authentication token!"} />;
  try {
    const { success, message, error, data } = await AVendor.Details(id, lib.token);
    if (success) {
      lib.doc = data;
      lib.gallery = data?.gallery.length > 0 ? data?.gallery : ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'];
      lib.error = data?._id ? null : "No data found!";
    } else {
      lib.error = error || message;
    };
  } catch (error) {
    console.error(error);
    lib.error = error.message;
  };

  if (lib.error) return <EmptyState title={lib.error} />;
  
  return (
    <div>
      <Container>
        <UserProfile lib={lib} />
      </Container>
    </div>
  )
}

export default page;