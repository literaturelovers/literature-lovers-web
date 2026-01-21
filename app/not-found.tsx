'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md text-center">
                <h1 className="text-8xl font-extrabold text-gray-900 tracking-tight">
                    404
                </h1>

                <p className="mt-4 text-2xl font-semibold text-gray-800">
                    Page not found
                </p>

                <p className="mt-2 text-gray-600">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
                    >
                        Go Home
                    </Link>
                    <button
                        onClick={handleClick}
                        className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}