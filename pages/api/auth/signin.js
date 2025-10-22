import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username: userInfo.username,
      password: userInfo.password,
    });
    if (res.error) {
      setErrorMsg("Invalid username or password");
    } else {
      router.push("/scheduler"); // Redirect to dashboard after login
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            required
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          />
        </label>
        <br />
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
