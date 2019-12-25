import { app as fp } from "./fp-src/app";
import { app as oop } from "./oop-src/app";
import * as mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

fp.listen(3000);
oop.listen(3001);
