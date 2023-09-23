export default function ModalProductDetails({ product }) {
  return (
    <article>
      <div>Product Name: {product.name}</div>
      <div>Description: {product.description}</div>
      <div>Price: {product.price}</div>
    </article>
  );
}
