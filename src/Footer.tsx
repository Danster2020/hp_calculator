import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Course } from './data';
import { v4 as uuid } from 'uuid';
import { Section } from './courseForm/Sections';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {

    return (

        <footer className='mt-20 p-6 bg-black text-gray-200'>
            <div className='grid grid-cols-3 gap-4 items-end justify-items-center'>
                <div>
                    <ul className=''>
                        <li className='mb-4 font-semibold hover:underline text-sky-500'><a className='' href="https://github.com/Danster2020/hp_calculator/issues/new?assignees=&labels=&projects=&template=feature_request.md">Föreslå en förbättring</a></li>
                        <li><a className='font-semibold hover:underline text-sky-500' href="https://github.com/Danster2020/hp_calculator/issues/new?assignees=&labels=&projects=&template=bug_report.md">Rapportera en bugg</a></li>
                    </ul>
                </div>
                <a href="https://github.com/Danster2020/hp_calculator"><FontAwesomeIcon icon={faGithub} className='text-5xl' /></a>
                <span>v{process.env.REACT_APP_VERSION}</span>
            </div>
        </footer>

    )
}
