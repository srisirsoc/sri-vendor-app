import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetSession } from '@/library/session-hub';
import CallMain from '@/components/call/call.main';
import EmptyState from '@/components/cards/empty-state.card';
import { ACall } from '@/actions/a.call';

const CallDetailsPage = () => {
  const { slug } = useParams();
  const [lib, setLib] = useState({ slug });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const t = await GetSession();
      const updatedLib = { ...lib, token: t || null, slug };
      if (!updatedLib.docs && updatedLib.token && updatedLib.slug) {
        try {
          const { success, message, error, data } = await ACall.Details(updatedLib.slug, updatedLib.token);
          if (success) {
            updatedLib.docs = data;
            updatedLib.error = !data?._id ? "No data found!" : null;
            if (data.status == "CANCELLED") { updatedLib.error = "Order already CANCELLED!" };
            if (data.status == "COMPLETE") { updatedLib.error = "Order already COMPLETE!" };
          } else {
            updatedLib.error = error || message;
          };
        } catch (error) {
          console.error(error);
          updatedLib.error = error.message;
        }
      };
      setLib(updatedLib);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (lib.error) return <EmptyState title={lib.error} />;
  return (
    <CallMain lib={lib} />
  );
};

export default CallDetailsPage;