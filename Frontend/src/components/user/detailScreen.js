import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import AnnouncementList from '../SubjectDetail/AnnouncementList'
import AssignmentList from '../SubjectDetail/AssignmentList'
import * as userActions from '../../actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import '../App/App.css';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1.5rem',
  },
  banner: {
    height: 225,
    backgroundImage:
      "url('https://gstatic.com/classroom/themes/img_bookclub.jpg')",
    borderRadius: '.5rem',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
  },
  classname: {
    fontSize: '30px',
    color: 'white',
  },
  border: {
    border: '1px solid',
  },
  leftmenu: {
    flex: '1',
  },
  rightmenu: {
    flex: '1',
  },
}))

const DetailScreen = (props) => {
  const user = useSelector(state=>state.user);
  const [loadingScreen , setLoadingScreen] = useState(true);
  const { subjectId } = useParams();
  const classes = useStyles();
  const [assignments,setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [name,setName] = useState("");
  const [classCode , setClassCode] = useState("");
  const [faculty , setFaculty] = useState([]);
  useEffect(()=>{
     userActions.getSubjectData(subjectId).then(data=>{
       setAnnouncements(data.announcements);
       setAssignments(data.assignemnts);
       setClassCode(data.classCode);
       setFaculty(data.faculty);
       setName(data.name);
       setLoadingScreen(false);
     }).catch(err=>{
       setLoadingScreen(false);
       props.openSnackBar(err.stack);
     })
  },[]);

  if(loadingScreen === true){
    return (
      <div className="verticalCenterAligned">
        <h2>LOADING YOUR DATA</h2>
        <LinearProgress />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Container className={classes.banner}>
        <List>
          <ListItem>
            <ListItemText
              primary={<h1 style={{ color: 'white' }}>{name}</h1>}
              secondary={
                <h2 style={{ color: 'white' }}>{classCode}</h2>
              }
              className={classes.classname}
            />
          </ListItem>
        </List>
      </Container>
      <Container style={{ display: 'flex', padding: '0', marginTop: '1.5rem' }}>
        <>
          <div className={classes.leftmenu}>
            <Container>
              <AssignmentList assignments={assignments}/>
            </Container>
          </div>
        </>

        <div className={classes.rightmenu}>
          <Container>
            <AnnouncementList announcements={announcements} />
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default DetailScreen
