import * as bodyParser from "body-parser";
import * as express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import UsersRouter from "./routes/users.router";
import connectToDatabase from "./utils/databaseConnector";

class RestApi {
  public expressApp: express.Application = express();

  constructor(router: UsersRouter) {
    connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRouter(router);
    this.initializeErrorHandling();
  }

  public listen() {
    this.expressApp.listen(process.env.PORT);
  }

  private initializeRouter(router) {
    this.expressApp.use("/", router.expressRouter);
  }

  private initializeMiddlewares() {
    this.expressApp.use(bodyParser.json());
  }

  private initializeErrorHandling() {
    this.expressApp.use(errorMiddleware);
  }

}

export default RestApi;
