import { useQuery } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers() {
  const usersUnformatted: User[] = (await api.get('/users')).data.users;

  const users = usersUnformatted.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));

  return users;
};

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 60 // 60 segundos
  });
};
