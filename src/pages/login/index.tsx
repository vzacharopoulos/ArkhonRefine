import { Refine, useLogin } from "@refinedev/core";
import { 
  Box, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography 
} from "@mui/material";
import { useState } from "react";
import { authProvider } from "@/providers";

export const CustomLoginPage = () => {
  const { mutate: login, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    userId: "", // or username, or whatever field name you want
    password: ""
  });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  login(
    {
      userId: formData.userId,
      password: formData.password,
    },
    {
      onSuccess: (data) => {
        console.log("✅ Login success:", data);
      },
      onError: (error) => {
        console.log("❌ Login error:", error);
      },
    }
  );
};

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" mb={3}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="User ID" // Changed from "Email"
              type="text" // Changed from "email"
              value={formData.userId}
              onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

// Use in your App
<Refine
  authProvider={authProvider}
  LoginPage={CustomLoginPage}
  // ... other props
/>