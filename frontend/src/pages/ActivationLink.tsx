import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hoocs';
import { activateAccount } from '../store/reducers/userServiceSlice';

const ActivationLink = () => {
    const { link } = useParams<{ link: string }>();
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (link) {
          dispatch(activateAccount(link))
      }
    },[dispatch, link])
    return (
        <div className='activate'>
            <h2>Ваш аккаунт успешно активирован!</h2>
            <h3>Перейти к <a href='/dashboard'>профилю</a></h3>
        </div>
    )
}

export default ActivationLink;