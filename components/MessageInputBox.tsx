import { ChevronLeftIcon, EmojiSadIcon } from '@heroicons/react/outline';
import { ArrowCircleRightIcon, EmojiHappyIcon, FilmIcon, PhotographIcon, SearchIcon } from '@heroicons/react/solid'
import React ,{useRef,useState,useEffect}from 'react'

const MessageInputBox = () => {


    const [activeSearch, setSearchActive] = useState<boolean>(false);

    const searchBox = useRef<HTMLDivElement>(null);
    const SearchResultBox = useRef<HTMLDivElement>(null);
    useEffect(() => {
      // only add the event listener when the dropdown is opened
      if (!activeSearch) return;
      function handleClick(event: any) {
        if (searchBox.current && !searchBox.current.contains(event.target)) {
          setSearchActive(false);
        }
      }
      window.addEventListener("click", handleClick);
      // clean up
      return () => window.removeEventListener("click", handleClick);
    }, [activeSearch]);
    


  return (
    <div className=' absolute bottom-0 right-0 left-0 px-4 py-[0.4rem] flex space-x-2 items-center border-t border-gray-700 '>
      {
      !activeSearch?(
        <div className='flex space-x-2'>

       <PhotographIcon className='w-5 sm:w-7'/>
        <FilmIcon className='w-5 sm:w-7' />
        </div>
        ):(
          <ChevronLeftIcon className='w-5 sm:w-7'   />
        )
}
        <div
              onClick={() => setSearchActive(true)}
              ref={searchBox}
              className={` bg-black border flex-1 ${
                !activeSearch && "border-[#18191a]"
              }  flex space-x-2 rounded-full py-[0.45rem] sm:py-2 px-5 ${
                activeSearch && "border-gray-200 border"
              }  `}
            >
              
              <input
                placeholder="Start a new message"
                className="outline-none flex-1 text-white text-md sm:text-lg bg-transparent "
              />
              <EmojiSadIcon className="h-5 sm:h-6 text-white" />
            </div>
            <ArrowCircleRightIcon className='w-7 sm:w-7' />

    </div>
  )
}

export default MessageInputBox