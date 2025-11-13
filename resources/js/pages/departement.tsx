import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard, departement as departementIndex } from '@/routes';

// --- Interface Definitions ---
interface Division {
    id: number;
    name: string;
}

interface Departemen {
    id: number;
    name: string;
    divisions_id?: number;
}

interface DepartementProps {
    departemen: Departemen[];
    divisions: Division[];
}

// --- Breadcrumbs ---
const breadcrumbs = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Manajemen Departemen', href: departementIndex().url },
];

// --- Feedback Message Component ---
const FeedbackMessage: React.FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => {
    if (!message) return null;
    return (
        <div
            className={`p-3 text-sm rounded-lg mb-4 transition-all duration-300 ${type === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                }`}
        >
            {message}
        </div>
    );
};

export default function Departement() {
    // Ambil props dari Inertia (server)
    const { departemen = [], divisions = [] } =
        usePage().props as unknown as DepartementProps;

    const [departState, setDepartState] = useState<Departemen[]>(departemen);
    const [selectedDivisionId, setSelectedDivisionId] = useState<number | ''>('');
    const [formDept, setFormDept] = useState({ name: '' });
    const [feedbackMessage, setFeedbackMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // --- Submit Form ---
    const submitDept = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackMessage(null);

        if (!selectedDivisionId) {
            setFeedbackMessage({ message: 'Pilih Division terlebih dahulu!', type: 'error' });
            return;
        }

        try {
            const newId = Date.now();
            const newDepart = {
                id: newId,
                name: formDept.name,
                divisions_id: Number(selectedDivisionId),
            };

            setDepartState([...departState, newDepart]);
            setFeedbackMessage({ message: 'Departemen berhasil ditambahkan!', type: 'success' });
            setFormDept({ name: '' });
            setSelectedDivisionId('');
        } catch (error) {
            console.error(error);
            setFeedbackMessage({ message: 'Gagal menambahkan departemen.', type: 'error' });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Departemen" />

            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto rounded-xl p-6 bg-white shadow-xl dark:bg-gray-800">

                <FeedbackMessage
                    message={feedbackMessage?.message || ''}
                    type={feedbackMessage?.type || 'success'}
                />

                {/* Form Tambah Departemen */}
                <section className="p-6 border border-gray-200 rounded-xl dark:border-gray-700">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Tambah Departemen Baru
                    </h2>

                    <form onSubmit={submitDept} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">

                        <div className="md:col-span-1">
                            <label htmlFor="dept-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nama Departemen
                            </label>
                            <input
                                id="dept-name"
                                type="text"
                                placeholder="e.g., Keuangan"
                                value={formDept.name}
                                onChange={(e) => setFormDept({ ...formDept, name: e.target.value })}
                                className="w-full rounded-lg px-4 py-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label htmlFor="division-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Pilih Division
                            </label>
                            <select
                                id="division-select"
                                value={selectedDivisionId}
                                onChange={(e) => setSelectedDivisionId(Number(e.target.value))}
                                className="w-full rounded-lg px-4 py-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>-- Pilih Division --</option>
                                {divisions.map((div) => (
                                    <option key={div.id} value={div.id}>{div.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1 flex items-end">
                            <button
                                type="submit"
                                className="w-full h-10 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
                            >
                                Simpan Departemen
                            </button>
                        </div>
                    </form>
                </section>

                {/* Tabel Departemen */}
                <section>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Daftar Departemen ({departState.length})
                    </h2>
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Departemen</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Division</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {departState.map((dept, index) => (
                                    <tr
                                        key={dept.id}
                                        className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{dept.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{dept.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {divisions.find(d => d.id === dept.divisions_id)?.name ?? 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                                {departState.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                            Belum ada data Departemen.
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
