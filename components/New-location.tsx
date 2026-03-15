"use client";

import React from "react";
import { Button } from "./ui/button";
import { addLocation } from "../lib/actions/add-location";

export default function NewLocationClient({ tripId }: { tripId: string }) {

  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">

          <h1 className="text-4xl font-bold mb-4 text-center">
            Add New Location
          </h1>

          <form
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
            className="space-y-4"
          >

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>

              <input
                type="text"
                name="address"
                required
                className="w-full border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 px-4 py-2"
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              {isPending ? "Adding..." : "Add Location"}
            </Button>

          </form>

        </div>
      </div>
    </div>
  );
}