import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import EmptyState from '@/components/cards/empty-state.card';
import VendorForm from '@/components/forms/vendor.form';
import { GetId, GetSession } from '@/library/session-hub';
import { AVendor } from '@/actions/a.vendor';

const UserDetailsPage = () => {
  const { slug } = useParams();
  const [lib, setLib] = useState({ slug });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [id, token] = await Promise.all([GetId(), GetSession()]);
      const updatedLib = { ...lib, id: id || slug || null, token: token || null };

      if (!updatedLib.id || !updatedLib.token) {
        setLib({ ...updatedLib, error: "Invalid authentication token!" });
        setLoading(false);
        return;
      }
      try {
        const [d, s] = await Promise.all([AVendor.Details(id, updatedLib.token), AVendor.GetStatics("section=get:all", updatedLib.token)]);
        if (d.success && d.data?._id) {
          updatedLib.doc = d.data;
          updatedLib.gallery = d?.data?.gallery.length > 0 ? d?.data?.gallery : ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'];
        } else {
          updatedLib.error = d.error || d.message;
        }

        if (s.success) {
          updatedLib.statics = s?.data || {};
        } else {
          updatedLib.error = s.error || s.message;
        }
      } catch (error) {
        console.error(error);
        updatedLib.error = error.message;
      }
      setLib(updatedLib);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (lib.error) return <EmptyState title={lib.error} />;

  return (
    <div>
      <br />
      <br />
      <VendorForm lib={lib} />
    </div>
  );
};

export default UserDetailsPage;