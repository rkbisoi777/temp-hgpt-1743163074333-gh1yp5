import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChatInterface } from '../components/ChatInterface';

export function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = location.state?.initialQuery;

  useEffect(() => {
    if (!initialQuery) {
      navigate('/');
    }
  }, [initialQuery, navigate]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <ChatInterface initialQuery={initialQuery} />
    </div>
  );
}