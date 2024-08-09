import { useState } from 'react'
import loginService from '../services/login'
import { Notification } from '../Notification';

export function LoginForm({ setUser, notification, setNotification }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            setUser(user);
            setUsername('');
            setPassword('');
            setNotification({ message: `Welcome ${user.name}`, success: true });
        } catch (exception) {
            setNotification({ message: `Wrong credentials: ${exception.message}`, success: false });
        } finally {
            setTimeout(() => setNotification(null), 2500);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <Notification notification={notification} />
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}