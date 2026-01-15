const Footer = () => {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} Temple Management System
    </footer>
  );
};

const styles = {
  footer: {
    height: 48,
    backgroundColor: "#fff",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    color: "#777",
  },
};

export default Footer;
