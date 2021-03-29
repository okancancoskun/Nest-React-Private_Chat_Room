import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { UserAction } from "../redux/actions/UserAction";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    dispatch(UserAction.postLogin(data));
  };

  const form = (
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input placeholder="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
  const redirect = <Redirect to="/"></Redirect>;
  return (
    <div>
      <h1>LOGIN PAGE</h1>
      {auth.authenticate === true ? redirect : form}
    </div>
  );
};

export default LoginPage;
