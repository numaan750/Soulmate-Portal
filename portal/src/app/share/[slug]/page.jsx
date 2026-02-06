// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";

// export default function SharePage() {
//   const params = useParams();
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSharedContent = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/share/${params.slug}`
//         );
//         const data = await response.json();

//         if (data.status === "success") {
//           setContent(data.data);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError("Failed to load content");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.slug) {
//       fetchSharedContent();
//     }
//   }, [params.slug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (error || !content) {
//     return (
//       <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
//         <div className="text-white text-xl">
//           {error || "Content not found"}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0B0F] text-white py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4">
//             {content.title}
//           </h1>
//           <p className="text-gray-400">{content.description}</p>
//         </div>

//         <div className="bg-[#1A1B24] rounded-2xl p-6 sm:p-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Image */}
//             <div className="w-full lg:w-1/2">
//               <Image
//                 src={content.imageUrl}
//                 alt="Soulmate Sketch"
//                 width={500}
//                 height={500}
//                 className="w-full object-contain rounded-2xl"
//               />
//             </div>

//             {/* Details */}
//             <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
//               {content.birthDate && content.ethnicity && content.personality && (
//                 <div className="flex flex-wrap justify-center items-center gap-4 text-sm sm:text-base">
//                   <span className="border-r border-white pr-4">
//                     {content.birthDate}
//                   </span>
//                   <span className="border-r border-white pr-4">
//                     {content.ethnicity}
//                   </span>
//                   <span>{content.personality}</span>
//                 </div>
//               )}

//               {content.compatibilityScore && (
//                 <div className="flex flex-col items-center">
//                   <h2 className="text-xl sm:text-2xl mb-4">
//                     Compatibility Score
//                   </h2>
//                   <div className="bg-[#AABFFF33] w-full max-w-[350px] h-2 rounded-full mb-4">
//                     <div
//                       className="bg-[#AABFFF] h-2 rounded-full"
//                       style={{ width: `${content.compatibilityScore}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-2xl sm:text-3xl font-semibold">
//                     {content.compatibilityScore}%
//                   </span>
//                 </div>
//               )}

//               <div className="text-center text-gray-400 text-sm">
//                 Shared by {content.userId?.username || "Anonymous"}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-8">
//           <a
//             href="/"
//             className="inline-block bg-[#AABFFF] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#99AEFF] transition-colors"
//           >
//             Create Your Own Soulmate Sketch
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }