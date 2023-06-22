import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Course } from './data';
import { v4 as uuid } from 'uuid';
import { Section } from './courseForm/Sections';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {

    return (

        <footer className='mt-20 p-6 bg-black text-gray-200'>
            <div className='flex justify-between'>
                <div></div>
                <a href="https://github.com/Danster2020/hp_calculator"><FontAwesomeIcon icon={faGithub} className='text-5xl' /></a>
                <span>v{process.env.REACT_APP_VERSION}</span>
            </div>
        </footer>

    )
}
