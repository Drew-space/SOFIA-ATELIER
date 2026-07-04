"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type Props = {
  value: Id<"_storage">[];
  onChange: (ids: Id<"_storage">[]) => void;
  multiple?: boolean;
};

export function ImageUploader({ value, onChange, multiple = true }: Props) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newIds: Id<"_storage">[] = [];
      for (const file of Array.from(files)) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        newIds.push(storageId);
      }
      onChange(multiple ? [...value, ...newIds] : newIds);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (id: Id<"_storage">) => {
    onChange(value.filter((v) => v !== id));
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
        className="text-sm"
      />
      {uploading && <p className="text-xs text-gray-400">Uploading…</p>}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((id) => (
            <div
              key={id}
              className="relative w-20 h-20 bg-gray-100 border rounded overflow-hidden"
            >
              <StoredImage storageId={id} />
              <button
                type="button"
                onClick={() => removeImage(id)}
                className="absolute top-0 right-0 bg-black/70 text-white text-xs w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StoredImage({ storageId }: { storageId: Id<"_storage"> }) {
  const url = useQuery(api.files.getUrl, { storageId });
  if (!url) return <div className="w-full h-full animate-pulse bg-gray-200" />;
  return <img src={url} alt="" className="w-full h-full object-cover" />;
}
