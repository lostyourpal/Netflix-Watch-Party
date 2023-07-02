import React from 'react';
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import MovieCard from "@/app/components/MovieCard";
import styles from "@/app/styles/common.module.css"

const Movie = async () => {

    await new Promise(resolve => setTimeout(resolve, 2000));

    const url = "https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20&lang=en";
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
    const main_data = data.titles;
    console.log(data)

    return (
        <>
            <section className={styles.movieSection}>
                <div className={styles.container}>
                    <h1>Series and Movies</h1>
                    <div className={styles.card_section}>

                    {
                        main_data.map((currElem) => {
                            return <MovieCard key={currElem.id}{...currElem}/>
                        })
                    }
                    </div>
                </div>
            </section>
        </>
    );
};

export default Movie;