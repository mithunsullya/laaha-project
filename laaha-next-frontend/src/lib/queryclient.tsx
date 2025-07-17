'use client';

import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // For Next.js 13

// Define the type for the context value
interface ClientContextType {
  ip: string | null;
  alias: string | null;
}

// Create the context with a default value of `undefined` (since it will be provided later)
const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Define the props for the ClientProvider component
interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [ip, setIp] = useState<string | null>(null);
  const pathname = usePathname();  // Get the current path

  // Function to get the user's IP address
  const getUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  };

  // Fetch IP address when the component mounts
  useEffect(() => {
    const fetchIP = async () => {
      const userIP = await getUserIP();
      setIp(userIP);
    };
    fetchIP();
  }, []);

  // Helper function to get the slug from the path
  const getSlugFromPath = (path: string): string | null => {
    const segments = path.split('/').filter(Boolean); // Split by '/' and remove empty segments
    return segments.length > 0 ? `/${segments[segments.length - 1]}` : null;
  };

  // Get the slug based on the current path
  const alias = getSlugFromPath(pathname);

  return (
    <ClientContext.Provider value={{ ip, alias }}>
      {children}
    </ClientContext.Provider>
  );
};

// Custom hook to use the context, ensuring safe usage
export const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};

export default ClientProvider;
