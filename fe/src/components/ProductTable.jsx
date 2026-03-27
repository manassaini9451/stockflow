export default function ProductTable({ data }) {
  return (
    <div>
      {data.map(p => (
        <div key={p._id}>
          {p.name} - {p.quantity}
        </div>
      ))}
    </div>
  );
}