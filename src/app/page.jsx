"use client";
import React, { useEffect, useState } from "react";
import Home from "../components/cards/home-page";
import EmptyState from "../components/cards/empty-state.card";
import { AVendor } from '@/actions/a.vendor';
import GlobalMemo from "@/library/chache";

const MediaDebug = () => {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSupported(
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    );
  }, []);

  const stopStream = stream => {
    stream.getTracks().forEach(track => track.stop());
  };

  const testMicrophone = async () => {
    if (!supported) {
      setStatus("error");
      setMessage("Microphone capture is not supported in this environment.");
      return;
    }

    setStatus("running");
    setMessage("Requesting microphone access...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stopStream(stream);
      setStatus("success");
      setMessage("Microphone access granted.");
    } catch (error) {
      setStatus("error");
      setMessage(error?.message || "Microphone access denied or unavailable.");
    }
  };

  return (
    <section className="media-debug-panel" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '12px', marginBottom: '1rem', background: '#fafafa' }}>
      <h2>Microphone Debug</h2>
      <p>Supported: {supported ? "Yes" : "No"}</p>
      <button onClick={testMicrophone} style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: '#2d6cdf', color: '#fff', cursor: 'pointer' }}>
        Test microphone access
      </button>
      {status !== "idle" && (
        <div style={{ marginTop: '0.75rem' }}>
          <strong>{status === "success" ? "Success" : "Error"}:</strong> {message}
        </div>
      )}
    </section>
  );
};

export default function Page() {
  const [lib, setLib] = useState({ query: '&page=1&limit=12', loading: true });

  useEffect(() => {
    const fetchData = async () => {
      const query = '&page=1&limit=12';
      const MemoData = GlobalMemo.memoize(async () => await AVendor.GetAll(query), query, 5 * 60 * 1000);
      const { success, message, error, data } = await MemoData();

      if (success) {
        setLib({ query, docs: data.docs || [], loading: false });
      } else {
        setLib({ query, error: error || message || 'Failed to fetch vendors', loading: false });
      }
    };

    fetchData();
  }, []);

  if (lib.loading) {
    return <div className="loading">Loading...</div>;
  }

  if (lib.error) {
    return (
      <>
        <MediaDebug />
        <EmptyState title={lib.error} />
      </>
    );
  }

  return (
    <>
      <MediaDebug />
      <Home lib={lib} />
    </>
  );
}
