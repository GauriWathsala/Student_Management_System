import React from 'react'
import { coursesCard } from "../../DammyData";
import { Title } from '../Title/Title';
export const HAbout = () => {
  return (
    <>
        <section className='homeAbout'>
            <div className='container'>
                <Title subtitle='Our Courses' />
            <div className='coursesCard'>
        <div className='grid2'>
          {coursesCard.slice(0,3).map((val) => {
            return(
            <div className='items'>
              <div className='content flex'>
                <div className='left'>
                  
                </div>
                <div className='text'>
                  <h1>{val.coursesName}</h1>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                  
                </div>
              </div>
              <div className='totalTime'>
                <h3>
                  {val.totalTime}
                </h3>
              </div>
              <button className='outline-btn'>MORE DETAILS</button>
            </div>
          )})}
        </div>
      </div>
        </div>
        </section>
    </>
  )
}

export default HAbout
