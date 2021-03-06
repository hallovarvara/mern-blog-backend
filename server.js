const express = require("express");
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());

const articlesInfo = {
  "learn-react": { upvotes: 0, comments: [] },
  "start-blog": { upvotes: 0, comments: [] },
  "design-concepts": { upvotes: 0, comments: [] },
};

app.get("/api/blog/:path", (req, res) => {
  const { path } = req.params;
  const info = articlesInfo[path];

  if (info) {
    res.json(info);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/blog/:path/upvotes", (req, res) => {
  const { path } = req.params;
  articlesInfo[path].upvotes += 1;
  res.send(articlesInfo[path]);
});

app.listen(8000, () => console.log("Server is listening on port 8000!"));
