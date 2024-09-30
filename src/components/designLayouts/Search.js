// import React, { useState } from 'react'
// import { TypeAnimation } from 'react-type-animation'
// import { FaSearch} from "react-icons/fa";

// function Search({history}) {
//     const [searchValue, setSearchValue] = useState("");
// const searchHandler=(e)=>{
// e.preventDefault();
// if(searchValue.trim()){
//     history.push(`/search/${searchValue}`)
// }else{
//     history.push('/')
// }
// }
//   return (
   
//         <form onSubmit={searchHandler}>
//                <div className="relative w-full lg:w-1/3 md:h-[50px] xs:h-[40px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl mt-2 lg:mt-0">
//             <input
//               className="flex-1 h-full outline-none placeholder-transparent"
//               type="text"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//             />
//             {!searchValue && (
//               <span className="absolute inset-0 flex items-center px-6 pointer-events-none font-body2 font-medium text-[#464646]">
//                 <TypeAnimation
//                   sequence={[
//                     'Search for millets',
//                     1000,
//                     'Search for Rices',
//                     1000,
//                     'Search for Special Mix',
//                     1000,
//                     'Search for Dryfruits & Nuts',
//                     1000,
//                     'Search for Health Mix',
//                     1000,
//                     'Search for General Combo',
//                     1000,
//                     'Search for Diet Plans',
//                     1000,
//                   ]}
//                   wrapper="span"
//                   speed={50}
//                   style={{ fontSize: '15px', display: 'inline-block' }}
//                   repeat={Infinity}
//                 />
//               </span>
//             )}
//             <FaSearch className="w-5 h-5" />
//           </div>
//         </form>
   
//   )
// }

// export default Search