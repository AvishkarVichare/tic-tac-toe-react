import React, { useState } from 'react'
import Icon from './components/Icon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const itemArray = new Array(9).fill('empty')

const App = () => {

    const [iscross, setIsCross] = useState(false);

    const [winMeassage, setWinMeassage] = useState("")

    const handleReload = () => {
        setIsCross(false);
        setWinMeassage("");
        itemArray.fill('empty', 0, 9);
        return;
    }

    const checkIsWinner = () => {

        if ((itemArray[0] != "empty" && itemArray[0] == itemArray[1] && itemArray[0] == itemArray[2])
            || (itemArray[3] != 'empty' && itemArray[3] == itemArray[4] && itemArray[3] == itemArray[5])
            || (itemArray[6] != 'empty' && itemArray[6] == itemArray[7] && itemArray[6] == itemArray[8])
            || (itemArray[0] != "empty" && itemArray[0] == itemArray[3] && itemArray[0] == itemArray[6])
            || (itemArray[1] != 'empty' && itemArray[1] == itemArray[4] && itemArray[1] == itemArray[7])
            || (itemArray[2] != 'empty' && itemArray[2] == itemArray[5] && itemArray[2] == itemArray[8])
            || (itemArray[0] != 'empty' && itemArray[0] == itemArray[4] && itemArray[0] == itemArray[8])
            || (itemArray[2] != 'empty' && itemArray[2] == itemArray[4] && itemArray[2] == itemArray[6])
        ) {
            setWinMeassage(`${iscross ? "Cross" : "Circle"}`)
             toast(`${winMeassage} Won the GAME`, { type: 'success' })
        }

    }

    const changeItem = itemNum => {
        if (winMeassage) {
            return toast(winMeassage, { type: 'success' });
        }

        if (itemArray[itemNum] == "empty") {
            itemArray[itemNum] = iscross ? "cross" : "circle";
            setIsCross(!iscross);
        }
        else {
            return toast("Can't You see, it's already Filled", { type: 'error' });
        }

        checkIsWinner();
    }

    return (

        <div className='flex flex-col items-center justify-start bg-[#6a6a6a] h-[100vh] '>
            <ToastContainer />
            <h1 className='text-[4rem] font-extrabold text-center'>
                <span className='text-red-400'>
                    Tic 
                </span>
                &nbsp;
                <span className='text-yellow-500'>
                    Tac 
                </span>
                &nbsp;
                <span>
                    Toe
                </span>
            </h1>

            <div className='my-2 h-[80px]'>
            {
                winMeassage ? (
                        <h2 className='text-[19px] text-cyan-50'>
                            <span className='text-[20px] font-bold text-yellow-400'>{winMeassage}</span> Won the GAME
                            <button onClick={handleReload} className='text-white px-10 py-2 rounded-xl bg-green-800 mx-auto block text-[16px]  my-3 font-bold'>
                                Reload
                            </button>
                        </h2>
                ) :
                    (<>
                        {
                            !winMeassage?(
                                iscross ? (
                                    <h1 className='text-[2rem] font-bold'>
                                        Turn of X
                                    </h1>
                                ) : (
                                    <h1 className='text-[2rem] font-bold'>
                                        Turn of O
                                    </h1>
                                )
                            ):""
                        }
                    </>)
            }
                    </div>

            <div>

                <div className='grid grid-cols-3 w-fit gap-6'>
                    {itemArray.map((item, index) => (
                        <div style={item=='empty'?{backgroundColor:'#E8BD0D'}:{backgroundColor:'#C7C11A'}} onClick={() => changeItem(index)} key={index} className='cursor-pointer  w-[100px] h-[100px] flex items-center justify-center shadow-2xl border-2 border-gray-300 rounded-lg'>
                            {<Icon name={item} />}
                        </div>
                    ))}
                </div>

                <div>
                    <button onClick={handleReload} className='text-white px-10 py-2 rounded-xl bg-green-800 mx-auto block text-[20px]  my-3 font-bold'>
                        Reload
                    </button>
                </div>
            </div>
        </div>

    )
}

export default App