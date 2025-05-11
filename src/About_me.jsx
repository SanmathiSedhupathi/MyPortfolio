import React from 'react'
import './about_me.css'
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <motion.div
    initial={{
     opacity:0,
     y:40
    }} 
    whileInView={
     {
       opacity:1,
       y:0
     }
    }
    
    transition={{
     delay:0.2,
     duration:0.5
    }}
    viewport={{
      once:true
     }}
      className='about_me'  id="aboutMey">
      <h2 className='heading'>About Me</h2>
    <div className="about_me_info">
        <p className='about_me_left'>I’m Sanmathi S, a passionate and dedicated developer currently pursuing my post-graduation in Computer Science. 
          I love building web applications that solve real-world problems. My interests span across frontend development, 
          data structures, and exploring creative UI/UX designs. I enjoy working with technologies like React, JavaScript, 
          and Python, and I’m always eager to learn and grow through new challenges.!</p>
        <div className="about_me_right"></div>
    </div>

    </motion.div>
    
  )
}

export default AboutMe
