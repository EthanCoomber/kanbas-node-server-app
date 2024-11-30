import mongoose from "mongoose";
import * as assignmentsDao from "./dao.js";

/**
 * Defines all assignment-related routes.
 * @param {Object} app - The Express application instance.
 */
export default function AssignmentRoutes(app) {
  /**
   * GET /api/courses/:cid/assignments
   * Retrieves all assignments for a specific course.
   */
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ error: `Invalid course ID: ${cid}` });
    }

    try {
      const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
      console.log("Assignments:", assignments);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  /**
   * POST /api/courses/:cid/assignments
   * Creates a new assignment for a specific course.
   */
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ error: `Invalid course ID: ${cid}` });
    }

    const newAssignmentData = {
      ...req.body,
      course: cid, // Associates the assignment with the course ID from the URL
    };

    try {
      const newAssignment = await assignmentsDao.createAssignment(newAssignmentData);
      res.status(201).json(newAssignment); // 201 Created
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  /**
   * DELETE /api/assignments/:mid
   * Deletes an assignment by its ID.
   */
  app.delete("/api/assignments/:mid", async (req, res) => {
    const { mid } = req.params;

    // Validate assignment ID
    if (!mongoose.Types.ObjectId.isValid(mid)) {
      return res.status(400).json({ error: `Invalid assignment ID: ${mid}` });
    }

    try {
      await assignmentsDao.deleteAssignment(mid);
      res.sendStatus(204); // 204 No Content
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  /**
   * PUT /api/assignments/:mid
   * Updates an existing assignment by its ID.
   */
  app.put("/api/assignments/:mid", async (req, res) => {
    const { mid } = req.params;

    // Validate assignment ID
    if (!mongoose.Types.ObjectId.isValid(mid)) {
      return res.status(400).json({ error: `Invalid assignment ID: ${mid}` });
    }

    const assignmentUpdates = req.body;

    try {
      const updatedAssignment = await assignmentsDao.updateAssignment(mid, assignmentUpdates);

      if (updatedAssignment) {
        res.sendStatus(204); // 204 No Content
      } else {
        res.status(404).json({ message: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}
