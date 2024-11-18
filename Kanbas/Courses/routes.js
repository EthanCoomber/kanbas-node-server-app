// CourseRoutes.js
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const courseId = req.params.id;

    const courseExists = dao
      .findAllCourses()
      .some((course) => course._id === courseId);
    if (!courseExists) {
      return res.status(404).send({ message: "Course not found" });
    }

    dao.deleteCourse(courseId);

    res.sendStatus(204);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });
}
