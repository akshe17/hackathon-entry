export function BrandName({ size = "1em", color }) {
  return (
    <span style={{ color }}>
      Kain
      <span
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontWeight: 400,
          fontSize: `calc(${size} * 1.4)`,
          marginLeft: "-0.15em",
          verticalAlign: "middle",
        }}
      >
        Wise
      </span>
    </span>
  );
}
