"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Filter } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
    Activo: "#10b981",
    Inactivo: "#f87171",
    Pendiente: "#f59e0b",
};

interface EstadoItem {
    estado: string;
    total: number;
}

interface DonutChartCardProps {
    data: EstadoItem[];
    loading: boolean;
}

export default function DonutChartCard({ data, loading }: DonutChartCardProps) {
    const pieData = data.map((e) => ({
        name: e.estado,
        value: Number(e.total),
    }));

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <div>
                    <p className="text-sm font-semibold text-gray-800">Distribución de Estados</p>
                    <p className="text-xs text-gray-400 mt-0.5">Activos, inactivos y pendientes</p>
                </div>
                <div className="p-2 bg-violet-50 rounded-xl">
                    <Filter size={16} className="text-violet-500" />
                </div>
            </div>
            <div className="px-2 pb-2">
                {loading ? (
                    <div className="h-52 flex items-center justify-center text-gray-400 text-sm">
                        Cargando...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={58}
                                outerRadius={88}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={STATUS_COLORS[entry.name] ?? "#94a3b8"}
                                        stroke="none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                    fontSize: "12px",
                                }}
                            />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                formatter={(value) => (
                                    <span className="text-xs text-gray-600 font-medium">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
