"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "@/components/ui/button";
import { createTrip } from "../../../lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { useRouter } from "next/navigation";

export default function NewTripPage() {
  const [isPending, startTransition] = React.useTransition();
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 px-4 sm:px-0">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          {/* Native Form Submission to Server Action */}
          <form
          action={createTrip} className="space-y-6">

            {/* Hidden image field */}
             <input type="hidden"
              name="imageUrl"
              value={uploadedImage || ""} />

            {/* Trip Title */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Trip Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="World Trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>


            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Trip Description
              </label>
              <textarea
                name="description"
                placeholder="Trip description..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>
            </div>

            {/* Trip Image */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Trip Image
              </label>

              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded Trip"
                  className="mb-4 w-full h-64 object-cover rounded-md"
                />
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setUploadedImage(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error:", error);
                }}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || !uploadedImage} // wait for image upload
              className="w-full cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Create Trip"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}