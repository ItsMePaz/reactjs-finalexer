import { useRouter } from "next/router";

export default function Cart() {
  const router = useRouter();

  return (
    <div>
      <div>Product Landing Page</div>
      <br />
      <div>Product Name: {router.query.name}</div>
      <div>Description: {router.query.description}</div>
      <div>Price: {router.query.price}</div> <br />
      <button onClick={() => router.push("/shop")}>Go to shopping page</button>
    </div>
  );
}
