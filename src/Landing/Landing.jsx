import React from 'react'
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import grant from './FB_IMG_1627059826106.jpg'
import david from './david.png'


const useStyles = makeStyles((theme) => ({
    //   root: {
    //     height: 380,
    //   },
      container: {
        display: 'flex',
      },
      paper: {
        margin: theme.spacing(1),
      },
      polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    
        root: {
            maxWidth: 555,
            marginTop: '40px',
          },
            media: {
            height: 100,
          },
      },
    }));

function Landing() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
  
    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    return (
        <div>
		<div className={classes.root}>
		<FormControlLabel style={{color: "blue", fontSize: "70px"}}
		  control={<Switch checked={checked} onChange={handleChange} />}
		  label="CardWorks Statement"
		/>
		<div className={classes.container}>
		  <Zoom in={checked}>
			<Paper elevation={4} className={classes.paper}>	 
				<p className="Paragraph"> CardWorks is a 52 card deck game site. Currently, we offer the opportunity to play War. Check out our "How to" on instructions for playing.</p>
			</Paper>
		  </Zoom>
		</div>
	  </div>
            <div class="float-container" style ={{
    padding: '20px'}}>
      <h1>Engineers</h1>
  <div class="float-child" style={{ width: '28%',
    float: 'left',
    padding: '20px'}}>
  <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
    style={{height: 440}}
          className={classes.media}
          image="https://media-exp3.licdn.com/dms/image/C4E03AQELfcK4N0lwlg/profile-displayphoto-shrink_800_800/0/1593476412558?e=1628121600&v=beta&t=po62Qs-S0sqTqHL42DRqO16t01MNKq5lv2R0C13jEuM"
          title="Photo of Founder"
		/>
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            Ashley Knorr Gehring
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
		  Ashley has 6 years experience as an engineer in the energy industry. Her previous focus has been design and operations, but now has shifted her focus to coding as a software developer. When she is not working to ensure CardWorks works seamlessly, she enjoys spending time with her family and traveling once again post-covid. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href="https://ashleykgehring.medium.com/" target="_blank">
          Blog Posts
        </Button>
        <Button size="small" color="primary" href="https://www.linkedin.com/in/ashley-knorr-gehring-08302414/" target="_blank">
          LinkedIn
        </Button>
      </CardActions>
    </Card>
  </div>
  <div class="float-child"style={{ width: '28%',
    float: 'left',
    padding: '20px'}}>
  <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
    style={{height: 440}}
          className={classes.media}
          image={david}
          title="Photo of Founder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            David Henshaw
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          David is a former electrical engineer with 2 years of experience. While first being introduced to programming in high school, he decided to jump into the industry head on following the Covid-19 recession. David spends his time in Houston, TX writing/producing music and designing video games on the side. 
		  </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href="https://medium.com/@davidhenshaw" target="_blank" >
          Blog Posts
        </Button>
        <Button size="small" color="primary" href="https://www.linkedin.com/in/david-a-henshaw/" target="_blank" >
          LinkedIn
        </Button>
      </CardActions>
    </Card>
  </div>
  <div class="float-child"style={{ width: '28%',
    float: 'left',
    padding: '20px'}}>
  <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
    style={{height: 440}}
          className={classes.media}
          image= {grant}
          title="Founder Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Grant Nichols
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Grant is a military vet with 7 years experience in production. He loves playing Dungeons and Dragons and spending time with his son. He is coming up with ideas to expand CardWorks and is always up for a challenge.
		  </Typography>
      <br/>
      <br/>
      <br/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href="https://grantnichols-35018.medium.com/" target="_blank" > 
		Blog Posts
		</Button>
        <Button size="small" color="primary" href="https://www.linkedin.com/in/grant-nichols-dev/" target="_blank" >
          LinkedIn
        </Button>
      </CardActions>
    </Card>
  </div>
</div>
        </div>
    )
}

export default Landing
