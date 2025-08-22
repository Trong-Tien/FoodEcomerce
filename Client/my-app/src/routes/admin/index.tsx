import { createFileRoute } from '@tanstack/react-router'
import { useState, FormEvent } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  InputAdornment,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function RouteComponent() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: "600px"
            }}
          >
            <Typography component="h1" alignItems={"center"} variant="h5">
              ĐĂNG NHẬP TRANG QUẢN TRỊ WEB BÁN HÀNG
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField

                margin="normal"
                required
                fullWidth
                id="email"
                label="Tài khoản"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>,
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>,
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  </ThemeProvider>
}
