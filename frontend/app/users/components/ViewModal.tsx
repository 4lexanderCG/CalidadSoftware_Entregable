"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, STATUS_STYLES, Avatar } from "./types";

interface ViewModalProps {
    user: User | null;
    onClose: () => void;
}

export default function ViewModal({ user, onClose }: ViewModalProps) {
    return (
        <Dialog open={user !== null} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-gray-800 flex items-center gap-3">
                        {user && <Avatar name={user.nombre} />}
                        Información del Usuario
                    </DialogTitle>
                </DialogHeader>

                {user && (
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-4">
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Nombre Completo</p>
                            <p className="text-sm text-gray-800 mt-1">{user.nombre} {user.apellidos}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">DNI</p>
                            <p className="text-sm text-gray-800 mt-1">{user.dni}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Correo Electrónico</p>
                            <p className="text-sm text-gray-800 mt-1 truncate">{user.correo}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                            <p className="text-sm text-gray-800 mt-1">{user.telefono}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs text-gray-500 font-medium">Dirección</p>
                            <p className="text-sm text-gray-800 mt-1">{user.direccion}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Categoría</p>
                            <p className="text-sm text-gray-800 mt-1">{user.categoria}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Estado</p>
                            <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[user.estado] ?? "bg-gray-100 text-gray-500"}`}>
                                {user.estado}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Fecha de Creación</p>
                            <p className="text-sm text-gray-800 mt-1">{new Date(user.created_at).toLocaleString("es-PE")}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Última Actualización</p>
                            <p className="text-sm text-gray-800 mt-1">{new Date(user.updated_at).toLocaleString("es-PE")}</p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
