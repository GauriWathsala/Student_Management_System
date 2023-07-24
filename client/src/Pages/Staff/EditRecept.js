import React from 'react';
import { useParams } from 'react-router-dom';

const EditRecept = () => {
    const { id } = useParams();
  return (
    <div>EditRecept</div>
  )
}

export default EditRecept