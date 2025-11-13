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
    name: string;
    divisions_id?: number;
}

interface Division {
    id: number;
    name: string;
}

interface DashboardProps {
    total_users: number;
    total_projects: number;
    total_departements: number;
    directorates: Directorate[];
    departemen: Departemen[];
    divisions: Division[];
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    // ✅ Panggil usePage di dalam function component
    const { directorates = [], total_departements = 0, departemen = [], divisions = [] } =
        usePage().props as unknown as DashboardProps;

    const [directoratesState, setDirectoratesState] = useState<Directorate[]>(directorates);
    const [departState, setDepartState] = useState<Departemen[]>(departemen);
    const [selectedDivisionId, setSelectedDivisionId] = useState<number | "">("");

    const [formDept, setFormDept] = useState({ name: '' });
    const [form, setForm] = useState({ name: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/dashboard', form);
            const newDirectorate = response.data;
            setDirectoratesState([...directoratesState, newDirectorate]);
            alert('Directorate berhasil ditambahkan!');
            setForm({ name: '' });
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat menambah directorate!');
        }
    };

    const submitDept = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDivisionId) {
            alert('Pilih division terlebih dahulu!');
            return;
        }

        try {
            const res = await axios.post('/departemen', {
                name: formDept.name,
                divisions_id: selectedDivisionId
            });
            const newDepart = res.data;
            setDepartState([...departState, newDepart]);
            alert('Departemen berhasil ditambahkan!');
            setFormDept({ name: '' });
            setSelectedDivisionId('');
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat menambahkan departemen');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Tabel Directorate */}
                <section>
                    <h1>Daftar Directorate</h1>
                    <table className="min-w-full border border-gray-200 dark:border-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="border px-4 py-2 text-left">ID</th>
                                <th className="border px-4 py-2 text-left">Nama Directorate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directoratesState.map((dir) => (
                                <tr key={dir.id}>
                                    <td>{dir.id}</td>
                                    <td>{dir.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Tabel Departemen */}
                <section>
                    <h1>Daftar Departemen</h1>
                    <table className="min-w-full border border-gray-200 dark:border-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="border px-4 py-2 text-left">ID</th>
                                <th className="border px-4 py-2 text-left">Nama Departemen</th>
                                <th className="border px-4 py-2 text-left">Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departState.map((dept) => (
                                <tr key={dept.id}>
                                    <td>{dept.id}</td>
                                    <td>{dept.name}</td>
                                    <td>{divisions.find(d => d.id === dept.divisions_id)?.name ?? '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Form Tambah Directorate */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Tambah Directorate</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                        <input
                            type="text"
                            placeholder="Masukkan nama directorate"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-md p-5 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            required
                        />
                        <button type="submit" className="w-fit px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Simpan
                        </button>
                    </form>
                </section>

                {/* Form Tambah Departemen */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Tambah Departemen</h2>
                    <form onSubmit={submitDept} className="flex flex-col gap-4 max-w-md">
                        <input
                            type="text"
                            placeholder="Masukkan nama departemen"
                            value={formDept.name}
                            onChange={(e) => setFormDept({ ...formDept, name: e.target.value })}
                            className="w-full rounded-md p-5 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            required
                        />
                        <select
                            value={selectedDivisionId}
                            onChange={(e) => setSelectedDivisionId(Number(e.target.value))}
                            className="w-full rounded-md p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            required
                        >
                            <option value="">Pilih Division</option>
                            {divisions.map((div) => (
                                <option key={div.id} value={div.id}>{div.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="w-fit px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Simpan
                        </button>
                    </form>
                </section>

            </div>
        </AppLayout>
    );
}
