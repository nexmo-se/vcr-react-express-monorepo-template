import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
console.log(`BACKEND_URL: ${BACKEND_URL}`);
function App() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOlder, setExpandedOlder] = useState({});

  const handleGetFirst = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BACKEND_URL}/api/first`);
      setResponses((prev) => [
        {
          id: Date.now(),
          endpoint: "First",
          timestamp: new Date().toLocaleString(),
          data: result.data,
        },
        ...prev,
      ]);
    } catch (error) {
      setResponses((prev) => [
        {
          id: Date.now(),
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
          id: Date.now(),
          endpoint: "Second",
          timestamp: new Date().toLocaleString(),
          data: result.data,
        },
        ...prev,
      ]);
    } catch (error) {
      setResponses((prev) => [
        {
          id: Date.now(),
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

  const toggleOlderResponse = (id) => {
    setExpandedOlder((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const recentResponses = responses.slice(0, 2);
  const olderResponses = responses.slice(2);

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

              {/* Recent responses (last 2) - always expanded */}
              {recentResponses.map((response) => (
                <Paper
                  key={response.id}
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

              {/* Older responses - collapsed by default */}
              {olderResponses.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, mb: 1, backgroundColor: "#f5f5f5" }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Older Responses ({olderResponses.length})
                    </Typography>
                  </Paper>
                  {olderResponses.map((response) => (
                    <Paper
                      key={response.id}
                      elevation={1}
                      sx={{
                        mb: 1,
                        backgroundColor: response.error ? "#ffebee" : "#e8f5e9",
                        opacity: 0.9,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleOlderResponse(response.id)}
                      >
                        <Typography variant="subtitle2" color="primary">
                          {response.endpoint} - {response.timestamp}
                        </Typography>
                        <IconButton
                          size="small"
                          sx={{
                            transform: expandedOlder[response.id]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                      <Collapse in={expandedOlder[response.id]}>
                        <Box sx={{ px: 2, pb: 2 }}>
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
                        </Box>
                      </Collapse>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
