// src/api/auth.ts
import { User } from '../models/interfaces'; //  Импортируйте интерфейс User,  если он у вас есть

export async function getAuthUser(): Promise<User> {
  // TODO:  Реализуйте получение данных авторизованного пользователя
  //  Например,  из  localStorage  или  cookies
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  } else {
    throw new Error('Пользователь не авторизован');
  }
}