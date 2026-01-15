

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>
        <Header />

        <main style={styles.content}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  content: {
    flex: 1,
    padding: 24,
  },
};

export default DashboardLayout;
