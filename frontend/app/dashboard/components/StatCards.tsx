"use client";

import { Users, UserCheck, Clock, UserX } from "lucide-react";

interface StatCardsProps {
    totalUsers: number;
    activos: number;
    inactivos: number;
    pendientes: number;
    loading: boolean;
}

export default function StatCards({
    totalUsers,
    activos,
    inactivos,
    pendientes,
    loading,
}: StatCardsProps) {
    const total = totalUsers || 1;

    const cards = [
        {
            label: "Total Usuarios",
            value: totalUsers,
            icon: <Users size={20} className="text-indigo-500" />,
            iconBg: "bg-indigo-50",
            accentColor: "text-indigo-600",
            badge: "Registros totales",
            badgeColor: "bg-indigo-50 text-indigo-500",
            border: "border-l-indigo-400",
        },
        {
            label: "Usuarios Activos",
            value: activos,
            icon: <UserCheck size={20} className="text-emerald-500" />,
            iconBg: "bg-emerald-50",
            accentColor: "text-emerald-600",
            badge: `${Math.round((activos / total) * 100)}% del total`,
            badgeColor: "bg-emerald-50 text-emerald-600",
            border: "border-l-emerald-400",
        },
        {
            label: "Pendientes",
            value: pendientes,
            icon: <Clock size={20} className="text-amber-500" />,
            iconBg: "bg-amber-50",
            accentColor: "text-amber-600",
            badge: "Requieren atención",
            badgeColor: "bg-amber-50 text-amber-600",
            border: "border-l-amber-400",
        },
        {
            label: "Inactivos",
            value: inactivos,
            icon: <UserX size={20} className="text-red-400" />,
            iconBg: "bg-red-50",
            accentColor: "text-red-500",
            badge: `${Math.round((inactivos / total) * 100)}% del total`,
            badgeColor: "bg-red-50 text-red-500",
            border: "border-l-red-400",
        },
    ];

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${card.border} shadow-sm p-5 flex flex-col gap-3`}
                >
                    <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl ${card.iconBg}`}>{card.icon}</div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                            {card.badge}
                        </span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">{card.label}</p>
                        <p className={`text-3xl font-extrabold mt-0.5 ${card.accentColor}`}>
                            {loading ? "—" : card.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
