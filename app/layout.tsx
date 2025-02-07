import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { Session } from "next-auth";
import ProtectedRoute from "@/hoc/ProtectedRoute";
export const metadata = {
  title: "Promptverse",
  description: "Discover & Share AI Prompts",
};

interface Props {
  children: ReactNode;
  session: Session | null;
}

const RootLayout = ({ children, session }: Props) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <ProtectedRoute>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </ProtectedRoute>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
