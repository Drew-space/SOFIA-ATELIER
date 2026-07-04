import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Resolves one storage ID to a viewable URL — used for image previews
// while building/editing a product or category in the admin dashboard.
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});

// Call this from your admin dashboard right before uploading a file.
// Returns a URL you POST the raw file to; the response gives you a
// storageId to save on the product/category (e.g. images: [storageId]).
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
