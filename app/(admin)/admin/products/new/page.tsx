"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, X, Loader2 } from "lucide-react";

const ALL_SIZES = ["One Size", "XXS", "XS", "S", "M", "L", "XL", "XXL"];
const TAGS = ["None", "New", "Sale", "Limited"];

export default function NewProductPage() {
  const router = useRouter();

  const categories = useQuery(api.categories.list);
  const createProduct = useMutation(api.products.create);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  // ── Image state ───────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // ── Form state ────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    tag: "None",
    description: "",
    details: [""],
    sizes: [] as string[],
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleSize(size: string) {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }

  function updateDetail(i: number, val: string) {
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((d, idx) => (idx === i ? val : d)),
    }));
  }

  function addDetail() {
    setForm((prev) => ({ ...prev, details: [...prev.details, ""] }));
  }

  function removeDetail(i: number) {
    setForm((prev) => ({
      ...prev,
      details: prev.details.filter((_, idx) => idx !== i),
    }));
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadImages(): Promise<Id<"_storage">[]> {
    const ids: Id<"_storage">[] = [];
    for (const file of imageFiles) {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const { storageId } = await res.json();
      ids.push(storageId);
    }
    return ids;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (imageFiles.length === 0)
      return toast.error("Upload at least one image");
    if (!form.name) return toast.error("Product name is required");
    if (!form.categoryId) return toast.error("Please select a category");
    if (!form.price) return toast.error("Price is required");
    if (form.sizes.length === 0)
      return toast.error("Please select at least one size");
    if (!form.description) return toast.error("Description is required");

    try {
      setUploading(true);
      const imageIds = await uploadImages();

      await createProduct({
        name: form.name,
        price: Number(form.price),
        categoryId: form.categoryId as Id<"categories">,
        tag:
          form.tag === "None"
            ? undefined
            : (form.tag as "New" | "Sale" | "Limited"),
        description: form.description,
        details: form.details.filter((d) => d.trim() !== ""),
        sizes: form.sizes as any,
        images: imageIds,
      });

      toast.success("Product added successfully!");
      router.push("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add product");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Product Images
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              First image will be used as the main product photo.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-28 h-20 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-foreground transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-[10px]">Add image</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </CardContent>
        </Card>

        {/* Core Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Core Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label className="text-xs">Product Name *</Label>
              <Input
                placeholder="e.g. Blush Pink Mermaid Gown"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Category *</Label>
              <Select
                value={form.categoryId}
                onValueChange={(v) => set("categoryId", v ?? "")}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {categories?.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No categories yet — create one on the Categories page first.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Tag</Label>
              <Select
                value={form.tag}
                onValueChange={(v) => set("tag", v ?? "None")}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TAGS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Price ($) *</Label>
              <Input
                type="number"
                min={0}
                step="0.01"
                placeholder="e.g. 1900"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Available Sizes *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`px-3 py-1.5 text-xs border rounded-md transition-colors ${
                    form.sizes.includes(s)
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Details{" "}
              <span className="text-muted-foreground font-normal">
                (fabric, fit, origin)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {form.details.map((d, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={d}
                  onChange={(e) => updateDetail(i, e.target.value)}
                  placeholder="e.g. 100% heavyweight cotton"
                  className="h-9 text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeDetail(i)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit text-xs"
              onClick={addDetail}
            >
              + Add detail
            </Button>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Description *</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write a short description..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              required
              className="text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3 pb-8">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
