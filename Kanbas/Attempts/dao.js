import model from "./model.js";

/**
 * Retrieves the number of attempts a user has made for a specific assignment.
 * @param {string} assignmentId - The ID of the assignment.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<number>} - The number of attempts.
 */
export async function getUserAttemptCount(assignmentId, userId) {
  const assignment = await model.findById(assignmentId).exec();
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  const attemptRecord = assignment.attempts.find(
    (attempt) => attempt.user.toString() === userId
  );
  return attemptRecord ? attemptRecord.count : 0;
}

/**
 * Increments the attempt count for a user on a specific assignment.
 * @param {string} assignmentId - The ID of the assignment.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The updated assignment.
 */
export async function incrementUserAttempt(assignmentId, userId) {
  return model.findOneAndUpdate(
    { _id: assignmentId, "attempts.user": userId },
    { $inc: { "attempts.$.count": 1 } },
    { new: true }
  ).exec().then(async (updatedAssignment) => {
    if (!updatedAssignment) {
      // If the user hasn't attempted yet, add a new record
      return model.findByIdAndUpdate(
        assignmentId,
        { $push: { attempts: { user: userId, count: 1 } } },
        { new: true }
      ).exec();
    }
    return updatedAssignment;
  });
  