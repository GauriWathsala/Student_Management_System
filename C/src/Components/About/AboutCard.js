// import React from 'react'
// import { Title } from '../Title/Title';
// import { homeAbout } from "../../DammyData";
// import AWrapper from './AWrapper';
// import './About.css';

// export const AboutCard = () => {
//   return (
//     <div>
//         <section className='aboutHome' >
//             <div className='container flexSB'>
//                 <div className='left row'>
//                     <img src= '/images/back6.jpg' alt=''/>
//                 </div>
//                 <div className='right row'>
//                     <Title subtitle='LEARN WITH US' title='Benefits You get' />
//                     <div className='items'>
//                         {homeAbout.map((val) => {
//                             return(
//                                 <div className='item flexSB'> 
//                                 <div className='img'>
//                                     <img src={val.cover} alt=''  /> 
//                                 </div>
//                                 <div className='text'>
//                                     <h2>{val.title}</h2>
//                                     <p>{val.desc}</p>
//                                  </div>
//                                 </div>
//                             )
//                         }) }
//                     </div>
//                 </div>
//             </div>
//         </section>
//         <AWrapper />
//     </div>
//   );
// };

// export default AboutCard




import React from 'react';
import { Title } from '../Title/Title';
import { homeAbout } from "../../DammyData"; // Assuming "DammyData" is the correct file path.
import AWrapper from './AWrapper';
import './About.css';

const AboutCard = () => {
  return (
    <div>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='/images/back6.jpg' alt=''/>
          </div>
          <div className='right row'>
            <Title subtitle='LEARN WITH US' title='Benefits You Get' /> {/* Fixed "get" typo */}
            <div className='items'>
              {homeAbout.map((val, index) => ( // Added "index" to the map function to provide a unique key for each element
                <div className='item flexSB' key={index}> {/* Added a unique "key" prop to the mapping elements */}
                  <div className='img'>
                    <img src={val.cover} alt=''/> {/* Assuming "cover" is the correct image path in your data */}
                  </div>
                  <div className='text'>
                    <h2>{val.title}</h2> {/* Assuming "title" and "desc" are valid properties in your data */}
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AWrapper />
    </div>
  );
};

export default AboutCard;

