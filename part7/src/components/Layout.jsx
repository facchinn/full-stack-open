import { NavLink, Outlet } from 'react-router-dom'
export default function Layout({ user, logout }) {
  return <div className="shell"><header><NavLink className="logo" to="/">Readlog<span>/07</span></NavLink>{user && <nav><NavLink to="/">Blogs</NavLink><NavLink to="/users">People</NavLink><NavLink to="/labs">Hook labs</NavLink></nav>}<div className="account">{user && <><span>{user.name || user.username}</span><button onClick={logout}>Log out</button></>}</div></header><main><Outlet /></main><footer><span>Full Stack Open</span><span>Part 07 · React Router & hooks</span></footer></div>
}
