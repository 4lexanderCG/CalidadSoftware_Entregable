"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface DeleteModalProps {
    open: boolean;
    deleting: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export default function DeleteModal({ open, deleting, onConfirm, onClose }: DeleteModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-gray-800">Eliminar Usuario</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-500 py-2">
                    ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
                </p>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm} disabled={deleting} className="bg-red-500 hover:bg-red-600 text-white">
                        {deleting ? "Eliminando..." : "Eliminar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
