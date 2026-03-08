export interface EstadoItem {
    estado: string;
    total: number;
}

export interface CategoriaItem {
    categoria: string;
    total: number;
}

export interface UserRecord {
    nombre?: string;
    apellidos?: string;
    correo?: string;
    categoria?: string;
    estado?: string;
    created_at?: string;
    updated_at?: string;
}

export interface DashboardData {
    totalUsers: number;
    usersByEstado: EstadoItem[];
    usersByCategoria: CategoriaItem[];
    lastInserted: UserRecord | null;    
    lastUpdated: UserRecord | null;
}