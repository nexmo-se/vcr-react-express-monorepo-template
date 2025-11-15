import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import "./App.css";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://neru-4f2ff535-epic-call-app-backend-dev.use1.runtime.vonage.cloud"
    : "";

function App() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetFirst = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BACKEND_URL}/api/first`);
      setResponses((prev) => [
        {
          endpoint: "First",
          timestamp: new Date().toLocaleString(),
          data: result.data,
        },
        ...prev,
      ]);
    } catch (error) {
      setResponses((prev) => [
        {
          endpoint: "First",
          timestamp: new Date().toLocaleString(),
          error: error.message,
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSecond = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BACKEND_URL}/api/second`);
      setResponses((prev) => [
        {
          endpoint: "Second",
          timestamp: new Date().toLocaleString(),
          data: result.data,
        },
        ...prev,
      ]);
    } catch (error) {
      setResponses((prev) => [
        {
          endpoint: "Second",
          timestamp: new Date().toLocaleString(),
          error: error.message,
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          API Tester
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleGetFirst}
              disabled={loading}
              fullWidth
            >
              {loading ? "Loading..." : "Get First"}
            </Button>
            <Button
              variant="contained"
              onClick={handleGetSecond}
              disabled={loading}
              fullWidth
            >
              {loading ? "Loading..." : "Get Second"}
            </Button>
          </Box>

          {responses.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Responses:
              </Typography>
              {responses.map((response, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: response.error ? "#ffebee" : "#e8f5e9",
                  }}
                >
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {response.endpoint} - {response.timestamp}
                  </Typography>
                  <pre
                    style={{
                      overflow: "auto",
                      margin: 0,
                      fontSize: "0.875rem",
                    }}
                  >
                    {response.error
                      ? `Error: ${response.error}`
                      : JSON.stringify(response.data, null, 2)}
                  </pre>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
