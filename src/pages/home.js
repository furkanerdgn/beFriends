import Header from '../components/Header.js'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer.js'
import Post from '../components/Post.js'
import Stories from '../components/Stories.js'
import UserSvg from '../svgs/UserSvg.js'
import LoaderSpinner from '../components/LoaderSpinner.js'
import { useEffect, useRef ,useState } from 'react'


export default function Home() {
    const user = useSelector(state => state.auth)
    const followers = useSelector(state => state.auth.followers)
    const ref = useRef(null)
    const [loading, setLoading] = useState(false)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        if(loading){
            const firstTimeout = setTimeout(() => {
                setLoading(false)
            }, 2000);
            return () => {
                clearTimeout(firstTimeout)
            }
        }
        if(!loading){
            const secondTimeout = setTimeout(() => {
                setShowButton(true)
            }, 15000);
            return () => {
                clearTimeout(secondTimeout)
            }
        }
    }, [loading])



    function handleClick() {
        setLoading(true);
        setShowButton(false);
      }

    return (
        <div className="bg-gray-100">
            <div className='sticky top-0 bg-gray-300 border-bottom-2'>
            <Header/>
            </div>
            <section className="mt-3 gap-4 grid grid-cols-8 justify-center ease-in-out" >{/* this part include stories and post */}
                <div className='col-start-3 col-end-6 ease-in-out duration-300'>{/* this part include stories and post */}
                {       
                    loading ? (
                    <div className='m-auto my-10 transition-[spacing] duration-700 animate-bounce rounded-3xl ease-in-out   '>
                    <LoaderSpinner/>
                    </div>
                    ):(showButton && (
                        <button id="newPost" className='inline-block justify-center m-auto sticky top-16 w-32 bg-white text-sm shadow-xl p-1.5 rounded-3xl flex flex-row font-semibold items-center text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1 z-10'
                        onClick={handleClick}
                        >
                            Yeni Gönderiler
                        </button>
                    ))
                }
                <div className=" bg-white shadow-sm mb-2 flex flex-row rounded-lg border-gray-300 border-2   items-center">{/* this part include stories */}  
                <Stories/>
                    </div>

                 <div className=' flex-col flex items-stretch justify-center col-start-3 gap-4  shadow-sm rounded-lg border-gray-300 border-2 bg-white col-end-6'>{/* this part include post */}
                           
                    <Post/>
                    </div>
                
                </div>
                <aside className='mt-10 col-start-6 col-end-8'>
                <div className="bg-yellow-500">{/* this part include follower suggestions */}
                 <img src={user.profilePicture[0].src || UserSvg} className="w-14 h-14 rounded-full border-2" />
                </div>
                <Footer/>
                </aside>
            </section> 
        </div>
    )
}