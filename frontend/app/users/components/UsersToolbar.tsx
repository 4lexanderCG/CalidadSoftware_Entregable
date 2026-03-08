"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { CATEGORIAS, ESTADOS } from "./types";

interface UsersToolbarProps {
    search: string;
    filterCategoria: string;
    filterEstado: string;
    onSearch: (v: string) => void;
    onCategoria: (v: string) => void;
    onEstado: (v: string) => void;
    onNew: () => void;
}

export default function UsersToolbar({
    search, filterCategoria, filterEstado,
    onSearch, onCategoria, onEstado, onNew,
}: UsersToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Buscar por nombre, correo, DNI…"
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            </div>

            {/* Categoría */}
            <select
                value={filterCategoria}
                onChange={(e) => onCategoria(e.target.value)}
                className="py-2 pl-3 pr-8 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
                <option value="">Todas las categorías</option>
                {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Estado */}
            <select
                value={filterEstado}
                onChange={(e) => onEstado(e.target.value)}
                className="py-2 pl-3 pr-8 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
                <option value="">Todos los estados</option>
                {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* New user */}
            <Button onClick={onNew} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 ml-auto">
                <Plus size={16} /> Nuevo Usuario
            </Button>
        </div>
    );
}
