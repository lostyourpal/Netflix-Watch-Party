import React from 'react';
import Image from "next/image";
import styles from "@/app/styles/common.module.css"

const Page = async ({params}) => {
    const id = params.id;

    const url = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;
    // process.env.RAPID_KEY
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7b04df4450msh0be49a3593f8283p106b4fjsn2da7d1e5b277',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };

    const res = await fetch(url, options)
    const data = await res.json()
    const main_data = data[0].details

    return (

        <div className={styles.container}>
            <h2 className={styles.movie_title}> Netflix \ <span>{main_data.type}</span></h2>
            <div className={styles.card_section}>
                <div>
                    <Image src={main_data.backgroundImage.url} alt={main_data.title} width={600} height={300}/>
                </div>
            </div>
        </div>

    );
};

export default Page;