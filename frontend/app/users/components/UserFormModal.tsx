"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormData, CATEGORIAS, ESTADOS } from "./types";

interface UserFormModalProps {
    open: boolean;
    editing: { id: number } | null;
    form: FormData;
    saving: boolean;
    onFormChange: (form: FormData) => void;
    onSave: () => void;
    onClose: () => void;
}

export default function UserFormModal({
    open, editing, form, saving, onFormChange, onSave, onClose,
}: UserFormModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-gray-800">
                        {editing ? "Editar Usuario" : "Nuevo Usuario"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-3 py-2">
                    {([
                        { key: "nombre", label: "Nombre" },
                        { key: "apellidos", label: "Apellidos" },
                        { key: "dni", label: "DNI" },
                        { key: "telefono", label: "Teléfono" },
                        { key: "correo", label: "Correo", colSpan: true },
                        { key: "direccion", label: "Dirección", colSpan: true },
                    ] as { key: keyof FormData; label: string; colSpan?: boolean }[]).map(({ key, label, colSpan }) => (
                        <div key={key} className={colSpan ? "col-span-2" : ""}>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">{label}</label>
                            <Input
                                value={form[key] as string}
                                onChange={(e) => onFormChange({ ...form, [key]: e.target.value })}
                                placeholder={label}
                                className="text-sm"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium">Categoría</label>
                        <select
                            value={form.categoria}
                            onChange={(e) => onFormChange({ ...form, categoria: e.target.value })}
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium">Estado</label>
                        <select
                            value={form.estado}
                            onChange={(e) => onFormChange({ ...form, estado: e.target.value as FormData["estado"] })}
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        {saving ? "Guardando..." : editing ? "Guardar Cambios" : "Crear Usuario"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
