"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import ChatHeader from "./chat-header";
import "./all-chat-page-card.css";

export default function AllChatPageCard({ lib }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chats = lib?.docs || [];
  const hasChats = chats.length > 0;

  return (
    <div className="chat-app">

      {/* Sidebar */}
      <Sidebar
        docs={chats}
        toggle={sidebarOpen}
        setToggle={setSidebarOpen}
      />

      {/* Chat Section */}
      <div className={`chat-section ${sidebarOpen ? "sidebar-open" : ""}`}>

        <ChatHeader
          is_chats={true}
          typing={false}
          chat_info={null}
          toggleSidebar={() => setSidebarOpen(prev => !prev)}
        />

        {/* Empty State */}
        <div className="no-data">

          <p>No messages found!</p>

          {!hasChats ? (
            <span>
              Please create at least one chat with vendors!
            </span>
          ) : (
            <span>
              Please select one chat from chat menu!
            </span>
          )}

        </div>

      </div>

    </div>
  );
}