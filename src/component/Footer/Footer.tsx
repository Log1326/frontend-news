import React from 'react';
import './footer.css'
import {BsLinkedin} from 'react-icons/bs'
import {AiFillFacebook, AiFillGithub, AiOutlineLink} from "react-icons/ai";
import resume from './2022_CV_Pavel_Motovilov_Frontend_Web.docx'
import {useTypeSelector} from "../../store/store";
import {selectorUserNewsById} from "../../store/news/newsSlice";

const Footer = () => {
    const {data} = useTypeSelector(selectorUserNewsById)
    if (data.status === 'loading') return null
    return (
        <div className='containerFooter'>
            <div className='footer2022'>© 2022 Made to demonstrate.</div>
            <div className='footerInfoAboutMe'>
                <div className='footerIconAndSpan'>
                    <a href={resume} download>
                        <AiOutlineLink/>
                        <span>My Resume</span>
                    </a>
                    <a href={'https://www.linkedin.com/in/pavel-motovilov-b33b44212/'}>
                        <BsLinkedin fill={'#354ad5'}/>
                        <span>My Linkedin</span>
                    </a>
                </div>
                <div className='footerIconAndSpan'>
                    <a href={'https://www.facebook.com/profile.php?id=100009257620343'}>
                        <AiFillFacebook fill={'#354ad5'}/>
                        <span>My Facebook</span>
                    </a>
                    <a href={'https://github.com/Log1326'}>
                        <AiFillGithub/>
                        <span>My GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;