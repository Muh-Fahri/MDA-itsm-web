import React, { useState } from 'react';
import axios from 'axios';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; //

interface Directorate {
    id: number;
    name: string;
}

interface DirectorateProps {
    directorates: Directorate[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manajemen Directorate', href: '/directorate' },
];

export default function Directorate() {
    const { directorates = [] } = usePage().props as unknown as DirectorateProps;
    const [directoratesState, setDirectoratesState] = useState<Directorate[]>(directorates);
    const [form, setForm] = useState({ name: '' });
    const [feedbackMessage, setFeedbackMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackMessage(null);
        try {
            const response = await axios.post('/directorate', form); // ⬅️ kirim ke Laravel
            setDirectoratesState([...directoratesState, response.data]);
            setFeedbackMessage({
                message: 'Directorate berhasil ditambahkan!',
                type: 'success',
            });
            setForm({ name: '' });
        } catch (error: any) {
            console.error('Error adding directorate:', error);
            setFeedbackMessage({
                message: 'Gagal menambah directorate!',
                type: 'error',
            });
        }
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Directorate" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto rounded-xl p-6 bg-white shadow-xl dark:bg-gray-800">
                {feedbackMessage && (
                    <div
                        className={`p-3 text-sm rounded-lg mb-4 ${feedbackMessage.type === 'success'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                            }`}
                    >
                        {feedbackMessage.message}
                    </div>
                )}
                <section className="p-6 border border-gray-200 rounded-xl dark:border-gray-700">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Tambah Directorate Baru</h2>
                    <form onSubmit={handleSubmit} className="flex gap-4 max-w-lg">
                        <input
                            type="text"
                            placeholder="Masukkan nama directorate"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="flex-grow rounded-lg px-4 py-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
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
                        Daftar Directorate ({directoratesState.length})
                    </h2>
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Directorate</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {directoratesState.map((dir, index) => (
                                    <tr key={dir.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{dir.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{dir.name}</td>
                                    </tr>
                                ))}
                                {directoratesState.length === 0 && (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                            Belum ada data Directorate.
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
