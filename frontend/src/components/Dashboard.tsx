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
            <div className='user_avatar_section'>
              {user?.avatar ? (
              <img className="avatar_img" src={`http://localhost:5001/${user.avatar}`} alt="User Avatar" />
              ) : (
              <div className="placeholder_circle">
                <h4>{user?.username.split(' ').map((a) => a[0] + a[1]).join('.')}</h4>
              </div>
              )}

            <div className='name_section'>
              <h2>{user?.username}</h2>
              <h2>{user?.email}</h2>
              <div>{user?.ethWallets.map((wallet) => (<h2>{wallet}</h2>))}</div>
            </div>
            </div>
            
            <div className='last_section_user'>
              <button className='setting_button' onClick={() => setMenuOpen(true)}>Выбрать аватар</button>
              <button className='setting_button' onClick={handleAddWallet}>Добавить Eth кошелек</button>
              <a className='setting_button' href='/setting'>Настройки</a>

              <div>
              {user?.ethWallets.map((ethWallet, index) => {
                const walletBalance = parseFloat(walletBalances[ethWallet]);
                return (
                  <div key={index}>
                    {isNaN(walletBalance) ? null : (
                      <>
                        {ethWallet} - {walletBalance.toFixed(6)} ETH
                      </>
                    )}
                  </div>
                );
              })}
              </div>
            </div>

          </div>

            <div>
              Total Value: {loadedWallet ? 'Loading...' : `${totalValue} ETH`}
            </div>
            
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