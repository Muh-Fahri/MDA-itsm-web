import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

interface Directorate {
    id: number;
    name: string;
}

interface Division {
    id: number;
    name: string;
    directorat_id?: number;
}

interface Departemen {
    id: number;
    name: string;
    divisions_id?: number;
}

interface DashboardProps {
    directorates: Directorate[];
    divisions: Division[];
    departemen: Departemen[];
}

export default function Dashboard() {
    const { directorates = [], divisions = [], departemen = [] } =
        usePage().props as unknown as DashboardProps;
    const chartData = directorates.map((dir) => {
        const totalDiv = divisions.filter(
            (div) => div.directorat_id === dir.id
        ).length;
        const totalDept = departemen.filter((dep) =>
            divisions.some(
                (div) => div.id === dep.divisions_id && div.directorat_id === dir.id
            )
        ).length;
        return {
            name: dir.name,
            Divisi: totalDiv,
            Departemen: totalDept,
        };
    });

    return (
        <AppLayout
            breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Dashboard MDA ITSM
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Directorate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {directorates.length}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Division</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {divisions.length}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Departemen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {departemen.length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Grafik Garis */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Tren Struktur Organisasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="Divisi"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Departemen"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500">
                                Belum ada data untuk ditampilkan.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
