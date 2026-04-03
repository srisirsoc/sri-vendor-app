import React from 'react'
import { GetSession } from '@/library/session-hub';
import { AOrder } from '@/actions/a.order';
import EmptyState from '@/components/cards/empty-state.card';
import "./style.css"
import OrderCompactCard from '@/components/cards/service.history.card';
import Container from '@/components/cards/container.card';
import Pagination from '@/components/pagination/pagination';

const page = async ({ searchParams }) => {
  const lib = {};
  const [q, token] = await Promise.all([searchParams, GetSession()]);
  lib.p = q.page || 1;
  lib.token = token || null;
  if (!lib.docs) {
    try {
      lib.query = `&page=${lib.p || 1}&limit=${20}&type=VENDOR`;
      const { success, message, error, data } = await AOrder.GetAll(lib.query, lib.token);
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
      <Container>
        <div className="order-min-grid">
          {docs?.map((item, i) => (<OrderCompactCard type={"VCALL"} key={i} item={item} />))}
        </div>
        <br />
        <Pagination
          pages={p?.filter || 0}
          prev={p?.prev}
          next={p?.next}
          page={p?.page}
          limit={p?.limit}
          url={`/v-calls?`}
        />
      </Container>
    </>
  )
};
export default page