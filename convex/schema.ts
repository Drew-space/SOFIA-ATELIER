// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   users: defineTable({
//     clerkId: v.string(),
//     email: v.string(),
//     name: v.string(),
//     username: v.string(),
//     imageUrl: v.string(),
//   })
//     .index("by_clerkId", ["clerkId"])
//     .index("by_email", ["email"]),

//   categories: defineTable({
//     name: v.string(), // e.g. "Male", "Female", "Kids", "Accessories"
//     slug: v.string(), // generate from name in your mutation, e.g. lowercase + hyphenate
//     headerImage: v.optional(v.id("_storage")), // banner shown at top of category page
//   }).index("by_slug", ["slug"]),

//   products: defineTable({
//     name: v.string(),
//     slug: v.string(), // generate from name in your mutation
//     price: v.number(),
//     categoryId: v.id("categories"), // reference to categories table
//     tag: v.optional(
//       v.union(v.literal("New"), v.literal("Sale"), v.literal("Limited")),
//     ),
//     description: v.string(),
//     details: v.array(v.string()), // bullet-point spec list — fabric, fit, origin
//     sizes: v.array(
//       v.union(
//         v.literal("One Size"),
//         v.literal("XXS"),
//         v.literal("XS"),
//         v.literal("S"),
//         v.literal("M"),
//         v.literal("L"),
//         v.literal("XL"),
//         v.literal("XXL"),
//       ),
//     ),
//     images: v.array(v.id("_storage")), // uploaded via Convex file storage
//   })
//     .index("by_slug", ["slug"])
//     .index("by_category", ["categoryId"]),

//   siteSettings: defineTable({
//     // Singleton table — only ever one document. Query the first result.
//     whatsappNumber: v.optional(v.string()), // include country code, e.g. "2347061673695"
//     email: v.optional(v.string()),
//     telegramUsername: v.optional(v.string()), // include the @, e.g. "@sofia08500"
//     socialLinks: v.optional(
//       v.array(
//         v.object({
//           platform: v.union(
//             v.literal("Instagram"),
//             v.literal("Facebook"),
//             v.literal("TikTok"),
//             v.literal("Pinterest"),
//             v.literal("X"),
//             v.literal("Threads"),
//             v.literal("YouTube"),
//           ),
//           url: v.string(),
//         }),
//       ),
//     ),
//   }),
// });

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    username: v.string(),
    imageUrl: v.string(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  categories: defineTable({
    name: v.string(), // e.g. "Male", "Female", "Kids", "Accessories"
    slug: v.string(), // generate from name in your mutation, e.g. lowercase + hyphenate
    headerImage: v.optional(v.id("_storage")), // banner shown at top of category page
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(), // generate from name in your mutation
    price: v.number(),
    categoryId: v.id("categories"), // reference to categories table
    tag: v.optional(
      v.union(v.literal("New"), v.literal("Sale"), v.literal("Limited")),
    ),
    description: v.string(),
    details: v.array(v.string()), // bullet-point spec list — fabric, fit, origin
    sizes: v.array(
      v.union(
        v.literal("One Size"),
        v.literal("XXS"),
        v.literal("XS"),
        v.literal("S"),
        v.literal("M"),
        v.literal("L"),
        v.literal("XL"),
        v.literal("XXL"),
      ),
    ),
    images: v.array(v.id("_storage")), // uploaded via Convex file storage
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),

  siteSettings: defineTable({
    // Singleton table — only ever one document. Query the first result.
    whatsappNumber: v.optional(v.string()), // include country code, e.g. "2347061673695"
    email: v.optional(v.string()),
    telegramUsername: v.optional(v.string()), // include the @, e.g. "@sofia08500"
    socialLinks: v.optional(
      v.array(
        v.object({
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
        }),
      ),
    ),
  }),
});
