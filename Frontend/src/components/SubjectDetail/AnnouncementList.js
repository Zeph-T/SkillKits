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
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

const useStyles = makeStyles((theme) => ({
  item: {
    border: '1px solid lightgray',
    borderRadius: '.5rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
    marginTop: '100',
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

// const announcements = [
//   {
//     _id: '612bf161a4e5ee395d99b914',
//     postedOn: '2021-08-29T20:43:13.198Z',
//     content: 'This is a third testing anouncnement for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
//   {
//     _id: '612bf15ba4e5ee395d99b911',
//     postedOn: '2021-08-29T20:43:07.566Z',
//     content: 'This is a second testing anouncnement for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
//   {
//     _id: '612bf151a4e5ee395d99b90e',
//     postedOn: '2021-08-29T20:42:57.917Z',
//     content: 'This is a testing anouncnement for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
// ]

const AnnouncementList = (props) => {
  const classes = useStyles()
  const announcements = props.announcements;
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Announcements</h2>
      <List className={classes.list}>
        <ListItem className={classes.item} style={{ margin: '100' }}>
          <ListItemIcon>
            <Avatar src='#' />
          </ListItemIcon>
          <ListItemText
            secondary={
              <p style={{ color: '#1e8e3e' }}>
                Announce something to your class
              </p>
            }
          />
        </ListItem>
        {announcements && announcements.map((ann) => {
          {
            console.log(ann)
          }
          return (
            <>
              <ListItem className={classes.itemtop}>
                <ListItemAvatar>
                  <Avatar alt='None' src='#' />
                </ListItemAvatar>
                <ListItemText primary='Pankaj Gupta' secondary={ann.postedOn} />
              </ListItem>
              <ListItem className={classes.itembot}>
                <ListItemText primary={ann.content} />
              </ListItem>
            </>
          )
        })}
      </List>
    </>
  )
}

export default AnnouncementList
