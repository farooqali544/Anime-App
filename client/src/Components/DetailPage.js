import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function DetailPage() {
    const {id} = useParams();
    const [anime, setAnime] = useState("");
    useEffect(() =>{
        axios.get(`https://api.jikan.moe/v3/anime/${id}`).then(resp =>{
            console.log(resp.data);
            setAnime(resp.data)
        }).catch(err =>{
            setAnime(null);
        })
    }, [])
    return (
        <>
        {anime? (<div className='anime'>
            <div className='anime-pic'>
                <img src={anime.image_url}/>
            </div>
            <div className='anime-details'>
                <h3>{anime.title}</h3>
                <p>{anime.synopsis}</p>
                <div className='more-details'>
                    <div className='episodes'>
                        <h2>{anime.episodes}</h2>
                        <p>Episodes</p>
                    </div>
                    <div className='rank'>
                       <h2>#{anime.rank}</h2>
                       <p>Rank</p>
                    </div>
                    <div className='popularity'>
                        <h2>#{anime.popularity}</h2>
                        <p>Popularity</p>
                        </div>
                    <div className='members'>
                    <h2>{anime.members}</h2>
                        <p>Members</p>
                    </div>
                </div>
            </div>
        </div>):null}

        {anime ===null?<h1>No Data Found</h1>:null}
        
        </>
    )
}

export default DetailPage
