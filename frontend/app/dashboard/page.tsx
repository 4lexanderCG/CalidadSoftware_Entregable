"use client";

import { useEffect, useState } from "react";
import SidebarLayout from "../components/sidebar-layout";
import StatCards from "./components/StatCards";
import RecordCards from "./components/RecordCards";
import BarChartCards from "./components/BarChartCard";
import DonutChartCard from "./components/DonutChartCard";
import { API_BASE } from "@/lib/api";
import { DashboardData } from "@/lib/dashboard-types";

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/users/dashboard/summary`)
        .then((r) => r.json())
        .then((d) => { setData(d); setLoading(false); })
        .catch((e) => setLoading(false));
    }, []);

    const activos = data?.usersByEstado.find((e) => e.estado === "Activo")?.total ?? 0;
    const inactivos = data?.usersByEstado.find((e) => e.estado === "Inactivo")?.total ?? 0;
    const pendientes = data?.usersByEstado.find((e) => e.estado === "Pendiente")?.total ?? 0;

    return (
        <SidebarLayout
            title="Panel de Control"
            description="Visualiza el estado general de tu plataforma."
        >
            <StatCards
                totalUsers={data?.totalUsers ?? 0}
                activos={activos}
                inactivos={inactivos}
                pendientes={pendientes}
                loading={loading}
            />

            <RecordCards 
                lastInserted={data?.lastInserted ?? null}
                lastUpdated={data?.lastUpdated ?? null}
                loading={loading}
            />

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <BarChartCards data={data?.usersByCategoria ?? []} loading={loading} />
                <DonutChartCard data={data?.usersByEstado ?? []} loading={loading} />
            </div>
        </SidebarLayout>
    ); 

    }   