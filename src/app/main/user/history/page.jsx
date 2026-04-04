import React from 'react'
import { GetId, GetSession } from '@/library/session-hub';
import EmptyState from '@/components/cards/empty-state.card';
import Container from '@/components/cards/container.card';
import { AWalletHistory } from '@/actions/a.wallet-history';
import WalletHistoryCard from './wallet.history.card';
import Pagination from '@/components/pagination/pagination';

const page = async ({ searchParams }) => {
  const lib = {};
  const { tab, page } = await searchParams;
  lib.query = `&page=${page || 1}&limit=${12}`;
  const [token, user_id] = await Promise.all([GetSession(), GetId()]);
  lib.token = token;
  if (!lib.docs) {
    try {
      let res = { success: false, message: "No data found!", error: "No data found!", data: null };

      if (tab == "WALLET") {
        lib.order_type = "WALLET";
        res = await AWalletHistory.GetAll(lib.query, lib.token);
      };
      if (tab == "CART") {
        lib.order_type = "CART";
      }
      const { success, message, error, data } = res;
      if (success) {
        lib.docs = data?.docs;
        lib.data = data.pagination;
        lib.error = data?.docs.length > 0 ? null : "No data found!";
      } else {
        lib.error = error || message;
      };
    } catch (error) {
      console.error(error);
      lib.error = error.message;
    }
  };
  if (lib.error) return <EmptyState title={lib.error} />;
  const docs = lib?.docs || [];
  const p = lib.data || {};

  return (
    <>
      <br />
      <Container>
        {
          lib?.order_type == "WALLET" &&
          <div className="wallet-grid">
            {docs.map((item, i) => (<WalletHistoryCard key={i} item={item} />))}
          </div>
        }
        {lib?.order_type == "CART" && <EmptyState data={docs || []} />}

        <br />
        <Pagination
          pages={p?.filter || 0}
          prev={p?.prev}
          next={p?.next}
          page={p?.page}
          limit={p?.limit}
          url={`/user/history?&tab=${tab}`}
        />
      </Container>
    </>
  )
};
export default page