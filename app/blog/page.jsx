"use client"; // Client bileşeni olarak işaretle

import Link from "next/link";
import styles from './Blog.module.css'; // CSS dosyanı import et

export default async function Blog() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kullanıcılar</h1>
      <ul className={styles.userList}>
        {users.map(user => (
          <li key={user.id} className={styles.userCard}>
            <span className={styles.userName}>{user.firstName}</span>
            <Link href={`/blog/${user.id}`} className={styles.detailLink}>Detay Göster</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
