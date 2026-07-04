import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { slugify } from "./lib/slug";

const sizeValidator = v.union(
  v.literal("One Size"),
  v.literal("XXS"),
  v.literal("XS"),
  v.literal("S"),
  v.literal("M"),
  v.literal("L"),
  v.literal("XL"),
  v.literal("XXL"),
);

const tagValidator = v.optional(
  v.union(v.literal("New"), v.literal("Sale"), v.literal("Limited")),
);

// Resolves a product doc (with categoryId + storage IDs) into the shape
// your frontend expects — category slug as a string, images as URLs.
async function resolveProduct(ctx: any, product: any) {
  const category = await ctx.db.get(product.categoryId);
  const images = await Promise.all(
    product.images.map((id: string) => ctx.storage.getUrl(id)),
  );

  return {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    category: category?.slug ?? null,
    tag: product.tag,
    description: product.description,
    details: product.details,
    sizes: product.sizes,
    images: images.filter((url): url is string => url !== null),
  };
}

// Most recently added products, limited — powers the homepage grid
// instead of fetching everything and slicing client-side.
export const getLatest = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const products = await ctx.db
      .query("products")
      .order("desc")
      .take(limit ?? 3);

    return Promise.all(products.map((p) => resolveProduct(ctx, p)));
  },
});

// All products, newest first — mirrors getAllProducts()
export const list = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("desc").collect();
    return Promise.all(products.map((p) => resolveProduct(ctx, p)));
  },
});

// Single product by slug — mirrors getProductBySlug()
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!product) return null;
    return resolveProduct(ctx, product);
  },
});

// Products filtered by category slug — mirrors getProductsByCategory()
export const listByCategory = query({
  args: { categorySlug: v.string() },
  handler: async (ctx, { categorySlug }) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", categorySlug))
      .first();

    if (!category) return [];

    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .order("desc")
      .collect();

    return Promise.all(products.map((p) => resolveProduct(ctx, p)));
  },
});

// All products for the admin dashboard — resolved category name +
// first image URL, so the inventory grid can render without extra queries.
export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("desc").collect();

    return Promise.all(
      products.map(async (p) => {
        const category = await ctx.db.get(p.categoryId);
        const firstImageUrl = p.images[0]
          ? await ctx.storage.getUrl(p.images[0])
          : null;

        return {
          _id: p._id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          tag: p.tag,
          categoryId: p.categoryId,
          categoryName: category?.name ?? "Unknown",
          image: firstImageUrl,
        };
      }),
    );
  },
});

// For the admin edit form — same as getRawById but with image URLs
// resolved alongside their storage IDs, so the form can preview existing
// images while still knowing which storageId to keep or remove.
export const getForEdit = query({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    const product = await ctx.db.get(id);
    if (!product) return null;

    const images = await Promise.all(
      product.images.map(async (storageId) => ({
        storageId,
        url: await ctx.storage.getUrl(storageId),
      })),
    );

    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      tag: product.tag,
      description: product.description,
      details: product.details,
      sizes: product.sizes,
      images,
    };
  },
});

// Raw product doc (unresolved categoryId + storage IDs) — for admin edit forms
export const getRawById = query({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    categoryId: v.id("categories"),
    tag: tagValidator,
    description: v.string(),
    details: v.array(v.string()),
    sizes: v.array(sizeValidator),
    images: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const slug = slugify(args.name);

    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) {
      throw new Error(
        `A product with the slug "${slug}" already exists. Choose a different name.`,
      );
    }

    return await ctx.db.insert("products", { ...args, slug });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    categoryId: v.optional(v.id("categories")),
    tag: tagValidator,
    description: v.optional(v.string()),
    details: v.optional(v.array(v.string())),
    sizes: v.optional(v.array(sizeValidator)),
    images: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, { id, name, ...rest }) => {
    const patch: Record<string, unknown> = { ...rest };
    if (name !== undefined) {
      patch.name = name;
      patch.slug = slugify(name);
    }
    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
