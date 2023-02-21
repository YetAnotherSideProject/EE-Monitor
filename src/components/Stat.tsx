// Assets
import "./Stat.css";

interface StatProps {
  value: number | string;
  label: string;
}

export default function Stat({ value, label }: StatProps) {
  return (
    <div className="stat_container">
      <span>{value}</span>
      <span>{label}</span>
    </div>
  );
}
