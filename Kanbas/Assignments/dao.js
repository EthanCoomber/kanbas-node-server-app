import model from "./model.js";

/**
 * Retrieves all assignments for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<Array>} - List of assignments belonging to the course.
 */
export function findAssignmentsForCourse(courseId) {
  console.log('finding assignments', courseId);
  return model.find({ course: courseId });
}

/**
 * Creates a new assignment and saves it to the database.
 * @param {Object} assignment - The assignment data.
 * @returns {Promise<Object>} - The newly created assignment.
 */
export function createAssignment(assignment) {
  return model.create(assignment);
}

/**
 * Deletes an assignment by its ID.
 * @param {string} assignmentId - The ID of the assignment to delete.
 * @returns {Promise<Object>} - Result of the delete operation.
 */
export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

/**
 * Updates an existing assignment with new data.
 * @param {string} assignmentId - The ID of the assignment to update.
 * @param {Object} assignmentUpdates - The updated assignment data.
 * @returns {Promise<Object>} - The result of the update operation.
 */
export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}

/**
 * Retrieves all assignments.
 * @returns {Promise<Array>} - List of all assignments in the database.
 */
export function findAllAssignments() {
  return model.find();
}
