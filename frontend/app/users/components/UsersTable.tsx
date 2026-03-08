    "use client";

    import {
        Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    } from "@/components/ui/table";
    import { Eye, Pencil, Trash2 } from "lucide-react";
    import { User, STATUS_STYLES, PAGE_SIZE, Avatar } from "./types";

    interface UsersTableProps {
        pagedUsers: User[];
        filteredCount: number;
        totalCount: number;
        loading: boolean;
        safePage: number;
        totalPages: number;
        onView: (user: User) => void;
        onEdit: (user: User) => void;
        onDelete: (id: number) => void;
        onPageChange: (page: number) => void;
    }

    export default function UsersTable({
        pagedUsers, filteredCount, totalCount, loading,
        safePage, totalPages,
        onView, onEdit, onDelete, onPageChange,
    }: UsersTableProps) {
        return (
            <div className="flex flex-col" style={{ minHeight: `${PAGE_SIZE * 73 + 120}px` }}>
                {/* Table card */}
                <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-6">Usuario</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Correo</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-6">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-gray-400">Cargando...</TableCell>
                                </TableRow>
                            ) : filteredCount === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-gray-400">
                                        {totalCount === 0
                                            ? "No hay usuarios registrados."
                                            : "No se encontraron usuarios con los filtros aplicados."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pagedUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={user.nombre} />
                                                <p className="text-sm font-medium text-gray-800">
                                                    {user.nombre} {user.apellidos}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">{user.correo}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{user.categoria}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[user.estado] ?? "bg-gray-100 text-gray-500"}`}>
                                                {user.estado}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => onView(user)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Ver Detalles">
                                                    <Eye size={15} />
                                                </button>
                                                <button onClick={() => onEdit(user)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Editar">
                                                    <Pencil size={15} />
                                                </button>
                                                <button onClick={() => onDelete(user.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Eliminar">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {!loading && (
                    <div className="flex items-center justify-between mt-4 px-1">
                        <p className="text-xs text-gray-400">
                            {filteredCount > 0
                                ? `Mostrando ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filteredCount)} de ${filteredCount} usuarios`
                                : "\u00a0"}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onPageChange(Math.max(1, safePage - 1))}
                                disabled={safePage === 1}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                Anterior
                            </button>
                            <span className="text-xs text-gray-500 font-medium">Página {safePage} de {totalPages}</span>
                            <button
                                onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
                                disabled={safePage === totalPages}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
