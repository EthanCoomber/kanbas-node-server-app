import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  // const findCoursesForEnrolledUser = (req, res) => {
  //   let { userId } = req.params;
  //   if (userId === "current") {
  //     const currentUser = req.session["currentUser"];
  //     if (!currentUser) {
  //       res.sendStatus(401);
  //       return;
  //     }
  //     userId = currentUser._id;
  //   }
  //   const courses = courseDao.findCoursesForEnrolledUser(userId);
  //   res.json(courses);
  // };
  // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  // app.get("/api/users/current/courses", (req, res) => {
  //   console.log("Session:", req.session);
  //   if (!req.session.currentUser) {
  //     return res.sendStatus(401);
  //   }
  //   const courses = courseDao.findCoursesForEnrolledUser(
  //     req.session.currentUser._id
  //   );
  //   res.json(courses);
  // });

  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body, _id: new Date().getTime().toString() };
  //   Database.courses.push(course);
  //   res.send(course);
  // });
  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses.filter((c) => c._id !== id);
  //   res.sendStatus(204);
  // });
  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = req.body;
  //   Database.courses = Database.courses.map((c) =>
  //     c._id === id ? { ...c, ...course } : c
  //   );
  //   res.sendStatus(204);
  // });
}
