// Assignments/dao.js
import Database from "../Database/index.js";

/**
 * Retrieves all assignments for a specific course.
 * @param {string} courseId - The ID of the course.
 * @returns {Array} - List of assignments belonging to the course.
 */
export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
}

/**
 * Creates a new assignment and adds it to the database.
 * @param {Object} assignment - The assignment data.
 * @returns {Object} - The newly created assignment.
 */
export function createAssignment(assignment) {
  const newAssignment = {
    ...assignment,
    _id: Date.now().toString(), // Generates a unique ID based on the current timestamp
  };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

/**
 * Deletes an assignment by its ID.
 * @param {string} assignmentId - The ID of the assignment to delete.
 */
export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}

/**
 * Updates an existing assignment with new data.
 * @param {string} assignmentId - The ID of the assignment to update.
 * @param {Object} assignmentUpdates - The updated assignment data.
 * @returns {Object|null} - The updated assignment or null if not found.
 */
export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (assignment) {
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  return null;
}
