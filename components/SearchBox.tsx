import { SearchIcon } from '@heroicons/react/solid';
import React ,{useState,useRef,useEffect} from 'react'


const SearchBox = () => {
   
    const [activeSearch, setSearchActive] = useState<boolean>(false);

const searchBox = useRef<HTMLDivElement>(null);
const SearchResultBox = useRef<HTMLDivElement>(null);
useEffect(() => {
  // only add the event listener when the dropdown is opened
  if (!activeSearch) return;
  function handleClick(event: any) {
    if (searchBox.current && SearchResultBox.current && !searchBox.current.contains(event.target) && !SearchResultBox.current.contains(event.target)  ) {
      setSearchActive(false);
    }
  }
  window.addEventListener("click", handleClick);
  // clean up
  return () => window.removeEventListener("click", handleClick);
}, [activeSearch]);


  return (
    <div className="relative">
    <div
      onClick={() => setSearchActive(true)}
      ref={searchBox}
      className={`mt-3 bg-[#18191a] flex space-x-2 rounded-full py-3 px-5 ${
        activeSearch && "border-blue-400 border"
      }  `}
    >
      <SearchIcon className="h-6 text-white" />
      <input
        placeholder="Search Twitter"
        className="outline-none text-white text-lg bg-[#18191a] "
      />
    </div>
    {activeSearch && (
      <div ref={SearchResultBox} className="bg-[#18191a] h-[500px] w-full absolute top-[59px] rounded-lg overflow-y-auto ">
       Muzamil
      </div>
    )}
  </div>
  )
}

export default SearchBox