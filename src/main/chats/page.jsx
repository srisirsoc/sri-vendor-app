// pages/ChatsPage.js
import React from "react";
import { AOrder } from "../../actions/a.order";
import ChatCard from "../../components/chat/chat-card";
import EmptyState from "../../components/cards/empty-state.card";
import Loader from "../../components/loader/loader";
import { useAuth } from "../../hooks/data/useAuth";
import { useFetcher } from "../../hooks/data/useFetch";
import AllChatPageCard from "../../components/chat/all-chat-page-card";
import { useValidate } from "../../hooks/data/useValidate";
const ChatsPage = () => {
  const { auth } = useAuth();

  const user_id = auth?.user_id || null;
  const token = auth?.token || null;

  const q = `&page=1&limit=50&type=VENDOR&vendor_id=${user_id}`;
  const { data, loading, error, refetch } = useFetcher([() => AOrder.GetAll(q, token)], user_id, token);
  const chats = useValidate(data?.res_0 || {});

  if (loading) return <Loader />;
  if (auth.error) return <EmptyState title={auth.message || auth.error} />;
  if (error) return <EmptyState title={error} />;
  if (chats?.error) return <EmptyState title={chats?.error} />;

  const lib = {
    docs: chats?.data?.docs || [],
    user_id,
    token,
    refetch,
  };

  return (
    <div className="bg-slate-800 min-h-screen p-4">
      <AllChatPageCard lib={lib} />
    </div>
  );
};

export default ChatsPage;