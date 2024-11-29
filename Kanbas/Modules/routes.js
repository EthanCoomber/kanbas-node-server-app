import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
 
  });
  app.put("/api/modules/:moduleId", async (req, res) => {
    console.log("TESTI");
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    console.log('in update', moduleId, moduleUpdates);
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    console.log('status', status);
    res.send(status);
  });
}
