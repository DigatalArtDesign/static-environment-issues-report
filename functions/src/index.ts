import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import service from "./permissions.json";
import {ServiceAccount} from "firebase-admin";

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(service as ServiceAccount),
  databaseURL: "https://save-and-save-default-rtdb.firebaseio.com/",
});
const db = admin.firestore();

app.use(cors({origin: true}));

app.get("/hello", (req, res) => {
  return res.status(200).send("Hello world");
});

app.post("/api/reports", (req, res) => {
  (
    async () => {
      try {
        await db.collection("reports")
            .add({...req.body});
        return res.status(200).send({success: true});
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    }
  )();
});

app.get("/api/reports", (req, res) => {
  try {
    return db
        .collection("reports")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          return res.status(200).send(data);
        });
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
});

exports.app = functions.https.onRequest(app);
