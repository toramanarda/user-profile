"use client"; // Client bileşeni olarak işaretle

import styles from './PostDetail.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Link bileşenini içe aktar

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

export default function PostDetail({ params }) {
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`https://dummyjson.com/users/${id}`);
        if (!userResponse.ok) throw new Error("Kullanıcı bilgileri yüklenirken hata oluştu");
        const userData = await userResponse.json();
        setUserData(userData);

        const todosResponse = await fetch(`https://dummyjson.com/users/${id}/todos`);
        if (!todosResponse.ok) throw new Error("Todo'lar yüklenirken hata oluştu");
        const todosData = await todosResponse.json();
        setTodos(todosData.todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!userData) return null; // Yükleme sürecinde bir şey gösterme

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{userData.firstName} {userData.lastName}</h1>
      <div className={styles.card}>
        <img src={userData.image} alt={`${userData.firstName} ${userData.lastName}`} className={styles.profileImage} />
        <div className={styles.info}>
          <Accordion title="Genel Bilgiler">
            <p><strong>İsim:</strong> {userData.firstName} {userData.lastName}</p>
            <p><strong>Kızlık Soyadı:</strong> {userData.maidenName}</p>
            <p><strong>Yaş:</strong> {userData.age}</p>
            <p><strong>Cinsiyet:</strong> {userData.gender}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Telefon:</strong> {userData.phone}</p>
            <p><strong>Doğum Tarihi:</strong> {userData.birthDate}</p>
            <p><strong>Kan Grubu:</strong> {userData.bloodGroup}</p>
          </Accordion>
          <Accordion title="Adres">
            <p><strong>Açık Adres:</strong> {userData.address.address}</p>
            <p><strong>Şehir:</strong> {userData.address.city}</p>
            <p><strong>Ülke:</strong> {userData.address.country}</p>
          </Accordion>
          <Accordion title="Üniversite Bilgileri">
            <p><strong>Üniversite:</strong> {userData.university}</p>
          </Accordion>
          <Accordion title="Banka Bilgileri">
            <p><strong>Kredi Kartı Numarası:</strong> {userData.bank.cardNumber}</p>
            <p><strong>Para Birimi:</strong> {userData.bank.currency}</p>
          </Accordion>
          <Accordion title="Şirket Bilgileri">
            <p><strong>Şirket Adı:</strong> {userData.company.name}</p>
            <p><strong>Pozisyon:</strong> {userData.company.title}</p>
          </Accordion>
          <Accordion title="Todo'lar">
            {todos.length > 0 ? (
              <ul>
                {todos.map(todo => (
                  <li key={todo.id}>
                    {todo.todo} - <strong>{todo.completed ? "Tamamlandı" : "Tamamlanmadı"}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Todo bulunamadı.</p>
            )}
          </Accordion>
        </div>
      </div>
      <Link href="/">
        <button className={styles.backButton}>Geri Git</button>
      </Link>
    </div>
  );
}
