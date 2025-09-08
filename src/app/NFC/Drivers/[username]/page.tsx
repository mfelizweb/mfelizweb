import { users } from "@/lib/users";
import { notFound } from "next/navigation";
import UserCard from "@/components/UserCard";

export async function generateStaticParams() {
  return users.map((u) => ({ username: u.username }));
}

export default function UserPage({ params }: { params: { username: string } }) {
  const user = users.find((u) => u.username === params.username);
  if (!user) return notFound();

  return <UserCard profile={user} />;
}
