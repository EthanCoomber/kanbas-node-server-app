import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/enrollments/:id", (req, res) => {
    const courseId = req.params.id;

    const courseExists = dao
      .findAllCourses()
      .some((course) => course._id === courseId);
    if (!courseExists) {
      return res.status(404).send({ message: "Course not found" });
    }

    dao.unenroll(courseId);

    res.sendStatus(204);
  });

  const enroll = (req, res) => {
    const currentUserId = req.params.userId;
    const courseId = req.params.id;
    console.log("currentUser", currentUserId);
    dao.enrollUserInCourse(currentUserId, courseId);
    res.sendStatus(204);
  };
  app.put("/api/enrollments/:id/:userId", enroll);
}
