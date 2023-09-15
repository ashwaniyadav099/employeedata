import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import axios from 'axios';
import { AiOutlineEye } from "react-icons/ai";
import { GrFormEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from 'flowbite-react';
import {useNavigate} from "react-router-dom"
const Employeelist = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [getdata,setgetdata]=useState(false);
  const [isVisible, setVisible] = useState(true);
  const [employlist,setemploylist]=useState([])
  const [openModal, setOpenModal] = useState(false);
 
    useEffect(()=>{
      axios.get('https://sweede.app/DeliveryBoy/Get-Employee').then((response) =>{
        return response.data
      }).then((response) =>{
        setgetdata(true)
        setemploylist(response)
      })
    },[])
    const deletedata=(id)=>{
      new Swal({
        title: "Are you sure?",
        text: "Are you sure that you want to Delete this Data?",
        icon: "warning",
        dangerMode: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })  .then(willDelete => {
        if (willDelete.isConfirmed) {
          axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`)
          .then(response => {
            console.log(response.data);
            axios.get('https://sweede.app/DeliveryBoy/Get-Employee').then((response) =>{
              return response.data
            }).then((response) =>{
              setgetdata(true)
              setemploylist(response)
        
            
            })
            new Swal("Deleted!", "Your imaginary file has been deleted!", "success");
          })
        
        }else{

        }
      });
    }
    const updatedata= async (data)=>{
     await dispatch({
        type: "ADDDATA",
        payload: data
      })
      navigate('/update') 
    }
    const viewdata=(data)=>{
      console.log(data)
      setVisible(data)
      setOpenModal(true)
    }
  return (
    <div className='pb-[40px]'>
        <div className="container">
            <h2 className="page_title">
              Employee List
            </h2>

            <div className="list-container">
                <ul>
                    <li className='headings list-m'>
                        <div className="flex justify-between">
                            <span className='tb-titles  w-[18%]'>Name</span>
                            <span className='tb-titles  w-[18%]'>DOB</span>
                            <span className='tb-titles  w-[15%]'>Start Date</span>
                            <span className='tb-titles  w-[15%]'>End Date</span>
                            <span className='tb-titles  w-[25%]'>Description</span>
                            <span className='tb-titles  w-[2%]'></span>
                        </div>
                    </li>
                    { getdata ?
                      employlist.map((item,index)=>{

                        return < li key={index} className='list-m'>
                           <div className="flex justify-between items-center	">
                            <span className='tb-titles  w-[18%]'>{item.FirstName} {item.LastName}</span>
                            <span className='tb-titles  w-[18%]'>{item.DOB}</span>
                            <span className='tb-titles  w-[15%]'>{item.StartDate}</span>
                            <span className='tb-titles  w-[15%]'>{item.EndDate}</span>
                          
                            <span className='tb-titles  w-[25%]'>{item.Description}</span>
                            <span>
                              <button id={`dropdownMenuIconButton${index}`} className=" hhd relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>
                                <div  className="hhdd absolute top-0 right-[100%] z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                  <ul className=" text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton${index}`}>
                                    <li>

                                      <span onClick={()=>{viewdata(item)}}  className="block p-3 flex gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><AiOutlineEye className='text-[20px]'/> View</span>
                                    </li>
                                    <li>
                                      <span onClick={()=>{updatedata(item)}} className="block  p-3 flex gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><GrFormEdit className='text-[20px]' /> Edit</span>
                                    </li>
                                    <li>
                                      <span  onClick={()=>{deletedata(item.id)}} className="block p-3 flex gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><MdDelete className='text-[20px]' /> Delete</span>
                                    </li>
                                  </ul>
                                 
                              </div>
                              </button>

                             
                              </span>
                        </div>
                        </li>
                      }):"<div>no data found</div>"
                    }
                </ul>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Employee data</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Name : {isVisible.FirstName} {isVisible.LastName}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  DOB :  {isVisible.DOB}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Study :  {isVisible.Study}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Start Date :  {isVisible.StartDate}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  End Date :  {isVisible.EndDate}
                </p>

                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Salary : Rs {isVisible.CurrentSalary}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Description :  {isVisible.Description}
                </p>
                
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() =>setOpenModal(false)}>OK</Button>
              
            </Modal.Footer>
            </Modal>
        </div>
    </div>
  )
}

export default Employeelist