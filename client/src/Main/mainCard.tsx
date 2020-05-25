import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import StarIcon from "@material-ui/icons/StarBorder"
import { Button, Typography } from "@material-ui/core"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"

const b =
  "data:image/jpeg;base64,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"
const a = "https://t1.daumcdn.net/cfile/tistory/236A5E4D52D6B15B03"
const c = "https://upload.wikimedia.org/wikipedia/ko/thumb/0/00/%EB%8B%A4%ED%81%AC_%EB%82%98%EC%9D%B4%ED%8A%B8_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EB%8B%A4%ED%81%AC_%EB%82%98%EC%9D%B4%ED%8A%B8_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"

const tiers = [
  {
    title: "2등",
    price: "0",
    description: ["10 users included", "2 GB of storage", "Help center access", "Email support"],
    buttonText: "260",
    buttonVariant: "outlined",
    image: a,
  },
  {
    title: "1등",
    subheader: "Most popular",
    price: "15",
    description: ["20 users included", "10 GB of storage", "Help center access", "Priority email support"],
    image: c,

    buttonText: "352",
    buttonVariant: "contained" as "contained",
  },
  {
    title: "3등",
    price: "30",
    description: ["50 users included", "30 GB of storage", "Help center access", "Phone & email support"],
    image: b,

    buttonText: "180",
    buttonVariant: "outlined" as "outlined",
  },
]
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
    //  maxHeight: "100%",
    height: "350px",
    width: "250px",
  },
  media: {
    width: "auto",
    height: "80%",
  },
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  heroContent: {
    padding: theme.spacing(0, 0, 0),
  },
  cardHeader: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[1000],
    // backgroundColor: "#ffb3b3",
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(0),
    // width: "300px",
    // height: "300px",
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
}))

export default function MainCard() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid item key={tier.title} xs={12} sm={tier.title === "Enterprise" ? 12 : 6} md={4}>
            <Card>
              <CardHeader title={tier.title} subheader={tier.subheader} titleTypographyProps={{ align: "center" }} subheaderTypographyProps={{ align: "center" }} action={tier.title === "1등" ? <StarIcon /> : null} className={classes.cardHeader} />
              <CardContent>
                <div className={classes.cardPricing}>
                  {/* <Typography component="h2" variant="h3" color="textPrimary">
                    dd
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    /mo
                  </Typography> */}
                  <img src={tier.image} width={"200px"} height={"250px"} />
                </div>
                <ul>
                  {tier.description.map((line) => (
                    <Typography component="li" variant="subtitle1" align="center" key={line}>
                      {/* <img> */}
                      <CardMedia className={classes.media} image="/static/images/cards/contemplative-reptile.jpg" title="Contemplative Reptile" />
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant={"text"} color="primary">
                  득표수 : {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}
