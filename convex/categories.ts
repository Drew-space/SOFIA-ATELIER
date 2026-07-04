import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { slugify } from "./lib/slug";

// All categories, alphabetical — mirrors getAllCategories() from Sanity
export const list = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    categories.sort((a, b) => a.name.localeCompare(b.name));

    return Promise.all(
      categories.map(async (c) => ({
        _id: c._id,
        name: c.name,
        slug: c.slug,
        headerImage: c.headerImage
          ? await ctx.storage.getUrl(c.headerImage)
          : null,
      })),
    );
  },
});

// Single category by slug — used to resolve /[category] pages
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!category) return null;

    return {
      _id: category._id,
      name: category.name,
      slug: category.slug,
      headerImage: category.headerImage
        ? await ctx.storage.getUrl(category.headerImage)
        : null,
    };
  },
});

// Categories with their live product count — powers the admin dashboard's
// per-category stat cards. Updates automatically as categories/products change.
export const listWithCounts = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    categories.sort((a, b) => a.name.localeCompare(b.name));

    return Promise.all(
      categories.map(async (c) => {
        const products = await ctx.db
          .query("products")
          .withIndex("by_category", (q) => q.eq("categoryId", c._id))
          .collect();

        return {
          _id: c._id,
          name: c.name,
          slug: c.slug,
          headerImage: c.headerImage
            ? await ctx.storage.getUrl(c.headerImage)
            : null,
          productCount: products.length,
        };
      }),
    );
  },
});

// Create a category — slug is generated from name automatically
export const create = mutation({
  args: {
    name: v.string(),
    headerImage: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const slug = slugify(args.name);

    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) {
      throw new Error(
        `A category with the slug "${slug}" already exists (${existing.name}). Choose a different name.`,
      );
    }

    return await ctx.db.insert("categories", {
      name: args.name,
      slug,
      headerImage: args.headerImage,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    headerImage: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { id, name, headerImage }) => {
    const patch: Record<string, unknown> = {};
    if (name !== undefined) {
      patch.name = name;
      patch.slug = slugify(name);
    }
    if (headerImage !== undefined) patch.headerImage = headerImage;

    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, { id }) => {
    const inUse = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", id))
      .first();

    if (inUse) {
      throw new Error(
        "Cannot delete this category — one or more products still reference it. Reassign those products first.",
      );
    }

    await ctx.db.delete(id);
  },
});
