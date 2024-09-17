import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { Workout } from "./workouts";

export type RepEntry = {
  _id: string
  workoutId: string,
  reps: number,
  timestamp: number
}

export const getEntry = query({
  args: {
    entryId: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
      throw new Error("Not authorized")
    }

    const entry: RepEntry = await ctx.db.get(args.entryId as Id)
    if(!entry) {
      throw new Error("Not found")
    }

    const wo: Workout = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("_id"), entry.workoutId as Id),
        q.eq(q.field("userId"), auth.subject)
      )).first()
    if(!wo) {
      throw new Error("Not authorized");
    }

    return entry
  }
})

export const update = mutation({
  args: {
    entryId: v.string(),
    reps: v.number()
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
      throw new Error("Not authorized")
    }

    const entry: RepEntry = await ctx.db.get(args.entryId as Id)
    if(!entry) {
      throw new Error("Not found")
    }

    const wo: Workout = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("_id"), entry.workoutId as Id),
        q.eq(q.field("userId"), auth.subject)
      )).first()
    if(!wo) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.entryId as Id, {
      reps: args.reps
    })
  }
})

export const remove = mutation({
  args: {
    entryId: v.string()
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
        throw new Error("Not authorized")
    }

    const entry: RepEntry = await ctx.db.get(args.entryId as Id)
    if(!entry) {
      throw new Error("Not found")
    }

    const wo: Workout = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("_id"), entry.workoutId as Id),
        q.eq(q.field("userId"), auth.subject)
      )).first()
    if(!wo) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.entryId as Id)
  }
})