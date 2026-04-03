import { AOrder } from '@/actions/a.order';
import { redirect, notFound } from "next/navigation";
import AllChatPageCard from '@/components/chat/all-chat-page-card';
import { GetId, GetSession } from '@/library/session-hub';
import React from 'react'

const page = async () => {
  const lib = {};
  const [token, user_id] = await Promise.all([GetSession(), GetId()]);
  if (!token || !user_id) { redirect("/login") };
  lib.query = `&page=${page || 1}&limit=${50}&type=VENDOR&vendor_id=${user_id}`;
  const { data, success, error, message } = await AOrder.GetAll(lib.query, token);
  if (!success) {
    throw new Error(message || "Failed to load chat data");
  };

  lib.user_id = user_id;
  lib.token = token;
  lib.docs = data?.docs;

  return (
    <div className='bg-slate-800'>
      <AllChatPageCard lib={lib} />
    </div>
  )
}

export default page