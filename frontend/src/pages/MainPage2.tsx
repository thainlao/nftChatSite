import React, { useEffect, useRef, useState } from 'react';
import '../styles/mainpage.css';
import '../styles/mainpage2.css';
const img = require('../assets/scr.png');
const img2 = require('../assets/scr1.png');

const MainPage2 = () => {
    const [showImages, setShowImages] = useState(false);
    const mainPageRef = useRef<any>();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setShowImages(true);
            }
        }, { threshold: 0.5 });

        observer.observe(mainPageRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className='mainpage2_container'>
            <div className={`mainpage_2 ${showImages ? 'show-images' : ''}`}>
                <img className='img' src={img} />
                <img ref={mainPageRef} className='img1' src={img2} />
            </div>

            <div className='mainline2'></div>

            <div className='mainpage2_text'>
            <img className="rotating-circle" src='https://github.githubassets.com/assets/shape-2-f30dcc9bd35c.svg' />
                <h2>New WEB3 world begins now</h2>
                <h3>We offer our users full anonymity using all modern web3 development technologies</h3>
                <h4>We also provide access to AI to accelerate ITSM business processes</h4>
            </div>

            <img className='roundball' src='https://github.githubassets.com/assets/shape-0-df97fa6b0c27.svg'/>
        </div>
    );
}

export default MainPage2;