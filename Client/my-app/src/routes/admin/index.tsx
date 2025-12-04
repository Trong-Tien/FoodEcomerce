import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  TextField,
  Typography,
  Container,
  Paper,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import logo from "../../assets/img/logo.jpg"
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

type Login = {
  userName: string,
  password: string
}

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


const login = async (data: Login) => {

  // call API Login
  const response = await fetch(`https://foodecomerceapi.runasp.net/api/Auth/LoginWithWebUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
}
function RouteComponent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const [showPass, setShowPass] = useState<boolean>(false)

  // cấu hình react hookform
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.status === 200) {
        localStorage.setItem("tokenCheckLogin", JSON.stringify(data?.accessToken));
        localStorage.setItem("role", JSON.stringify(data?.roleId));
        goToDashBoard()
      }
      else alert("Đăng nhập thất bại")
      queryClient.invalidateQueries({ queryKey: ["Auth"] });
    },
    onError: (error: any) => {
      console.error("Login thất bại:", error.message);
    },
  });

  const goToDashBoard = () => {
    navigate({
      to: '/admin/Dashboard/BanLamViec',
    })
  }

  const onSubmit: SubmitHandler<Login> = async (data) => { mutation.mutate(data) };

  const handleClickShowPassword = () => {
    setShowPass(true)
  }
  const handleClickHiddenPassword = () => {
    setShowPass(false)
  }

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
              width: "600px",
              height: "400px"
            }}
          >
            <img src={logo} style={{ width: "300px" }}></img>
            <Typography component="h1" alignItems={"center"} variant="h5">
              ĐĂNG NHẬP TRANG QUẢN TRỊ WEB BÁN HÀNG
            </Typography>
            <Box sx={{ width: "100%" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Tên đăng nhập"
                  fullWidth
                  type='text'
                  margin="normal"
                  {...register("userName", {
                    required: "Tên đăng nhập không được bỏ trống",
                  })}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                    },
                  }}
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                />
                <TextField
                  label="Mật khẩu"
                  fullWidth
                  margin="normal"
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Mật khẩu không được bỏ trống",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={showPass === false ? handleClickShowPassword : handleClickHiddenPassword}
                            edge="end"
                          >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2, borderRadius: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý" : "Đăng nhập"}
                </Button>
              </form>
            </Box>

          </Box>
        </Paper>
      </Box>
    </Container>
  </ThemeProvider>
}
