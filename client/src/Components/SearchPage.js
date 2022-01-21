import React, { useCallback, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, CardMedia, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";

function SearchPage({setDetailId}) {
const [animes, setAnimes] = useState([]);
const [pageNumber,setPageNumber] = useState(0);
const [animeSearch, setAnimeSearch] = useState("");
const animesPerPage = 10;
const pagesVisited = pageNumber * animesPerPage;
const pageCount = Math.ceil(animes.length/animesPerPage);
  
const navigate = useNavigate();

const debounce = (func) =>{
    let timer;
    return function(...args){
        const context =this;
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            timer = null;
            func.apply(context, args);
        },250)
    }
}

const searchForAnime = (e)=>{
    const {value} = e.target;
    if(value.length>=3){
        axios.get(`https://api.jikan.moe/v3/search/anime?q=${value}`).then(async resp=>{
            const data = resp.data.results;
            setAnimes(data);
        })
}
else{
    setAnimes([]);
}
}

const optimisedVersion = useCallback(debounce(searchForAnime),[]);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  const handleCardClick = (id) =>{
    navigate(`details/${id}`);
  }


  const displayAnimes = animes.slice(pagesVisited, pagesVisited+animesPerPage).map((anime)=>{
    return (
        <Card sx={{ maxWidth: 225, minWidth:225 }} key = {anime.mal_id} onClick={()=>{handleCardClick(anime.mal_id)}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={anime.image_url}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {anime.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  });



    
return (
        <div className='search-page'>
        <div className='search-field'>
        <FormControl sx= {{width:"100%"}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search Anime</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            // value={animeSearch}
            onChange={optimisedVersion}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <SearchIcon/>
                </IconButton>
              </InputAdornment>
            }
            label="Search Anime"
          />
        </FormControl>
        </div>

        <div className='animes'>
        {displayAnimes}
        </div>
        
        <ReactPaginate
        breakLabel="..."
        previousLabel="Previous"
        nextLabel="Next"
        onPageChange={changePage}
        pageCount={pageCount}
        containerClassName='pagination'
        previousLinkClassName='previous-link'
        nextLinkClassName='next-link'
        disabledClassName='pagination-disabled'
        activeClassName='active-page'
      />
        </div>
    )
}

export default SearchPage;
