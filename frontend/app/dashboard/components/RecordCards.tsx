"use client";

import { UserPlus, PenLine } from "lucide-react";
import type { UserRecord } from "@/lib/dashboard-types";

const STATUS_BG: Record<string, string> = {
    Activo: "bg-indigo-100 text-indigo-700",
    Inactivo: "bg-red-100 text-red-600",
    Pendiente: "bg-amber-100 text-amber-600",
};

function formatDateFull(iso?: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function RecordCard({
    icon,
    title,
    accent,
    user,
    dateLabel,
    dateValue,
    loading,
}: {
    icon: React.ReactNode;
    title: string;
    accent: string;
    user: UserRecord | null;
    dateLabel: string;
    dateValue?: string;
    loading: boolean;
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={`h-1 w-full ${accent}`} />
            <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-gray-50">{icon}</div>
                    <p className="text-sm font-semibold text-gray-700">{title}</p>
                </div>
                {loading ? (
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                        <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                    </div>
                ) : user ? (
                    <div className="space-y-2">
                        <p className="text-base font-bold text-gray-800 truncate">
                            {user.nombre} {user.apellidos}
                        </p>
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {user.categoria && (
                                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                                    {user.categoria}
                                </span>
                            )}
                            {user.estado && (
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BG[user.estado] ?? "bg-gray-100 text-gray-500"}`}>
                                    {user.estado}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 pt-1">
                            <span className="font-medium text-gray-500">{dateLabel}:</span>{" "}
                            {formatDateFull(dateValue)}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">Sin datos disponibles</p>
                )}
            </div>
        </div>
    );
}

interface RecordCardsProps {
    lastInserted: UserRecord | null;
    lastUpdated: UserRecord | null;
    loading: boolean;
}

export default function RecordCards({ lastInserted, lastUpdated, loading }: RecordCardsProps) {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <RecordCard
                icon={<UserPlus size={18} className="text-indigo-500" />}
                title="Último Usuario Insertado"
                accent="bg-gradient-to-r from-indigo-500 to-violet-500"
                user={lastInserted}
                dateLabel="Creado"
                dateValue={lastInserted?.created_at}
                loading={loading}
            />
            <RecordCard
                icon={<PenLine size={18} className="text-emerald-500" />}
                title="Último Usuario Editado"
                accent="bg-gradient-to-r from-emerald-400 to-teal-500"
                user={lastUpdated}
                dateLabel="Actualizado"
                dateValue={lastUpdated?.updated_at}
                loading={loading}
            />
        </div>
    );
}
