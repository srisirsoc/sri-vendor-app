import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetId, GetSession } from "@/library/session-hub";
import { AChat } from "@/actions/a.chat";
import ChatCard from "@/components/chat/chat-card";
import { AOrder } from "@/actions/a.order";
import EmptyState from "@/components/cards/empty-state.card";

export default function ChatDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lib, setLib] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [token, user_id] = await Promise.all([GetSession(), GetId()]);
      if (!token || !user_id) {
        navigate("/login");
        return;
      }
      try {
        const [single_chat_info, all_chats_info, messages] = await Promise.all([
          AOrder.Details(slug, token),
          AOrder.GetAll(`&page=1&limit=30&user_id=${user_id}&type=VENDOR`, token),
          AChat.GetAll(`&page=1&limit=30&order_id=${slug}`, token),
        ]);

        if (!single_chat_info?.success || !single_chat_info.data?._id) {
          setError("Chat not found");
          setLoading(false);
          return;
        }
        if (!all_chats_info?.success || !messages?.success) {
          throw new Error("Failed to load chat data");
        }

        setLib({
          chat_info: single_chat_info?.data || {},
          chats_info: all_chats_info?.data?.docs || [],
          messages: messages?.data?.docs || [],
          user_id,
          token,
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <EmptyState title={error} />;

  return (
    <ChatCard lib={lib} />
  );
}
