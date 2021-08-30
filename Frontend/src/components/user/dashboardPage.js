import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container'
import ClassesGrid from '../Home/classesGrid';
import MainCompHeader from '../Home/mainComponentHeader';


// const subjects = [
//   {
//     name: 'One',
//     classCode: 'BCCS-2022',
//     faculty: 'oneone',
//   },
//   {
//     name: 'two',
//     classCode: '2',
//     faculty: 'onetwo',
//   },
//   {
//     name: 'three',
//     classCode: '3',
//     faculty: 'onethree',
//   },
//   {
//     name: 'four',
//     classCode: '4',
//     faculty: 'twoone',
//   },
//   {
//     name: 'five',
//     classCode: '5',
//     faculty: 'twotwo',
//   },
// ]

function HomeScreen(props){
    const state = useSelector(state=>state);
    let subjects = [];
    if(state.user.isAdmin){
        subjects = state.facultySubjects;
    }else{
        subjects  = state.studentSubjects;
    }
  return (
    <div className="home">
    <Container maxWidth={"xl"}>
        <br />
        <MainCompHeader />
        <ClassesGrid subjects={subjects} />
    </Container>
    </div>
  )
}

export default HomeScreen