'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconsReact } from '../../library/icons';
import './empty-state.card.css';

const EmptyState = ({
  title = 'No data found!',
  subtitle = 'Something is missing to find data from database.',
  height = '300px',
  goback = true,
  reload = true,
  is_auth_error = false,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState({ reload: false, goback: false });

  const Reload = () => {
    setLoading({ reload: true, goback: false });
    setTimeout(() => {
      router.refresh();
      setLoading({ reload: false, goback: false });
    }, 500);
  };

  const GoBack = () => {
    setLoading({ reload: false, goback: true });
    setTimeout(() => {
      router.back();
      setLoading({ reload: false, goback: false });
    }, 500);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !is_auth_error) return;
    if ('cookieStore' in window) {
      cookieStore.getAll().then(cookies => cookies.forEach(c => cookieStore.delete(c)));
    } else {
      deleteAllCookies();
    };
  }, [is_auth_error])

  return (
    <div className="empty-state-container" style={{ minHeight: height }}>
      <div className="empty-state-card">
        <div className="empty-state-icon">{IconsReact.Alert}</div>
        <h2 className="empty-state-title">{title}</h2>
        {subtitle && <p className="empty-state-subtitle">{subtitle}</p>}
        <div className="empty-state-buttons">
          {reload && (
            <button
              onClick={Reload} className={`empty-btn ${loading.reload ? 'loading' : ''}`} >
              {IconsReact.Refresh} {loading[0] ? "Wait.." : "Reload"}
            </button>
          )}
          {goback && (
            <button
              onClick={GoBack}
              className={`empty-btn ${loading.goback ? 'loading' : ''}`}
            >
              {IconsReact.Left} {loading[1] ? "Wait.." : "Go Back"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmptyState;
