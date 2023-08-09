import './dashboard.scss';
import Sidebar from'../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
//import DHead from '../../Components/DHead/DHead';
//import DHead from '../../Components/DHead/DHead';

export const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div>
        <Sidebar />
        </div>
        <div className='homeContainer' >
            <Navbar />
            Home Container
        </div>
        
        
    </div>
  )
}

export default Dashboard
