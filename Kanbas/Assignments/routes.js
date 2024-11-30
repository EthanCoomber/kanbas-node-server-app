// Assignments/routes.js
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
    const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
    console.log('assignments', assignments)
    res.json(assignments);
  });

  /**
   * POST /api/courses/:cid/assignments
   * Creates a new assignment for a specific course.
   */
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const newAssignmentData = {
      ...req.body,
      course: cid, // Associates the assignment with the course ID from the URL
      // _id is handled in the DAO
    };
    const newAssignment = await assignmentsDao.createAssignment(newAssignmentData);
    res.status(201).json(newAssignment); // 201 Created
  });

  /**
   * DELETE /api/assignments/:mid
   * Deletes an assignment by its ID.
   */
  app.delete("/api/assignments/:mid", async (req, res) => {
    const { mid } = req.params;

    await assignmentsDao.deleteAssignment(mid);
    res.sendStatus(204); // 204 No Content
  });

  /**
   * PUT /api/assignments/:mid
   * Updates an existing assignment by its ID.
   */
  app.put("/api/assignments/:mid", async (req, res) => {
    const { mid } = req.params;
    const assignmentUpdates = req.body;

    const updatedAssignment = await assignmentsDao.updateAssignment(
      mid,
      assignmentUpdates
    );

    if (updatedAssignment) {
      res.sendStatus(204); // 204 No Content
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  });
}
