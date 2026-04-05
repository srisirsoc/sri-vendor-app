import React, { useEffect, useState } from 'react'
import EmptyState from '../../components/cards/empty-state.card';
import { GetId, GetSession } from '../../library/session-hub';
import { AVendor } from '../../actions/a.vendor';
import VendorForm from '../../components/forms/vendor.form';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const [lib, setLib] = useState({});
  const { slug } = useParams();
  const token = GetSession();

  const fetchData = async () => {

    if (!slug || !token) {
      setLib({ error: "Invalid authentication token!" });
      return;
    };

    try {
      const [v, s] = await Promise.all([AVendor.Details(slug, token), AVendor.GetStatics("section=get:all", token)]);
      const { success, message, error, data } = v;
      if (success) {
        setLib({ doc: data, gallery: data?.gallery || [], statics: s?.data || {}, token, error: data?._id ? null : "No data found!" });
      } else {
        setLib({ error: error || message });
      }
    } catch (err) {
      setLib({ error: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (lib.error) return <EmptyState title={lib.error} />;
  return (
    <div>
      <br />
      <br />
      <VendorForm lib={lib} />
    </div>
  )
}

export default EditProfile;