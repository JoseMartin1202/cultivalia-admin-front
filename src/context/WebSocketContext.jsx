import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import useSession from '../Server/Session/SessionProvider';

const WS_HOST = import.meta.env.VITE_WS_HOST;

const WebSocketContext = createContext();

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const {session}= useSession()

  const { data: ws, status: wsStatusQuery } = useQuery(
    {
      enabled: Boolean(session?.tokens?.access),
      queryKey: ['webSocket', 'Admin'],
      queryFn: async () => {
        const newWs = new WebSocket(`${WS_HOST}${`/ws/inversor/?token=${session.tokens.access}`}`);
        newWs.onopen = () => {
          //console.log('WS abierto');
        };
        
        newWs.onmessage = (e) => {
          handleWebSocketMessage(e, queryClient);
        };
        
        newWs.onerror = (e) => {
          console.error('WS error', e);
        };
        
        newWs.onclose = () => {
          //console.log('WS cerrado');
        };

        return newWs;
      },
      onSuccess: (newWs) => {
        handleWebSocketMessage(newWs,queryClient);
      }
    }
  );

  const handleWebSocketMessage = (e, queryClient) => {
    const query_map = {
      supervision: ['supervisiones']
    };

    try {
      const json_data = JSON.parse(e.data);
      const queries = query_map[json_data?.model?.toLowerCase()] || [];
      //console.log('INVALIDATE: ', queries);

      queryClient.invalidateQueries({
        predicate: (query) => queries.includes(query.queryKey[0])
      });
    } catch (error) {
      console.error('Error parsing WebSocket message', error);
    }
  };

  useEffect(() => {
    return () => {
      ws?.close();
    };
  }, [ws]);

  return (
    <WebSocketContext.Provider value={{ ws,wsStatusQuery }}>
      {children}
    </WebSocketContext.Provider>
  );
};
