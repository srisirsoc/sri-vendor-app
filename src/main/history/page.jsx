import React, { useState, useEffect } from 'react'
import WalletHistoryCard from './wallet.history.card';
import OrderHistoryCard from './service.history.card';
import { useSearchParams } from 'react-router-dom';
import { AWalletHistory } from '../../actions/a.wallet-history';
import EmptyState from '../../components/cards/empty-state.card';
import Pagination from '../../components/pagination/pagination';
import Container from '../../components/cards/container.card';
import { useAuth } from '../../hooks/data/useAuth';
import { useFetcher } from '../../hooks/data/useFetch';
import { useValidate } from '../../hooks/data/useValidate';
import Loader from '../../components/loader/loader';

const HistoryPage = () => {
  const { auth } = useAuth();

  const [search] = useSearchParams();
  const tab = search.get("tab");
  const page = search.get('page') || 1;

  const user_id = auth?.user_id || null;
  const token = auth?.token || null;

  const q = `&page=${page}&limit=50`;
  const { data, loading, error, refetch } = useFetcher([() => AWalletHistory.GetAll(q, token)], user_id, token);
  const orders = useValidate(data?.res_0 || {});

  if (loading) return <Loader />;
  if (auth.error) return <EmptyState title={auth.message || auth.error} />;
  if (error) return <EmptyState title={error} />;
  if (orders?.error) return <EmptyState title={orders?.error} />;

  const docs = orders?.data?.docs || [];
  const p = orders?.data.pagination || {};

  return (
    <>
      <br />
      <Container>
        {tab === "WALLET" &&
          <div className="wallet-grid">
            {docs.map((item, i) => (<WalletHistoryCard key={i} item={item} />))}
          </div>
        }
        {tab === "cart" && <EmptyState data={docs || []} />}

        <br />
        {tab != "cart" && <Pagination
          pages={p?.filter || 0}
          prev={p?.prev}
          next={p?.next}
          page={p?.page}
          limit={p?.limit}
          url={`/history?&tab=${tab}`}
        />}
      </Container>
    </>
  )
};
export default HistoryPage