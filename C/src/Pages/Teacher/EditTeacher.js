import React from 'react'
import { useParams } from 'react-router-dom';

const EditTeacher = () => {
  const { id } = useParams();
  return (
    <div>EditTeacher</div>
  )
}

export default EditTeacher