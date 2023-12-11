import { useAppSelector } from '../store/hoocs';
import { checkIsAuth } from '../store/reducers/authSlice';
import '../styles/header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));

    return (
        <div>
        <div className='header'>
            <div className='left_section_header'>
                <a href='/'>Обосанное приложение</a>
                <a href='/chat'>Чаты</a>
            </div>

            <div className='right_section_header'>
                {isAuth ? <a href='/dashboard'>Профиль</a> : <a href='/login'>Войти</a>}
            </div>
        </div> 
        <div className="headerline"></div>           
        </div>

    )
}

export default Header;