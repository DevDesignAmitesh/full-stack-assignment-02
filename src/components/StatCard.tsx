import { TrendingDown, TrendingUp } from "lucide-react";

export function StatCard({
  icon,
  label,
  value,
  trend,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend: { value: number; isPositive: boolean; label: string };
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">
          {value.toLocaleString()}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs">
        {trend.isPositive ? (
          <TrendingUp className="w-3 h-3 text-green-600" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-600" />
        )}
        <span className={trend.isPositive ? "text-green-600" : "text-red-600"}>
          {trend.value}%
        </span>
        <span className="text-gray-600">{trend.label}</span>
      </div>
    </div>
  );
}
