import React, { useState, useEffect } from 'react'
import "./style.css"
import Container from '../../components/cards/container.card'
import Pagination from '../../components/pagination/pagination';
import EmptyState from '../../components/cards/empty-state.card';
import { AOrder } from '../../actions/a.order';
import { useSearchParams } from 'react-router-dom';
import OrderCompactCard from '../../components/cards/service.history.card';
import { useAuth } from '../../hooks/data/useAuth';
import { useFetcher } from '../../hooks/data/useFetch';
import { useValidate } from '../../hooks/data/useValidate';
import Loader from '../../components/loader/loader';

const CallsPage = () => {
  const [search] = useSearchParams();
  const page = search.get('page') || 1;

  const { auth } = useAuth();

  const user_id = auth?.user_id || null;
  const token = auth?.token || null;

  const q = `&page=${page}&limit=50&type=VENDOR&vendor_id=${user_id}`;
  const { data, loading, error, refetch } = useFetcher([() => AOrder.GetAll(q, token)], user_id, token);
  const orders = useValidate(data?.res_0 || {});

  if (loading) return <Loader />;
  if (auth.error) return <EmptyState title={auth.message || auth.error} />;
  if (error) return <EmptyState title={error} />;
  if (orders?.error) return <EmptyState title={orders?.error} />;

  const docs = orders?.data?.docs || [];
  const p = orders?.data.pagination || {};

  return (
    <>
      <Container>
        <div className="order-min-grid">
          {docs?.map((item, i) => (<OrderCompactCard type={"CALL"} key={i} item={item} />))}
        </div>
        <br />
        <Pagination
          pages={p?.filter || 0}
          prev={p?.prev}
          next={p?.next}
          page={p?.page}
          limit={p?.limit}
          url={`/calls?`}
        />
      </Container>
    </>
  )
};
export default CallsPage