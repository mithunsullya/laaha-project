"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const register = () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            // console.log("SW registration failed: ", registrationError);
          });
      };

      if (document.readyState === "complete") {
        // Document already loaded
        register();
      } else {
        // Wait for window load
        window.addEventListener("load", register);
      }
    }
  }, []);

  return null;
}
