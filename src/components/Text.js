export default function Text({ number }) {
  return (
    <h1 style={{ lineHeight: 1 }}>
      {number.toFixed(2)} <span style={{ fontSize: "0.8em" }}>m</span>
      <br />
      {number <= 0.4 && <span>Landed</span>}
    </h1>
  )
}
