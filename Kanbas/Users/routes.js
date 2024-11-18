import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {};
  const findUserById = (req, res) => {};
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);

  const signin = (req, res) => {
    // console.log("req.body", req);
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password); // Example logic
    if (user) {
      req.session.currentUser = user;
      console.log("Session Set:", req.session);
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    console.log("here?");
    let { userId } = req.params;
    console.log("userId", userId);

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      console.log("currentUser", currentUser);
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
