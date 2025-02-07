import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { ReactNode } from "react";
import ProtectedRoute from "@/hoc/ProtectedRoute";

export const metadata = {
  title: "Promptverse",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: "/assets/images/logo.svg",
  }  
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <Provider>
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
