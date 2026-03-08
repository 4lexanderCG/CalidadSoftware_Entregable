"use client";

import { useEffect, useState } from "react";
import SidebarLayout from "../components/sidebar-layout";

import { API_BASE } from "@/lib/api";
import { User, FormData, EMPTY_FORM, PAGE_SIZE } from "./components/types.tsx";
import UsersToolbar from "./components/UsersToolbar";
import UsersTable from "./components/UsersTable";
import UserFormModal from "./components/UserFormModal";
import DeleteModal from "./components/DeleteModal";
import ViewModal from "./components/ViewModal";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);
    const [form, setForm] = useState<FormData>({ ...EMPTY_FORM });
    const [saving, setSaving] = useState(false);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [viewing, setViewing] = useState<User | null>(null);

    const [search, setSearch] = useState("");
    const [filterCategoria, setFilterCategoria] = useState("");
    const [filterEstado, setFilterEstado] = useState("");
    const [page, setPage] = useState(1);

    const filteredUsers = users.filter((u) => {
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            u.nombre.toLowerCase().includes(q) ||
            u.apellidos.toLowerCase().includes(q) ||
            u.correo.toLowerCase().includes(q) ||
            u.dni.toLowerCase().includes(q);
        const matchCategoria = !filterCategoria || u.categoria === filterCategoria;
        const matchEstado = !filterEstado || u.estado === filterEstado;
        return matchSearch && matchCategoria && matchEstado;
    });

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pagedUsers = filteredUsers.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
    );

    function handleSearch(v: string) { setSearch(v); setPage(1); }
    function handleCategoria(v: string) { setFilterCategoria(v); setPage(1); }
    function handleEstado(v: string) { setFilterEstado(v); setPage(1); }

    const fetchUsers = () => {
        setLoading(true);
        fetch(`${API_BASE}/users`)
            .then((r) => r.json())
            .then((d) => { setUsers(d); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, []);

    function openCreate() {
        setEditing(null);
        setForm({ ...EMPTY_FORM });
        setOpen(true);
    }

    function openEdit(user: User) {
        setEditing(user);
        setForm({
            nombre: user.nombre,
            apellidos: user.apellidos,
            dni: user.dni,
            direccion: user.direccion,
            telefono: user.telefono,
            correo: user.correo,
            categoria: user.categoria,
            estado: user.estado,
        });
        setOpen(true);
    }

    async function handleSave() {
        setSaving(true);
        const url = editing ? `${API_BASE}/users/${editing.id}` : `${API_BASE}/users`;
        const method = editing ? "PUT" : "POST";
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setSaving(false);
        setOpen(false);
        fetchUsers();
    }

    async function handleDelete() {
        if (!deleteId) return;
        setDeleting(true);
        await fetch(`${API_BASE}/users/${deleteId}`, { method: "DELETE" });
        setDeleting(false);
        setDeleteId(null);
        fetchUsers();
    }

    return (
        <SidebarLayout
            title="Gestión de Usuarios"
            description="Administra, crea y edita usuarios."
        >
            <UsersToolbar
                search={search}
                filterCategoria={filterCategoria}
                filterEstado={filterEstado}
                onSearch={handleSearch}
                onCategoria={handleCategoria}
                onEstado={handleEstado}
                onNew={openCreate}
            />

            <UsersTable
                pagedUsers={pagedUsers}
                filteredCount={filteredUsers.length}
                totalCount={users.length}
                loading={loading}
                safePage={safePage}
                totalPages={totalPages}
                onView={setViewing}
                onEdit={openEdit}
                onDelete={setDeleteId}
                onPageChange={setPage}
            />

            <UserFormModal
                open={open}
                editing={editing}
                form={form}
                saving={saving}
                onFormChange={setForm}
                onSave={handleSave}
                onClose={() => setOpen(false)}
            />

            <DeleteModal
                open={deleteId !== null}
                deleting={deleting}
                onConfirm={handleDelete}
                onClose={() => setDeleteId(null)}
            />

            <ViewModal
                user={viewing}
                onClose={() => setViewing(null)}
            />
        </SidebarLayout>
    );
}
