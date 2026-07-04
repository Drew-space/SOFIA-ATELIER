import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

const socialLinkValidator = v.object({
  platform: v.union(
    v.literal("Instagram"),
    v.literal("Facebook"),
    v.literal("TikTok"),
    v.literal("Pinterest"),
    v.literal("X"),
    v.literal("Threads"),
    v.literal("YouTube"),
  ),
  url: v.string(),
});

// Mirrors getSiteSettings() — there's only ever one document
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("siteSettings").first();
  },
});

// Creates the settings doc if it doesn't exist yet, otherwise updates it.
// Call this from your admin dashboard's settings form.
export const upsert = mutation({
  args: {
    whatsappNumber: v.optional(v.string()),
    email: v.optional(v.string()),
    telegramUsername: v.optional(v.string()),
    socialLinks: v.optional(v.array(socialLinkValidator)),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("siteSettings").first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("siteSettings", args);
  },
});
