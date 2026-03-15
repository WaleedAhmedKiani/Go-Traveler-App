import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, MapPinned, Route } from "lucide-react";
import GlobePreview from "../components/GlobePreview";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/trips");
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-gray-100">

      {/* HERO */}
      <section className="container-main section-main">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-6 ">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Your Travel Journey
              </h1>

              <Globe className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
            </div>

            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md">
              Plan trips, track destinations, and explore your travel history
              through an interactive 3D globe.
            </p>

            <div className="grid grid-cols-1 sm:flex gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="cursor-pointer w-full ">
                  Get Started
                </Button>
              </Link>

              <Link href="/trips" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="cursor-pointer w-full">
                  View Demo
                </Button>
              </Link>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative w-full bg-white rounded-2xl shadow-lg h-64 sm:h-72 md:h-96 flex items-center justify-center overflow-hidden hover:shadow-xl transition">
            <GlobePreview />
          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="container-main py-16 ">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <MapPinned className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Plan Trips</h3>
            <p className="text-gray-600">
              Organize destinations and build your travel journey easily.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <Globe className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Globe</h3>
            <p className="text-gray-600">
              Visualize your trip on a beautiful 3D globe.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <Route className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track History</h3>
            <p className="text-gray-600">
              See all your previous trips and upcoming journeys.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-white border-t">

        <div className="container-main py-16 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Start Your Travel Story Today
          </h2>

          <p className="text-gray-600 mb-6">
            Sign in and begin mapping your adventures around the world.
          </p>

          <Link href="/login">
            <Button size="lg" className="cursor-pointer">
              Sign In
            </Button>
          </Link>

        </div>

      </section>

    </main>
  );
}