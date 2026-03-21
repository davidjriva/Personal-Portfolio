'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const currentStreamController = useRef(null);
  const assistantTextRef = useRef('');

  const fetchToken = useCallback(async (captchaToken) => {
    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captchaToken }),
      });
      if (!res.ok) throw new Error('Token fetch failed');
      const data = await res.json();
      setToken(data.token);
      setSessionId(data.sessionId);
    } catch (err) {
      console.error('Failed to get token:', err);
    }
  }, []);

  const sendMessage = useCallback(
    async (userMessage) => {
      if (!userMessage.trim() || !sessionId) return;

      if (!started) setStarted(true);

      // Abort previous stream
      if (currentStreamController.current) currentStreamController.current.abort();

      setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);

      const controller = new AbortController();
      currentStreamController.current = controller;

      let assistantIndex;
      assistantTextRef.current = '';
      setMessages((prev) => {
        assistantIndex = prev.length;
        return [...prev, { role: 'assistant', text: '', typing: true }];
      });

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: userMessage, sessionId }),
          signal: controller.signal,
        });

        if (res.status === 429) {
          const data = await res.json();
          setMessages((prev) => [...prev, { role: 'assistant', type: 'rate-limit', text: data.error }]);
          return;
        }

        if (!res.body) throw new Error('No response body');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let updateScheduled = false;

        const flushBuffer = () => {
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex ? { ...msg, text: assistantTextRef.current + buffer, typing: true } : msg
            )
          );
          assistantTextRef.current += buffer;
          buffer = '';
          updateScheduled = false;
        };

        const scheduleUpdate = () => {
          if (!updateScheduled) {
            updateScheduled = true;
            requestAnimationFrame(flushBuffer);
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          scheduleUpdate();
        }

        if (buffer) flushBuffer();

        // Stop typing
        setMessages((prev) => prev.map((msg, i) => (i === assistantIndex ? { ...msg, typing: false } : msg)));
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sending message:', err);
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', text: 'Sorry, there was an error sending the message.' },
          ]);
        }
      } finally {
        currentStreamController.current = null;
      }
    },
    [sessionId, started, token]
  );

  return { messages, started, sendMessage, setStarted, fetchToken, hasToken: !!token };
}
