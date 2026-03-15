'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { Session } from "next-auth";
import { logout } from "../lib/auth-actions";
import { useParams } from "next/navigation";

export default function Navbar({ session }: { session: Session | null }) {

  const params = useParams();
  const tripId = params?.tripId as string | undefined;

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-100 shadow-md border-b border-gray-200">

      <div className="container-main">

        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <Image src="/logo.png" alt="Logo" width={50} height={50}
            className="w-8 h-8 sm:w-10 sm:h-10" />
            <p className="text-shadow-lg font-medium text-gray-800 text-sm sm:text-base">
              Go Traveler
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            {session && (
              <>
                <Link
                  href="/trips"
                  className="text-gray-600 hover:text-gray-800 font-semibold"
                >
                  Trip History
                </Link>

                {tripId && (
                  <Link
                    href={`/trips/${tripId}/globe`}
                    className="text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    Globe View
                  </Link>
                )}
              </>
            )}

            {!session ? (
              <Link href="/login">
                <button className="flex items-center text-white bg-slate-500 hover:bg-slate-600 px-3 py-2 gap-2 rounded-md">
                  <LogIn size={18} />
                  <span className="text-sm font-semibold cursor-pointer">Sign In</span>
                </button>
              </Link>
            ) : (
              <button
                onClick={logout}
                className="flex items-center text-white bg-orange-500 hover:bg-orange-600 px-3 py-2 gap-2 rounded-md"
              >
                <LogOut size={18} />
                <span className="text-sm font-semibold cursor-pointer">Sign Out</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-4">

            {session && (
              <>
                <Link
                  href="/trips"
                  className="text-gray-600 hover:text-gray-800 font-semibold"
                >
                  Trip History
                </Link>

                {tripId && (
                  <Link
                    href={`/trips/${tripId}/globe`}
                    className="text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    Globe View
                  </Link>
                )}
              </>
            )}

            {!session ? (
              <Link href="/login">
                <button className="flex items-center text-white bg-slate-500 hover:bg-slate-600 px-3 py-2 gap-2 rounded-md">
                  <LogIn size={18} />
                  <span className="text-sm font-semibold">Sign In</span>
                </button>
              </Link>
            ) : (
              <button
                onClick={logout}
                className="flex items-center text-white bg-orange-500 hover:bg-orange-600 px-3 py-2 gap-2 rounded-md"
              >
                <LogOut size={18} />
                <span className="text-sm font-semibold">Sign Out</span>
              </button>
            )}

          </div>
        )}

      </div>

    </nav>
  );
}