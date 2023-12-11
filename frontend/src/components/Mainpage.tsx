import React from 'react';
import '../styles/mainpage.css';
import MainPage2 from '../pages/MainPage2';
import PieChart from '../pages/PieChart';
const myCoin = require('../assets/My_Coin.gif')

const Mainpage = () => {
    
    return (
        <div className='mainpage'>

            <div className='left_section_mainpage'>
                
                <div className='left_section_mainpage_1st'>
                    <div className='items'>
                        <div className='between_line'>
                            <div className="greyball"></div>
                        </div>
                        <div className="verline"></div>
                    </div>

                    <div className='text_section'>
                        <h2>Best AI / NFT Platform</h2>
                        <h3>The most safety chat platform for NFT users</h3>
                    </div>

                    <div className="randomball2"></div>
                    <div className="randomball1"></div>
                </div>
                

                <div className="between_ball">
                    <div className="ball2"></div>
                    <div className="blue"></div>
                </div>

                <div className='left_section_mainpage_1st'>
                    <div className='items'>
                        <div className='between_line'>
                            <div className="greenball"></div>
                        </div>
                        <div className="verline2"></div>
                    </div>

                    <div className='text_section'>
                        <h4>New environment of paradigm NFT</h4>
                        <h3>new opportunities for determining investment and participation of AI in human life</h3>
                    </div>

                    <div className="randomball"></div>
                </div>

                <div className="between_ball2">
                    <div className="ball3"></div>
                    <div className="blue2"></div>
                </div>

                <div className='left_section_mainpage_1st'>
                    <div className='items'>
                        <div className='between_line'>
                            <div className="greyball3"></div>
                        </div>
                        <div className="verline3"></div>
                    </div>

                    <div className='text_section3'>
                        <h2>Best AI / NFT Platform</h2>
                        <h3>The most safety chat platform for NFT users</h3>
                    </div>

                    <div className="randomball3"></div>
                    <div className="randomball4"></div>
                </div>
            </div>
            <MainPage2 />
            <PieChart />
        </div>
    )
}

export default Mainpage;