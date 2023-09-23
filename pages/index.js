import { Inter } from "next/font/google";
import Router, { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <button onClick={() => router.push("/manage")}>Manage Products</button>
      <button onClick={() => router.push("/shop")}>Shop</button>
    </main>
  );
}
