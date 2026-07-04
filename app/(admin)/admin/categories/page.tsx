"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import type { Id } from "@/convex/_generated/dataModel";
import { ImageUploader } from "../ImageUploader";

export default function CategoriesPage() {
  const categories = useQuery(api.categories.list);
  const createCategory = useMutation(api.categories.create);
  const removeCategory = useMutation(api.categories.remove);

  const [name, setName] = useState("");
  const [headerImage, setHeaderImage] = useState<Id<"_storage">[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await createCategory({ name, headerImage: headerImage[0] });
      setName("");
      setHeaderImage([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: Id<"categories">, catName: string) => {
    if (!confirm(`Delete "${catName}"? This cannot be undone.`)) return;
    try {
      await removeCategory({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not delete category.");
    }
  };

  return (
    <div className="p-8 space-y-10 max-w-2xl">
      {/* Existing categories */}
      <div>
        <h1 className="text-2xl font-semibold mb-6">Categories</h1>
        <div className="space-y-2">
          {categories?.map((c) => (
            <div
              key={c._id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div className="flex items-center gap-3">
                {c.headerImage && (
                  <img
                    src={c.headerImage}
                    alt={c.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <p className="font-medium">{c.name}</p>
              </div>
              <button
                onClick={() => handleDelete(c._id, c.name)}
                className="text-red-600 underline text-sm"
              >
                Delete
              </button>
            </div>
          ))}
          {categories?.length === 0 && (
            <p className="text-sm text-gray-500">No categories yet.</p>
          )}
        </div>
      </div>

      {/* Add new category */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Kids, Footwear"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Banner Image
            </label>
            <ImageUploader
              value={headerImage}
              onChange={(ids) => setHeaderImage(ids.slice(-1))}
              multiple={false}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-6 py-3 rounded text-sm uppercase tracking-widest"
          >
            {saving ? "Saving…" : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
