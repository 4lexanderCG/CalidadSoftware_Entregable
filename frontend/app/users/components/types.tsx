export interface User {
    id: number;
    nombre: string;
    apellidos: string;
    dni: string;
    direccion: string;
    telefono: string;
    correo: string;
    categoria: string;
    estado: "Activo" | "Inactivo" | "Pendiente";
    created_at: string;
    updated_at: string;
}

export type FormData = Omit<User, "id" | "created_at" | "updated_at">;

export const CATEGORIAS = ["Admin", "Editor", "Moderador", "Soporte"];
export const ESTADOS = ["Activo", "Inactivo", "Pendiente"];
export const PAGE_SIZE = 6;

export const EMPTY_FORM: FormData = {
    nombre: "", apellidos: "", dni: "", direccion: "",
    telefono: "", correo: "", categoria: "Admin", estado: "Activo",
};

export const STATUS_STYLES: Record<string, string> = {
    Activo: "bg-green-100 text-green-700",
    Inactivo: "bg-red-100 text-red-500",
    Pendiente: "bg-amber-100 text-amber-600",
};

export function formatDate(iso: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-PE", {
        day: "2-digit", month: "2-digit", year: "numeric",
    });
}

export function Avatar({ name }: { name: string }) {
    const initial = name?.charAt(0).toUpperCase() ?? "?";
    const colors = [
        "bg-indigo-100 text-indigo-600", "bg-green-100 text-green-600",
        "bg-amber-100 text-amber-600", "bg-pink-100 text-pink-600",
        "bg-blue-100 text-blue-600",
    ];
    const color = colors[initial.charCodeAt(0) % colors.length];
    return (
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${color}`}>
            {initial}
        </div>
    );
}
