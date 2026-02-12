// "use client";

// import Image from "next/image";
// import { useState } from "react";

// const MyGallery = () => {
//   const [active, setActive] = useState("Calm");

//   return (
//     <div className="text-white">
//       <div className="flex gap-3 mb-6">
//         <p className="text-lg font-semibold">Recent Activity</p>
//       </div>

//       <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
//         {[1, 2, 3, 4, 5].map((item) => (
//           <div key={item} className="rounded-2xl overflow-hidden">
//             <div className="aspect-square rounded-xl overflow-hidden bg-gray-700">
//               <Image
//                 src="/images/sample1.webp"
//                 alt="sample1"
//                 width={300}
//                 height={300}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyGallery;
