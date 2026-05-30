"use client";

import Image from "next/image";
import styles from './AddComponent.module.css'
export default function AddComponent()
{
   const adsImages = [
        {
            id: 1,
            url: "https://res.cloudinary.com/dhgfabuxu/image/upload/q_auto/f_auto/v1778821165/addimage1_crspl1.jpg",
            alt: "Smart Lock",
        },
        {
            id: 2,
            url: "https://res.cloudinary.com/dhgfabuxu/image/upload/q_auto/f_auto/v1778821166/addimage2_y5aldj.jpg",
            alt: "RO Water Purifier",
        },
    ];

    return (
        <div className={styles.container}>

            {adsImages.map((item) => (
                <div key={item.id} className={styles.imageWrapper}>
                    <img
                        src={item.url}
                        alt={item.alt}
                        width={1400}
                        height={500}
                        className={styles.image}
                    />
                </div>
            ))}
        </div>
    );
  


}