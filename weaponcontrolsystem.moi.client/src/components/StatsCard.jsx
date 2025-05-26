import { FaClipboardList } from "react-icons/fa";

export default function StatCard({ title, value, color, icon }) {
  return (
    <div className="card shadow-sm rounded-4 border-0 text-center">
      <div className="card-body">
        <h5 className={`card-title text-${color}`}>
          {icon} {title}
        </h5>
        <h1 className="text-dark">{value}</h1>
      </div>
    </div>
  );
}
