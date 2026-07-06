"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EllipsisVertical, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const allProducts = useQuery(api.products.listAdmin) ?? [];
  const categoriesWithCounts = useQuery(api.categories.listWithCounts) ?? [];

  const deleteProduct = useMutation(api.products.remove);

  // ── Stats ─────────────────────────────────────────────────────────
  const totalProducts = allProducts.length;
  const totalCategories = categoriesWithCounts.length;

  // ── Search filter ─────────────────────────────────────────────────
  const filtered = allProducts.filter((p) => {
    const q = search.toLowerCase();
    return (
      !search ||
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
  });

  // ── Handlers ─────────────────────────────────────────────────────
  async function handleDelete(id: Id<"products">) {
    try {
      await deleteProduct({ id });
      toast.success("Product deleted");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete product",
      );
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border p-4 flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium">
            Total Products
          </p>
          <p className="text-4xl font-semibold">{totalProducts}</p>
        </div>
        <div className="rounded-xl border p-4 flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium">
            Total Categories
          </p>
          <p className="text-4xl font-semibold">{totalCategories}</p>
        </div>

        {/* One card per category, generated dynamically — add a category
            in Studio... err, in /admin/categories, and a card appears here
            automatically, no code changes needed. */}
        {categoriesWithCounts.map((c) => (
          <div
            key={c._id}
            className="rounded-xl border p-4 flex flex-col gap-2"
          >
            <p className="text-xs text-muted-foreground font-medium">
              {c.name}
            </p>
            <p className="text-4xl font-semibold">{c.productCount}</p>
          </div>
        ))}
      </div>

      {/* ── Products inventory ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <CardTitle className="text-sm font-medium">
                All Products
              </CardTitle>
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>
            <Link href="/admin/products/new">
              <Button size="sm" className="text-xs h-8 gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Add Product
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {allProducts.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-3 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {search
                ? "No products match your search."
                : "No products added yet."}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filtered.map((product) => (
                <div
                  key={product._id}
                  className="relative rounded-xl border overflow-hidden"
                >
                  {/* Three-dot menu */}
                  <div className="absolute top-2 right-2 z-20">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white">
                        <EllipsisVertical className="h-3 w-3 text-gray-700" />
                      </DropdownMenuTrigger>

                      {/*                       
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-6 w-6 rounded-full bg-white/90 hover:bg-white shadow-sm"
                        >
                          <EllipsisVertical className="h-3 w-3 text-gray-700" />
                        </Button>
                      </DropdownMenuTrigger> */}
                      <DropdownMenuContent align="end" className="w-44 text-xs">
                        <DropdownMenuItem
                          className="text-xs"
                          onClick={() =>
                            router.push(`/admin/products/${product._id}/edit`)
                          }
                        >
                          Edit product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                 
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <DropdownMenuItem
                                className="text-xs text-destructive focus:text-destructive"
                                onSelect={(e) => e.preventDefault()}
                              >
                                Delete product
                              </DropdownMenuItem>
                            }
                          />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete {product.name}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The product and
                                all its images will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-white hover:bg-destructive/90"
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-muted">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.categoryName} · ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
