import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workouts").collect();
  },
});

export const insert = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("workouts", {
      name: args.name
    })
  }
})

export const remove = mutation({
  args: {
    id: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id as Id)
  }
})