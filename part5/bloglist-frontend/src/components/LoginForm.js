import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

function LoginForm( {setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await loginService.login({username, password});
      window.localStorage.setItem('loggedUser', JSON.stringify(response));
      blogService.setToken(response.token);
      setUser(response);
    }
    catch(error) {
      console.log(error.response.data.error);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="username">Username:</label>
        <input name="username" id="username" type='text' value={username} onChange={({target}) => {setUsername(target.value)}}/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input name="password" id="password" type='password' value={password} onChange={({target}) => {setPassword(target.value)}}/>
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default LoginForm;