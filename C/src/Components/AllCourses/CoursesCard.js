import React from "react"
import "./Courses.css"
import { coursesCard } from "../../DammyData";

const CoursesCard = () => {
  return (
    <>
      <section className='coursesCard'>
        <div className='container grid2'>
          {coursesCard.map((val) => {
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
      </section>
    </>
  )
}

export default CoursesCard