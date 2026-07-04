"use client";

import { use, useRef, useState, useEffect } from "react";
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

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const product = useQuery(api.products.getForEdit, {
    id: id as Id<"products">,
  });
  const categories = useQuery(api.categories.list);
  const updateProduct = useMutation(api.products.update);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  // ── Image state ───────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [existingImages, setExistingImages] = useState<
    {
      storageId: Id<"_storage">;
      url: string | null;
    }[]
  >([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
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

  // ── Pre-fill once product loads ──────────────────────────────────
  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.name,
      price: product.price.toString(),
      categoryId: product.categoryId,
      tag: product.tag ?? "None",
      description: product.description,
      details: product.details.length ? product.details : [""],
      sizes: product.sizes,
    });
    setExistingImages(product.images);
  }, [product]);

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
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  }

  function removeExisting(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  function removeNew(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadNewImages(): Promise<Id<"_storage">[]> {
    const ids: Id<"_storage">[] = [];
    for (const file of newFiles) {
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

    const hasImages = existingImages.length > 0 || newFiles.length > 0;
    if (!hasImages) return toast.error("At least one image is required");

    if (!form.categoryId) return toast.error("Please select a category");
    if (form.sizes.length === 0)
      return toast.error("Please select at least one size");

    try {
      setUploading(true);
      const newIds = await uploadNewImages();

      // Final image list = whatever existing images weren't removed + new uploads
      const finalImages = [
        ...existingImages.map((img) => img.storageId),
        ...newIds,
      ];

      await updateProduct({
        id: id as Id<"products">,
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
        images: finalImages,
      });

      toast.success("Product updated!");
      router.push("/admin");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update product",
      );
    } finally {
      setUploading(false);
    }
  }

  if (product === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-muted-foreground text-sm">Product not found.</p>
      </div>
    );
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
              Remove images you no longer want, or add new ones.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <div
                  key={img.storageId}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border"
                >
                  {img.url && (
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeExisting(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {newPreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border border-foreground"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
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
                onValueChange={(v) => set("categoryId", v)}
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
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Tag</Label>
              <Select value={form.tag} onValueChange={(v) => set("tag", v)}>
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
                  placeholder="e.g. 100% cotton"
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
            <CardTitle className="text-sm font-medium">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
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
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
