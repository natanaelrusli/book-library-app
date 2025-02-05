import React, { createContext, useContext, ReactNode } from "react";

interface Session {
  user: {
    id: string;
    // Add other user properties here
  };
  // Add other session properties here
}

interface SessionProviderProps {
  session: Session;
  children: ReactNode;
}

const SessionContext = createContext<Session | undefined>(undefined);

export const SessionProvider = ({
  session,
  children,
}: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
