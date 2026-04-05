import { useParams } from "react-router-dom";
import { AOrder } from "../../actions/a.order";
import { AChat } from "../../actions/a.chat";
import { useFetcher } from "../../hooks/data/useFetch";
import { useAuth } from "../../hooks/data/useAuth";
import { useValidate } from "../../hooks/data/useValidate";
import ChatCard from "../../components/chat/chat-card";
import Loader from "../../components/loader/loader";
import EmptyState from "../../components/cards/empty-state.card";

export const revalidate = 5;
export default function ChatDetailsPage() {
  const { auth } = useAuth();
  const user_id = auth?.user_id || null;
  const token = auth?.token || null;

  const slug = useParams()?.slug || null;

  const { data, loading, error } = useFetcher([
    () => AOrder.Details(slug, token),
    () => AOrder.GetAll(`&page=1&limit=30&user_id=${user_id}&type=VENDOR`, token),
    () => AChat.GetAll(`&page=1&limit=300&order_id=${slug}`, token),
  ], user_id, token);

  const single_chat_info = useValidate(data?.res_0 || {});
  const all_chats_info = useValidate({ ...(data?.res_1 || []), is_array: true });
  const messages = useValidate({ ...(data?.res_2 || []), is_array: true });

  if (loading) return <Loader />;
  if (error) return <EmptyState title={error} />;

  const lib = {};
  lib.chat_info = single_chat_info?.data || {};
  lib.chats_info = all_chats_info?.data?.docs || [];
  lib.messages = messages?.data?.docs || [];
  lib.user_id = user_id;
  lib.token = token;

  return (
    <ChatCard lib={lib} />
  );
}
