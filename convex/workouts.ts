import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workouts").collect();
  },
});

export const listWithReps = query({
  args: {},
  handler: async (ctx) => {
    const auth = await ctx.auth.getUserIdentity()
    console.log("auth", auth)
    let workouts = await ctx.db.query("workouts").collect();
    let reps = await Promise.all(
      (workouts ?? []).map(wo => ctx.db.query("logged_reps")
        .filter(q => q.eq(q.field("workoutId"), wo._id))
        .collect()
      )
    )

    reps.flat().forEach(r => {
      let workout = workouts.find(w => w._id === r.workoutId)
      if(workout) {
        if(workout.currentReps === undefined) workout.currentReps = 0
        workout.currentReps += r.reps
      }
    })

    console.log(workouts, reps)
    return workouts
  },
});

export const getWorkout = query({
  args: {
    id: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id as Id)
  }
})

export const insert = mutation({
  args: {
    name: v.string(),
    targetReps: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("workouts", {
      name: args.name,
      targetReps: args.targetReps
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

export const logReps = mutation({
  args: {
    workoutId: v.string(),
    reps: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("logged_reps", {
      workoutId: args.workoutId,
      reps: args.reps,
      timestamp: Date.now()
    })
  }
})