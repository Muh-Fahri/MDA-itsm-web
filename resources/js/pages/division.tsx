import React, { useState } from "react";
import axios from "axios";
import { Head, usePage } from "@inertiajs/react";
import { LayoutGrid } from "lucide-react";
import AppLayout from "@/layouts/app-layout";

const dashboard = () => ({ url: "/dashboard" });
const divisionIndex = () => ({ url: "/divisi" });

interface Directorate {
    id: number;
    name: string;
}

interface Division {
    id: number;
    name: string;
    directorat_id: number;
}

interface DivProps {
    divisi: Division[];
    directorates: Directorate[];
}

const breadcrumbs = [
    { title: "Dashboard", href: dashboard().url },
    { title: "Manajemen Divisi", href: divisionIndex().url },
];

export default function Division() {
    const { divisi = [], directorates = [] } = usePage().props as unknown as DivProps;

    const [divisiState, setDivState] = useState(divisi);
    const [form, setForm] = useState({ name: "" });
    const [selectDirId, setDirId] = useState<number | "">("");
    const [feedbackMessage, setFeedbackMessage] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackMessage(null);

        if (!selectDirId) {
            setFeedbackMessage({ message: "Silakan pilih Directorate!", type: "error" });
            return;
        }

        try {
            const res = await axios.post("/division", {
                name: form.name,
                directorat_id: selectDirId,
            });

            const newDiv = res.data;
            setDivState([...divisiState, newDiv]);
            setFeedbackMessage({ message: "Divisi berhasil ditambahkan!", type: "success" });
            setForm({ name: "" });
            setDirId("");
        } catch (error: any) {
            console.error(error);
            setFeedbackMessage({
                message: error.response?.data?.message || "Gagal menambahkan divisi!",
                type: "error",
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Divisi" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto rounded-xl p-6 bg-white shadow-xl dark:bg-gray-800">

                {feedbackMessage && (
                    <div
                        className={`p-3 text-sm rounded-lg mb-4 ${feedbackMessage.type === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                            }`}
                    >
                        {feedbackMessage.message}
                    </div>
                )}
                <section className="p-6 border border-gray-200 rounded-xl dark:border-gray-700">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Tambah Divisi Baru</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl items-end">
                        <div className="flex flex-col flex-grow">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Divisi</label>
                            <input
                                type="text"
                                placeholder="Masukkan nama divisi"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Directorate</label>
                            <select
                                value={String(selectDirId)}
                                onChange={(e) => setDirId(Number(e.target.value))}
                                className="rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">-- Pilih Directorate --</option>
                                {directorates.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                        >
                            Simpan
                        </button>
                    </form>
                </section>
                <section>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Daftar Divisi ({divisiState.length})
                    </h2>
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Divisi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Directorate</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {divisiState.length > 0 ? (
                                    divisiState.map((div) => {
                                        const dir = directorates.find((d) => d.id === div.directorat_id);
                                        return (
                                            <tr key={div.id}>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{div.id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{div.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {dir ? dir.name : "Tidak ditemukan"}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                            Belum ada data Divisi.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
