import React, { useState, useEffect } from 'react'


function Result(props) {

    const [movie, setmovie] = useState([])
    const [fav, setfav] = useState([])
    const [pageno, setpageno] = useState(1)
    const [rating, setrating] = useState(0)
    const [comment, setcomment] = useState('')
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`https://www.omdbapi.com/?apikey=fa9a7315&s=${props.location.name}}&page=${pageno}`).then((res) => res.json())
            .then((data) => {
                setmovie(data.Search)
            })
            .catch((err) => {
                console.error(err);
            })
        if (JSON.parse(localStorage.getItem("fav"))) {
            setfav(JSON.parse(localStorage.getItem("fav")))
        }
    }, [props.location.name, pageno])

    useEffect(() => {
        setpageno(1);
    }, [props.location.name])

    const addFav = (movie) => {
        setfav([...fav, movie])
    }
    const remFav = (movie) => {
        setfav(fav.filter((f) => { return JSON.stringify(f) !== JSON.stringify(movie) }))
    }

    useEffect(() => {
        localStorage.setItem("fav", JSON.stringify(fav))
    }, [fav])

    const prev = () => {
        setpageno(Math.max(pageno - 1, 1))
    }
    const next = () => {
        setpageno(pageno + 1)
    }
    const submitreview = (e) => {
        e.preventDefault()
        setrating(0)
        setcomment('')
    }
    const rate = (e) => {
        setrating(e.target.value)
    }
    const review = (e) => {
        setcomment(e.target.value)
    }

    return (
        <div>
            {
                movie ?
                    movie.map((m) => {
                        const isfav = !fav.find((f) => { return JSON.stringify(f) === JSON.stringify(m) })

                        return (

                            <div className="card w-75 mx-auto mt-3" key={m.imdbID}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <img className="img-thumbnail" style={{ height: "400px", width: "400px" }} src={m.Poster} alt="{m.Title}"></img>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card-body">
                                            <h5 className="card-title text-white">{m.Title}</h5>
                                            <p className="card-text text-white">Type:{m.Type} Year:{m.Year}</p>
                                            {
                                                isfav ? <button onClick={() => addFav(m)} className="btn btn-primary text-white">Add To Favourite</button>
                                                    : <button onClick={() => remFav(m)} className="btn btn-danger text-white">Remove from Favourite</button>
                                            }
                                            <form className="mt-2" onSubmit={submitreview}>

                                                <label className="text-white">Rate</label>
                                                <br></br>
                                                <input className="bg-light form-control w-25" value={rating} onChange={rate} type="number" min="0" max="10" ></input>
                                                <label className="text-white mt-2" >Comment</label>
                                                <br></br>
                                                <textarea className="w-75 bg-light form-control" value={comment} onChange={review}></textarea>
                                                <br></br>
                                                <button className='btn btn-success text-white' type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )
                    }) : <h4 className="text-white text-center">Not Found Try Searching Precisely</h4>
            }
            <br></br>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item"><button className="page-link bg-dark text-white" onClick={prev} >Previous</button></li>
                    <li className="page-item"><button className="page-link bg-dark text-white" >{pageno}</button></li>
                    <li className="page-item"><button className="page-link bg-dark text-white" onClick={next}>Next</button></li>
                </ul>
            </nav>
        </div >

    )

}

export default Result
