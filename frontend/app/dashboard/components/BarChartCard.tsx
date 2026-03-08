"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";

const CATEGORY_COLORS = [
    "#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#14b8a6",
];

interface BarItem {
    categoria: string;
    total: number;
}

interface BarChartCardProps {
    data: BarItem[];
    loading: boolean;
}

export default function BarChartCard({ data, loading }: BarChartCardProps) {
    const barData = data.map((c, i) => ({
        categoria: c.categoria,
        total: Number(c.total),
        fill: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }));

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <div>
                    <p className="text-sm font-semibold text-gray-800">Usuarios por Categoría</p>
                    <p className="text-xs text-gray-400 mt-0.5">Distribución por rol asignado</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-xl">
                    <TrendingUp size={16} className="text-indigo-500" />
                </div>
            </div>
            <div className="px-2 pb-5">
                {loading ? (
                    <div className="h-52 flex items-center justify-center text-gray-400 text-sm">
                        Cargando...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={barData} margin={{ top: 5, right: 16, left: -10, bottom: 5 }}>
                            <XAxis
                                dataKey="categoria"
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(99,102,241,0.05)" }}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                    fontSize: "12px",
                                }}
                            />
                            <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={38}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
