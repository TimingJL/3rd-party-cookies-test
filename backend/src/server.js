import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

const server = express();
const cookieIdMap = new Map();
server
  .disable("x-powered-by")
  .use(
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser("OMG"),
    express.static("asset")
  );


server.get("/track", (req, res) => {
  const cid = req.query.cid;
  const redirect = req.query.redirect;
  let ght_id = req.cookies["ght_id"];

  if (!ght_id) {
    ght_id = Math.random();
    cookieIdMap[ght_id] = [cid];

  }
  else
    cookieIdMap[ght_id] = [...(cookieIdMap[ght_id] || []), cid];

  console.log(cookieIdMap);
  res.cookie("ght_id", ght_id, { sameSite: "none", secure: true }).redirect(redirect)
});

server.get("/hello", (req, res) => {

  res.send("hello")
});

const PORT = 4001;
server.listen(PORT, () =>
  console.log(
    `Server ready at http://localhost:${PORT}`
  )
);




