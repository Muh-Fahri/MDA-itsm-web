import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

interface Directorate {
    id: number;
    name: string;
}

interface Departemen {
    id: number;
    name: string
}

interface DashboardProps {
    total_users: number;
    total_projects: number;
    total_departements: number;
    directorates: Directorate[];
    departemen: Departemen[];
}
const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];



export default function Dashboard() {
    const { directorates, total_projects, total_departements, departemen } =
        (usePage().props as unknown as DashboardProps);

    const [directoratesState, setDirectoratesState] = useState<Directorate[]>(directorates);


    const [form, setForm] = useState({ name: '' });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/dashboard', form);
            const newDirectorate = response.data; // sekarang sudah ada id
            setDirectoratesState([...directoratesState, newDirectorate]); // langsung tampil
            alert('Directorate berhasil ditambahkan!');
            setForm({ name: '' });
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat menambah directorate!');
        }

    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Statistik */}
                <section>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div>
                            <h1>Daftar Directorate</h1>
                            <table className="min-w-full border border-gray-200 dark:border-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">ID</th>
                                        <th className="border px-4 py-2 text-left">Nama Directorate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {directoratesState.map((dir, index) => (
                                        <tr key={dir.id ?? index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="border px-4 py-2">{dir.id ?? '-'}</td>
                                            <td className="border px-4 py-2">{dir.name}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                    </div>
                </section>

                <section>
                    {/* Form Tambah Directorate */}
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-900 p-6 mt-6">
                        <h2 className="text-2xl font-bold mb-4">Tambah Directorate</h2>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 max-w-md"
                        >
                            {/* Input Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Nama Directorate
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Masukkan nama directorate"
                                    className="w-full rounded-md p-5 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Tombol Submit */}
                            <button
                                type="submit"
                                className="w-fit px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
