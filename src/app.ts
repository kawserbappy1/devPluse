import express from "express";
import cors from "cors";
const app = express();

// midlleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "This is the server response",
  });
});

export default app;
