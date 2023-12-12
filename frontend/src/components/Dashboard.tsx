import { useAppDispatch, useAppSelector } from '../store/hoocs';
import { addEthWallet, checkIsAuth, getMe, logout } from '../store/reducers/authSlice';
import '../styles/Dashboard.css';
import {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from 'web3';
import { WalletBalances } from '../types/types';
import { uploadAvatar } from '../store/reducers/userServiceSlice';
const settings = require('../assets/pngwing.com.png')

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const { isLoading, status } = useAppSelector((state) => state.authSlice);
    const user = useAppSelector((state) => state.authSlice.user);

    const [wallet, setWallet] = useState<string>('');
    const [walletBalances, setWalletBalances] = useState<WalletBalances>({});
    const [loadedWallet, setLoadedWallet] = useState<boolean>(false);

    const [img, setImg] = useState<any>('');

    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
    
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    },[])

    useEffect(() => {
      dispatch(getMe())
    }, [])

    useEffect(() => {
      if (status) {
          toast.success(status, {
              position: 'bottom-right',
              autoClose: 3000, 
              style: {
                  background: 'white',
                  color: 'black',
              },
          });
      }
  }, [status]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/login');
  }

  const handleAddWallet = () => {
    try {
      dispatch(addEthWallet({wallet}))
      setWallet('')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getWalletBalance = async (wallet: string) => {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=RPNM1RW7UIBTCB9XWWMVIKSBIMEE6MF3IM`
        );
        const data = await response.json();
        if (data.status === '1') {
          const balance = Web3.utils.fromWei(data.result, 'ether');
          return balance;
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        return 'N/A';
      }
    };

    const updateWalletBalances = async () => {
      setLoadedWallet(true)
      const balances: WalletBalances = {};
      for (const walletAddress of user?.ethWallets || []) {
        const balance = await getWalletBalance(walletAddress);
        balances[walletAddress] = balance;
      }
      setWalletBalances(balances);
      setLoadedWallet(false)
    };

    updateWalletBalances();
  }, [user?.ethWallets]);

  const totalValue = Object.values(walletBalances)
  .filter(balance => !isNaN(parseFloat(balance)))
  .reduce((acc, balance) => acc + parseFloat(balance), 0)
  .toFixed(6);

  useEffect(() => {
    if (status) {
        toast.success(status, {
            position: 'bottom-right', // Устанавливаем позицию в правый нижний угол
            autoClose: 3000, // Закрыть уведомление через 3 секунды
            style: {
                background: 'white',
                color: 'black',
            },
        });
    }
}, [status]);

    //avatar
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
      if (img) {
          const data = new FormData();
          data.append('image', img);
          dispatch(uploadAvatar(data)).then(() => {
              setImg('')
          })
      }
  }, [img, dispatch, setImg]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImg(e.target.files?.[0] || null);
    };

    const closeMenu = () => {
      setMenuOpen(false);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    return (
        <div className='dashboard'>

        <div className='user_avatar'>
        <img className='setting_img' src={settings} onClick={() => setMenuOpen(true)} />
              
              {user?.avatar ? (
                <img className="avatar_img" src={`http://localhost:5001/${user.avatar}`} alt="User Avatar" />
              ) : (
                <div className="placeholder_circle">
                  <h4>{user?.username.split(' ').map((a) => a[0] + a[1]).join('.')}</h4>
                </div>
              )}
            </div>

            <h2>Ваш Username: {user?.username}</h2>
            <h2>Ваш Email: {user?.email}</h2>
            <h2>{user?.isActivated ? <h2>Вы активировали аккаунт</h2> : <h2>вы не активировали аккаунт</h2>}</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Добавить ETH Address</h2>
              <input value={wallet} onChange={(e) => setWallet(e.target.value)}/>
              <button onClick={handleAddWallet}>Добавить Eth кошелек</button>
            </form>

            <div>
              <h2>Ваши Eth Wallets:</h2>
              {user?.ethWallets.length === 0 ? (
                <p>Добавьте Eth Wallets</p>
              ) : (
                <ul>
                  {user?.ethWallets.map((ethWallet, index) => (
                    <li key={index}>
                      {ethWallet} - {parseFloat(walletBalances[ethWallet]).toFixed(6)} ETH
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              Total Value: {loadedWallet ? 'Loading...' : `${totalValue} ETH`}
            </div>
            
            <a href='/setting'>Настройки</a>
            <button onClick={handleLogout}>Выйти</button>

            {isMenuOpen && (
              <div className="avatar_menu">
                <label>
                  Загрузить новый аватар
                  <input type="file" className='inputprofile' onChange={handleImageChange} />
                </label> 
                <button>Очистить аватар</button>
                <div className="close_button" onClick={closeMenu}></div>
              </div>
            )}
        </div>
    )
}

export default Dashboard