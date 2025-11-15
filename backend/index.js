import { Vonage } from "@vonage/server-sdk";
import { Assets, vcr, State } from "@vonage/vcr-sdk";
import { Auth } from "@vonage/auth";
import express from "express";
import axios from "axios";
import path from "path";
import cors from "cors";

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "*"; // fallback for local/dev

app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

const port = process.env.VCR_PORT;

// VCR Providers
const session = vcr.createSession();
const assets = new Assets(vcr.getGlobalSession());
const state = new State(vcr.getGlobalSession());

// Get the VCR instance service name from the environment
const instanceServiceName = process.env.INSTANCE_SERVICE_NAME;
let VCR_URL = "";
if (instanceServiceName) {
  VCR_URL = `https://${instanceServiceName}.use1.runtime.vonage.cloud`;
  console.log("VCR_URL:", VCR_URL);
} else {
  console.log("INSTANCE_SERVICE_NAME not set in environment.");
}

app.use(express.json());
app.use(express.static("public"));

app.get("/_/health", async (req, res) => {
  res.sendStatus(200);
});

app.get("/_/metrics", async (req, res) => {
  res.sendStatus(200);
});

// API Routes
app.get("/api/first", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "First endpoint response",
      timestamp: new Date().toISOString(),
      data: {
        route: "first",
        description: "This is the first API endpoint",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/second", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Second endpoint response",
      timestamp: new Date().toISOString(),
      data: {
        route: "second",
        description: "This is the second API endpoint",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
