export default function Home() {
  return (
    <div style={{textAlign:"center",marginTop:"100px"}}>
      <h1>NeoConnect</h1>
      <p>Welcome to NeoConnect Complaint Management System</p>

      <div style={{marginTop:"30px"}}>
        <a href="/login">Login</a> |{" "}
        <a href="/register">Register</a>
      </div>
    </div>
  );
}