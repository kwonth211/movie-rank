import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import StarIcon from "@material-ui/icons/StarBorder"
import { Button, Typography } from "@material-ui/core/"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"

const b = "https://upload.wikimedia.org/wikipedia/ko/a/a9/%ED%83%80%EC%A7%9C_%28%EC%98%81%ED%99%94%29.jpg"

const tiers = [
  {
    title: "Free",
    price: "0",
    description: ["10 users included", "2 GB of storage", "Help center access", "Email support"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: ["20 users included", "10 GB of storage", "Help center access", "Priority email support"],
    buttonText: "Get started",
    buttonVariant: "contained" as "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: ["50 users included", "30 GB of storage", "Help center access", "Phone & email support"],
    buttonText: "Contact us",
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
    // height: "140px",
    width: "auto",
    height: "80%",
    // width: "auto",
    // maxHeight: "200px",
    // maxWidth: "345px",
    //  width: 'auto',
    //  height: 'auto',
    // max-width: '100px',
    // max-height: '100px'
  },
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
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
              <CardHeader title={tier.title} subheader={tier.subheader} titleTypographyProps={{ align: "center" }} subheaderTypographyProps={{ align: "center" }} action={tier.title === "Pro" ? <StarIcon /> : null} className={classes.cardHeader} />
              <CardContent>
                <div className={classes.cardPricing}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    dd
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    /mo
                  </Typography>
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
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}
