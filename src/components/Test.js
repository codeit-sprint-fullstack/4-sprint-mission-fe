// 'use client';
// import Image from "next/image";
// import styles from "./page.module.css";
// import { MouseEvent, useEffect, useRef, useState } from "react";

// export default function Home()
// {
//   const btn = useRef<HTMLButtonElement>(null);

//   const FBtn = (e) =>
//   {
//     console.log(e.currentTarget.dataset.my);
//   }

//   useEffect(() =>
//   {
//     const button = btn.current;
//     if (button)
//     {
//       button.addEventListener("click", FBtn);
//       return () =>
//       {
//         button.removeEventListener("click", FBtn);
//       };
//     }
//   }, []);

//   return (
//     <>
//       <button ref={btn} data-my="hello">버튼실행</button>
//     </>
//   );
// }
