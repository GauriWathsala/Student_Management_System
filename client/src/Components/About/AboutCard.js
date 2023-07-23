import React from 'react'
import { Title } from '../Title/Title';
import { homeAbout } from "../../DammyData";
import AWrapper from './AWrapper';
import './About.css';

export const AboutCard = () => {
  return (
    <div>
        <section className='aboutHome' >
            <div className='container flexSB'>
                <div className='left row'>
                    <img src= '/images/back6.jpg' alt=''/>
                </div>
                <div className='right row'>
                    <Title subtitle='LEARN WITH US' title='Benefits You get' />
                    <div className='items'>
                        {homeAbout.map((val) => {
                            return(
                                <div className='item flexSB'> 
                                <div className='img'>
                                    <img src={val.cover} alt=''  /> 
                                </div>
                                <div className='text'>
                                    <h2>{val.title}</h2>
                                    <p>{val.desc}</p>
                                 </div>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
        </section>
        <AWrapper />
    </div>
  );
};

export default AboutCard
