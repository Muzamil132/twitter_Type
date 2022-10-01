import { SearchIcon } from '@heroicons/react/solid';
import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore';
import React ,{useState,useRef,useEffect} from 'react'
import { db } from '../firebase';


const SearchBox = () => {
const [activeSearch, setSearchActive] = useState<boolean>(false);

const searchBox = useRef<HTMLDivElement>(null);
const SearchResultBox = useRef<HTMLDivElement>(null);
const [searchText,setSearchText] =useState<string>('')
const [searchResult,setSearchResult] =useState<DocumentData | undefined>()
const [Posts,setPosts]=useState<DocumentData| undefined>()
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
  

  useEffect(()=>{
   
    const q=query(collection(db,"Users"),where("username","==",searchText))
    onSnapshot(q,(snapshot)=>{
      var searchData:any=[]
      snapshot.forEach((doc)=>{
         searchData.push(doc.data())
      })
      setSearchResult(searchData)
    })
    // const q1=query(collection(db,"posts"),where("text","==",searchText))
    // onSnapshot(q1,(snapshot)=>{
    //   var searchData:any=[]
    //   snapshot.forEach((doc)=>{
    //      searchData.push(doc.data())
    //   })
    //   setPosts(searchData)
    // })

  },[searchText])

  

  return (
    <div className="relative z-10">
    <div
      onClick={() => setSearchActive(true)}
      ref={searchBox}
      className={`mt-3 bg-gray-100  dark:bg-dark-second flex space-x-2 rounded-full py-3 px-5 ${
        activeSearch && "border-blue-400 border"
      }  `}
    >
      <SearchIcon className="h-6 dark:text-dtext2 text-gray-500" />
      <input
        value={searchText}
        placeholder="Search Twitter"
        className="outline-none text-white text-lg bg-transparent "
        onChange={(e)=>setSearchText(e.target.value)}
      />
    </div>
    {activeSearch && (
      <div ref={SearchResultBox} className="bg-gray-100  dark:bg-dark-second h-[500px] w-full absolute top-[59px] rounded-lg overflow-y-auto ">
       {
         searchResult!=undefined && searchResult.map((item:any,id:number)=>(
          <p className='text-white' key={id}  >{item.username}</p>
         ))
       }
      
      </div>
    )}
  </div>
  )
}

export default SearchBox