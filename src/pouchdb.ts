import PouchDB from "pouchdb";
import pouchdbFind from "pouchdb-find";
import os from "os";
import path from "path";
import { CourseClass, Student, User } from "theta-core";

const DEFAULT_SAVE_DIR = path.join(os.homedir(), "theta-db");
const POUCHDB = "http://localhost:5984/theta-db";

PouchDB.plugin(pouchdbFind);

const remoteDb = new PouchDB(POUCHDB);
const db = new PouchDB(DEFAULT_SAVE_DIR);

db.sync(remoteDb);

db.createIndex({
  index: {
    fields: [User.USER, "userName", "password"],
    ddoc: User.USER,
  },
});

db.createIndex({
  index: {
    fields: [CourseClass.COURSE_CLASS],
    ddoc: CourseClass.COURSE_CLASS,
  },
});

export const database = db;
export const query = {
  user(userName: string, password: string) {
    return {
      selector: {
        USER: User.USER,
        userName: { $eq: userName },
        password: { $eq: password },
      },
      limit: 1,
    };
  },
  users() {
    return {
      selector: {
        USER: User.USER,
      },
    };
  },
  courseClasses() {
    return {
      selector: {
        COURSE_CLASS: CourseClass.COURSE_CLASS,
      },
    };
  },
};
export default db;
