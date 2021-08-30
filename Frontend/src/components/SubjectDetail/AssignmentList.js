import React from 'react'
import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import assignmentImage from '../../images/assignment.png'

const useStyles = makeStyles((theme) => ({
  item: {
    border: '1px solid lightgray',
    borderRadius: '.5rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
    marginTop: '-1',
  },
  itemtop: {
    border: '1px solid lightgray',
    borderRadius: '.5rem .5rem 0rem 0rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
    top: '10',
  },
  itembot: {
    border: '1px solid lightgray',
    borderRadius: '0rem 0rem .5rem .5rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
  },
  list: {
    paddingTop: 0,
  },
}))

// const assignments = [
//   {
//     _id: '612bf2c8ad1baa5dcef84a3f',
//     postedOn: '2021-08-29T20:49:12.929Z',
//     name: 'Assignment 3',
//     deadline: '2021-08-29T20:49:12.929Z',
//     content: 'This is a second testing assignment for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
//   {
//     _id: '612bf2a8ad1baa5dcef84a3c',
//     postedOn: '2021-08-29T20:48:40.060Z',
//     name: 'Assignment 3',
//     deadline: '2021-08-29T20:48:40.060Z',
//     content: 'This is a second testing assignment for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
//   {
//     _id: '612bf2a1ad1baa5dcef84a39',
//     postedOn: '2021-08-29T20:48:33.242Z',
//     name: 'Assignment 2',
//     deadline: '2021-08-29T20:48:33.242Z',
//     content: 'This is a second testing assignment for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
//   {
//     _id: '612bf29aad1baa5dcef84a36',
//     postedOn: '2021-08-29T20:48:26.589Z',
//     name: 'Assignment 1',
//     deadline: '2021-08-29T20:48:26.593Z',
//     content: 'This is a second testing assignment for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
// ]

const AssignmentList = (props) => {
  const classes = useStyles()
  const assignments = props.assignments;
  return (
    <>
      <List className={classes.list}>
        <h2 style={{ textAlign: 'center' }}>Assignments</h2>
        {assignments && assignments.map((ann) => {
          {
            console.log(ann)
          }
          return (
            <ListItem className={classes.item}>
              <ListItemAvatar>
                <Avatar src={assignmentImage} />
              </ListItemAvatar>
              <Link to={`/subject/assignment/${ann._id}`}>
                <ListItemText
                  primary={`Pankaj Gupta posted a new Assignment: ${ann.name}`}
                  secondary={ann.postedOn}
                />
              </Link>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default AssignmentList
