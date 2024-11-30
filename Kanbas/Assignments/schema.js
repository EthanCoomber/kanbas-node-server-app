import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    name: { type: String },
    description: { type: String },
    points: { type: Number },
    dueDate: { type: Date },
    availableFromDate: { type: Date },
    availableUntilDate: { type: Date },
  },
  { collection: "assignments" }
);

export default schema;
