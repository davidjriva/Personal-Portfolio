'use client';

import { useState, useRef, useCallback } from 'react';

const MODEL_UNAVAILABLE_MSG = 'The model is currently unavailable. Please try again later.';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const currentStreamController = useRef(null);
  const assistantTextRef = useRef('');
  const expiryTimeoutRef = useRef(null);

  const fetchToken = useCallback(async (captchaToken) => {
    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ captchaToken }),
      });
      if (!res.ok) throw new Error('Token fetch failed');
      const data = await res.json();
      setHasToken(Boolean(data.ok || data.token));

      if (expiryTimeoutRef.current) clearTimeout(expiryTimeoutRef.current);
      const ttlMs = ((data.expiresIn || 300) - 15) * 1000;
      if (ttlMs > 0) {
        expiryTimeoutRef.current = setTimeout(() => {
          setHasToken(false);
        }, ttlMs);
      }
    } catch (err) {
      console.error('Failed to get token:', err);
      setHasToken(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (userMessage) => {
      if (!userMessage.trim() || !hasToken) return;

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
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'same-origin',
          body: JSON.stringify({ message: userMessage }),
          signal: controller.signal,
        });

        if (res.status === 401) {
          setHasToken(false);
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex
                ? {
                    ...msg,
                    type: 'error',
                    text: 'Your chat session expired. Re-verifying automatically — please send your message again.',
                    typing: false,
                  }
                : msg
            )
          );
          return;
        }

        if (res.status === 429) {
          const data = await res.json().catch(() => ({}));
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex
                ? {
                    ...msg,
                    type: 'rate-limit',
                    text: data.error || '⚠️ Rate limit exceeded. Please wait 1 minute.',
                    typing: false,
                  }
                : msg
            )
          );
          return;
        }

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex
                ? {
                    ...msg,
                    type: 'error',
                    text: data.error || MODEL_UNAVAILABLE_MSG,
                    typing: false,
                  }
                : msg
            )
          );
          return;
        }

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

        // If the stream closed empty (e.g., mid-stream upstream error), display the unavailable message
        if (!assistantTextRef.current.trim()) {
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex ? { ...msg, type: 'error', text: MODEL_UNAVAILABLE_MSG, typing: false } : msg
            )
          );
        } else {
          setMessages((prev) => prev.map((msg, i) => (i === assistantIndex ? { ...msg, typing: false } : msg)));
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sending message:', err);
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex
                ? { ...msg, type: 'error', text: MODEL_UNAVAILABLE_MSG, typing: false }
                : msg
            )
          );
        }
      } finally {
        currentStreamController.current = null;
      }
    },
    [hasToken, started]
  );

  const addCachedExchange = useCallback(
    (userText, assistantText) => {
      if (!started) setStarted(true);
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: userText },
        { role: 'assistant', text: assistantText, typing: false },
      ]);
    },
    [started]
  );

  return { messages, started, sendMessage, addCachedExchange, setStarted, fetchToken, hasToken };
}
