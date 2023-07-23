import React from 'react'
import './searchadd.scss'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate} from 'react-router-dom';

const SearchAdd = ({currentPage}) => {
  const navigate = useNavigate ();

  const handleButtonClick = () => {
    if (currentPage === 'receptionist') {
      navigate('/addreceptionist');
    } else if (currentPage === 'teacher') {
      navigate ('/addteacher');
    }
  }
  return (
    <div className='searchadd'>
        <div className='swrapper'>
            <div className='searchbar'>
                <SearchIcon />
                <input type='text' placeholder='Search' />
            </div>
            <div className='addbutton'>
                <button className='add'  onClick={handleButtonClick}>
                    <div className='sicon'><AddCircleIcon /></div>
                    <div className='btext'><span>Add</span></div>
                    </button>
            </div>
        </div>
    </div>
  )
}

export default SearchAdd