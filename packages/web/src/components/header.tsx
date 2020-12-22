import React from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/use-auth'
import styles from '../styles/Header.module.css'

interface NavLink {
  href: string
  text: string
}

const authenticatedLinks: NavLink[] = [
  { href: '/logout', text: 'Logout' }
]
const unauthenticatedLinks: NavLink[] = [
  { href: '/login', text: 'Log In' },
  { href: '/signup', text: 'Sign Up' }
]

const Header: React.FC = () => {
  const { user } = useAuth()
  const links = user ? authenticatedLinks : unauthenticatedLinks

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Apollo Auth App
      </div>
      <nav className="">
        <ul className={styles.navList}>
          {links.map(link => (
            <li key={`nav-item-${link.text}`} className={styles.navItem}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
