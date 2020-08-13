import React, { useState, useEffect, useContext, useReducer } from "react"
import { SignUpViewStyles } from "./SignUp_styles"
import Container from "@material-ui/core/Container"
import ProgressModelComponent from "../../../common/ProgressModelComponent"
import { CssBaseline, Avatar, Typography, Grid, TextField, Button, Link, Box } from "@material-ui/core"

export const SignUp_view = ({ state: props, history, getEmailComponent, nameInputChange, emailValidationClick, emailInputChange, passwordInputChange, onSubmitClick }) => {
  const classes = SignUpViewStyles()
  const { ID, password, name, emailComponent, validationEmail, emailValidationText, countState, emailFlag, progress, validationID } = props

  return (
    <Container component="main" maxWidth="xs">
      <ProgressModelComponent flag={progress} />

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField autoComplete="fname" name="id" variant="outlined" required fullWidth id="id" label="고객님의 이름을 입력해주세요" autoFocus onChange={nameInputChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                style={{ width: "68%", marginRight: "10px" }}
                error={validationID}
                helperText={validationID ? "이메일 형식으로 입력해주세요." : ""}
                variant="outlined"
                required
                disabled={emailComponent}
                id="email"
                label="이메일 (aaa@rankingworld.com)"
                name="email"
                autoComplete="email"
                onChange={emailInputChange}
              />
              <Button type="button" variant="contained" style={{ height: "56px" }} disabled={emailFlag} onClick={emailValidationClick}>
                이메일 인증
              </Button>
            </Grid>
            {emailComponent ? getEmailComponent() : <></>}
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="비밀번호를 입력해주세요" type="password" id="password" onChange={passwordInputChange} autoComplete="current-password" />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
            style={{ backgroundColor: "#413e3e", color: "white" }}
            // className={classes.submit}
            onClick={onSubmitClick}
          >
            회원 가입
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
            <Grid item>
              <Link
                onClick={() => {
                  history.push("/login")
                }}
                className={classes.link}
                variant="body2"
              >
                이미 가입되어 있다면 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
