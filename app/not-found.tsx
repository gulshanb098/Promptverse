"use client";

import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">Redirecting to home...</p>
    </div>
  );
};

export default NotFound;
