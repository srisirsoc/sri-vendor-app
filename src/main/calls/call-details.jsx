import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/data/useAuth';
import { useFetcher } from '../../hooks/data/useFetch';
import { useValidate } from '../../hooks/data/useValidate';
import Loader from '../../components/loader/loader';
import EmptyState from '../../components/cards/empty-state.card';
import { ACall } from '../../actions/a.call';
import CallsPage from '../../components/call/call.main';

const CallDetailsPage = () => {

  const { slug } = useParams();
  const { auth } = useAuth();

  const user_id = auth?.user_id || null;
  const token = auth?.token || null;

  const { data, loading, error, refetch } = useFetcher([() => ACall.Details(slug, token)], user_id, token);
  const orders = useValidate(data?.res_0 || {});

  if (loading) return <Loader />;
  if (auth.error) return <EmptyState title={auth.message || auth.error} />;
  if (error) return <EmptyState title={error} />;
  if (orders?.error) return <EmptyState title={orders?.error} />;

  if (orders?.data.status == "CANCELLED") return <EmptyState title={"Order already CANCELLED!"} />;;
  if (orders?.data.status == "COMPLETE") return <EmptyState title={"Order already COMPLETE!"} />;

  const doc = orders?.data || {};
  const lib = { docs: doc, token };

  return (<CallsPage lib={lib} />)
};
export default CallDetailsPage