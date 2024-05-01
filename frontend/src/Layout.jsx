export default function Layout({ children }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {children}
    </div>
  );
}
