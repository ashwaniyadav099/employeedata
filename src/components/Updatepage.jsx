import React, { useState,useEffect  } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { Button, Label, TextInput } from 'flowbite-react';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {useNavigate} from "react-router-dom";
import ClickAwayListener from 'react-click-away-listener';
import { Editor } from 'react-draft-wysiwyg';
const options=["B.tech" , "B.E" , "B.com" , "BSC" , "BCA" , "ARTS" , "Madical" ,  "12th"]

const Updatepage = () => {

    const navigate = useNavigate();
    const mydata = useSelector((state)=>{
        return  state.datareducer
    })
    console.log(mydata.data)
    
    const [show,setshow]=useState(false)
    const [searchdat,setsearchdat]=useState('')
    const [data,setdata]=useState({
        fname:"",
        lname:"",
        dob:'',
        startdate:"",
        enddate:"",
        salary:0,
        study:''
    })
    const [optinsshow,setoptinsshow] = useState(options)
    const handelchage=(e)=>{
        let kesy= e.target.name;
        let value= e.target.value;
        data[kesy] = value
       setdata({
        ...data
       })

    }
    const handeldatechange=(e , keynm )=>{
        let m=e.$M+1
        let date = `${e.$y}-${e.$D}-${m}` 
        data[keynm] = date;
    }
    React.useEffect(() => {
        const getData = setTimeout(() => {
            let newlist
            if(searchdat.length){
                newlist = optinsshow.filter((data) =>{
                   return data.includes(searchdat)
                })
            }else{
                 newlist = options
            }
           
            setoptinsshow(newlist)
        }, 1500)
    
        return () => clearTimeout(getData)
    }, [searchdat])
    useEffect(() => {
        data.fname=mydata.data.FirstName;
        data.lname=mydata.data.LastName;
        data.dob=mydata.data.DOB;
        data.startdate=mydata.data.StartDate;
        // data.enddate=mydata.data.Description;
        data.enddate=mydata.data.EndDate;
        data.salary=mydata.data.CurrentSalary;
        data.study=mydata.data.Study;

        setdata({...data});
      }, [mydata]);
    const handelsubmit= async (e)=>{
         e.preventDefault()
        if(data.fname.length && data.lname.length && data.dob.length && data.study.length && data.startdate.length && data.enddate.length){
         
            const apiUrl = `https://sweede.app/DeliveryBoy/update-Employee/${mydata.id}`;
            let newdata = {
          
                FirstName: data.fname,
                LastName: data.lname,
                DOB: data.dob,
                Study: data.study,
                StartDate: data.startdate,
                EndDate: data.enddate,
                CurrentSalary: data.salary,
                Description: data.description
           
           }
           axios.post(apiUrl,JSON.stringify(newdata) ,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            Swal.fire('Your data has been successfully Saved')
            navigate('/employes')

        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            navigate('/employes')
        })
        }else{
            alert("Please enter all fields first");
        }

    }
    const handleClickAway = () => {
		setshow(false)
	};
    const richtextgetter=(data)=>{
        console.log(data)
    }
  return (
    <div className='Registration_page'>
        <div className="container">
            <h2 className="page_title text-center">Employee data Update Form</h2>
            <div className="form_container">
                <div className="form_box">
                <form className="flex flex-col gap-[40px]" onSubmit={handelsubmit}>
                    <div className="md:flex gap-[50px]">
                        <div className='flex-1	'>
                            <div className="mb-2 block">
                            <Label
                                htmlFor="fname"
                                value="First Name*"
                            />
                            </div>
                            <TextInput
                            id="fname"
                            placeholder="Enter your name"
                            required
                            name='fname'
                            value={data.fname}
                            type="text"
                            onChange={handelchage}
                            className='bg-[#F8FBFF] rounded-[16px]'
                            />
                        </div>
                        <div className='flex-1	pt-[20px] md:pt-0'>
                            <div className="mb-2 block">
                            <Label
                                htmlFor="lname"
                                value="Last Name*"
                            />
                            </div>
                            <TextInput
                            id="lname"
                            placeholder="Enter your name"
                            required
                            name='lname'
                            type="text"
                            value={data.lname}
                            onChange={handelchage}
                            className='bg-[#F8FBFF]  rounded-[16px]'
                            />
                        </div>
                    </div>
                    <div>
                    <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="DOB"
                            />
                        </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label={data.dob} className="ss" name='dob' onChange={(e)=>{handeldatechange(  e,'dob')}} />
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>
                    
                    <div date-rangepicker className="md:flex gap-[50px] items-center">
                      <div className='flex-1'> 
                      <div className="mb-2 block">
                            <Label
                                htmlFor="sdate"
                                value="Start Date"
                            />
                      </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label={data.startdate} id='sdate' className="ss" placeholder='ss' onChange={(e)=>{handeldatechange(e,"startdate")}}/>
                        </DemoContainer>
                        </LocalizationProvider>
                      </div>
                      <div className='flex-1 pt-[20px] md:pt-0'>
                      <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="End Date"
                            />
                            </div>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label={data.enddate} className="ss" onChange={(e)=>{handeldatechange(e,"enddate")}} />
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>
                   
                    </div>

                    <ClickAwayListener onClickAway={handleClickAway}>
                    <div >
                        <div className="mb-2 block">
                        <Label
                            htmlFor="study"
                            value="Study"
                        />
                        </div>                   
                        <button id="dropdownSearchButton" onClick={()=>{ setshow(!show)}} className="w-full  bg-[#F8FBFF]  focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center inline-flex items-center" type="button">{ data.study.length ? data.study :"Study"} <svg className="w-2.5 h-2.5  ml-auto" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg></button>
                         {show ? <div id="dropdownSearch"  className="z-10 bg-white rounded-lg shadow w-full dark:bg-gray-700" >
                            <div className="p-3">
                            <label for="input-group-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                </div>
                                <input type="text" value={searchdat} id="input-group-search" className="block w-full p-2 pl-10 text-sm text-black text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user"  onChange={(e)=>{setsearchdat(e.target.value)}}/>
                            </div>
                            </div>
                            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                           {
                            optinsshow.map((item,index)=>{
                                return  <li>
                                <div className="flex items-center  rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input id={`checkbox-item-${index}`} type="radio" value="" name='study' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onClick={()=>{ data.study = item;
                                     setdata({...data})}} />
                                <label for={`checkbox-item-${index}`} className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{item}</label>
                                </div>
                            </li>
                            })
                           }
                           
                            
                            </ul>
                            
                        </div> : " " }
                        

                    </div>
                    </ClickAwayListener>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            htmlFor="salary"
                            value="Current Salary"
                        />
                        </div>
                        <TextInput
                        id="salary"
                        placeholder="30000"
                        required
                        type="number"
                        value={data.salary}
                        name='salary'
                        onChange={handelchage}
                        className=' rounded-[16px] bg-[#F8FBFF]'
                        />
                          
                                    
                        
                    </div>
                    <div className='bg-[#E9F2FF] text-black  my-[20px]  rounded-[16px]' >
                       
                                <Editor
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                onChange={richtextgetter}
                                />
                        </div>
                    <div className="flex gap-[50px] w-full">
                        <Button type='reset' className='flex-1 bg-[#E3E3E3] text-black hover:bg-[#E3E3E3]'>
                            Cancel
                        </Button>
                        <Button  type='submit' className='flex-1 border-2	bg-[white] text-black border-current hover:text-white'>
                            Update
                        </Button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Updatepage
