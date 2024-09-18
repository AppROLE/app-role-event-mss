import { STAGE } from "./domain/enums/stage_enum";
import { IEventRepository } from "./domain/irepositories/event_repository_interface";
import { IPhraseRepository } from "./domain/irepositories/phrase_repository_interface";
import { envs } from "./helpers/envs/envs";
import { EventRepositoryMongo } from "./infra/database/repositories/event_repository_mongo";
import { PhraseRepositoryMongo } from "./infra/database/repositories/phrase_repository_mongo";

export class Environments {
  stage: STAGE = STAGE.TEST;
  s3BucketName: string = "";
  region: string = "";
  EventPoolId: string = "";
  clientId: string = "";
  mongoUri: string = "";
  cloudFrontUrl: string = "";

  configureLocal() {
    console.log(
      "envs.STAGE - [ENVIRONMENTS - { CONFIGURE LOCAL }] - ",
      envs.STAGE
    );
    envs.STAGE = envs.STAGE || "TEST";
  }

  loadEnvs() {
    if (!envs.STAGE) {
      this.configureLocal();
    }

    this.stage = envs.STAGE as STAGE;

    if (this.stage === STAGE.TEST) {
      this.s3BucketName = "bucket-test";
      this.region = "sa-east-1";
    } else {
      this.s3BucketName = (envs.S3_BUCKET_NAME.toLowerCase() +
        envs.STAGE.toLowerCase()) as string;
      this.region = envs.AWS_REGION as string;
      this.mongoUri = envs.MONGO_URI as string;
    }
  }

  static getEventRepo(): IEventRepository {
    console.log(
      "Environments.getEnvs().stage - [ENVIRONMENTS - { GET Event REPO }] - ",
      Environments.getEnvs().stage
    );

    if (Environments.getEnvs().stage === STAGE.TEST) {
      throw new Error("Invalid STAGE");
    } else if (
      Environments.getEnvs().stage === STAGE.DEV ||
      Environments.getEnvs().stage === STAGE.PROD
    ) {
      return new EventRepositoryMongo();
    } else {
      throw new Error("Invalid STAGE");
    }
  }

  static getPhraseRepo(): IPhraseRepository {
    console.log(
      "Environments.getEnvs().stage - [ENVIRONMENTS - { GET Event REPO }] - ",
      Environments.getEnvs().stage
    );

    if (Environments.getEnvs().stage === STAGE.TEST) {
      throw new Error("Invalid STAGE");
    } else if (
      Environments.getEnvs().stage === STAGE.DEV ||
      Environments.getEnvs().stage === STAGE.PROD
    ) {
      return new PhraseRepositoryMongo();
    } else {
      throw new Error("Invalid STAGE");
    }
  }

  static getEnvs() {
    const envs = new Environments();
    envs.loadEnvs();

    console.log("envs - [ENVIRONMENTS - { GET ENVS }] - ", envs);
    return envs;
  }
}
