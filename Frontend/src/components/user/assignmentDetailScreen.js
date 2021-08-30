import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Paper from '@material-ui/core/Paper'
import React from 'react'

const assignments = [
  {
    _id: '612bf2c8ad1baa5dcef84a3f',
    postedOn: '2021-08-29T20:49:12.929Z',
    name: 'Assignment 3',
    deadline: '2021-08-29T20:49:12.929Z',
    content: 'This is a second testing assignment ',
    subjectId: '612bee7bb9662deba915a4b9',
    __v: 0,
  },
  {
    _id: '612bf2a8ad1baa5dcef84a3c',
    postedOn: '2021-08-29T20:48:40.060Z',
    name: 'Assignment 3',
    deadline: '2021-08-29T20:48:40.060Z',
    content: 'This is a second testing assignment ',
    subjectId: '612bee7bb9662deba915a4b9',
    __v: 0,
  },
  {
    _id: '612bf2a1ad1baa5dcef84a39',
    postedOn: '2021-08-29T20:48:33.242Z',
    name: 'Assignment 2',
    deadline: '2021-08-29T20:48:33.242Z',
    content: 'This is a second testing assignment ',
    subjectId: '612bee7bb9662deba915a4b9',
    __v: 0,
  },
  {
    _id: '612bf29aad1baa5dcef84a36',
    postedOn: '2021-08-29T20:48:26.589Z',
    name: 'Assignment 1',
    deadline: '2021-08-29T20:48:26.593Z',
    content: 'This is a second testing assignment ',
    subjectId: '612bee7bb9662deba915a4b9',
    __v: 0,
  },
]

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
    flex: '.4',
  },
}))

const AssignmentDetailScreen = () => {
  const classes = useStyles()
  const { assignmentId  } = useParams()
  console.log(assignmentId);
  var assign
  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i]._id === assignmentId) {
      assign = assignments[i]
      console.log(assign)
    }
  }

  console.log(typeof assignments)

  return (
    <React.Fragment style={{ margin: '0' }}>
      {console.log(assign)}

      <Container
        maxWidth={'md'}
        style={{
          display: 'flex',
          padding: '0',
          marginTop: '1.5rem',
          margin: '1.5rem 0 0 20px',
        }}
      >
        <>
          <div className={classes.leftmenu}>
            <>
              <h2 style={{ color: 'green' }}>{assign.name}</h2>
              <p style={{ justifyContent: 'space-between' }}>
                Pankaj,
                <span style={{ color: 'red' }}>Due:{assign.deadline}</span>
              </p>
              <hr></hr>
              <p>{assign.content}</p>
            </>
          </div>
        </>

        <div className={classes.rightmenu}>
          <Card>
            <CardHeader title='Your Work' action='Due'></CardHeader>
            <CardContent>AssignmentSubmission here</CardContent>
            <CardActions
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Button
                style={{
                  textAlign: 'center',
                  width: '5000',
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Upload
              </Button>{' '}
            </CardActions>
          </Card>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default AssignmentDetailScreen
