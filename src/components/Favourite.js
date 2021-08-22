import React, { useEffect, useState } from 'react'

function Favourite() {
    const [movie, setmovie] = useState([])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("fav"))) {
            setmovie(JSON.parse(localStorage.getItem("fav")))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("fav", JSON.stringify(movie))
    }, [movie])

    const remFav = (m) => {
        setmovie(movie.filter((f) => { return JSON.stringify(f) !== JSON.stringify(m) }))
    }

    return (
        movie.length ?
            movie.map((m) => {
                return (
                    <div className="card w-75 mx-auto" key={m.imdbID}>
                        <div className="row">
                            <div className="col-sm-6">
                                <img className="img-thumbnail" style={{ height: "400px", width: "400px" }} src={m.Poster} alt="{m.Title}"></img>
                            </div>
                            <div className="col-sm-6">
                                <div className="card-body">
                                    <h5 className="card-title text-white">{m.Title}</h5>
                                    <p className="card-text text-white">Type:{m.Type} Year:{m.Year}</p>
                                    <button onClick={() => remFav(m)} className="btn btn-danger text-white">Remove from Favourite</button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }) : <h4 className="mt-3 text-center text-white">Your Favourite List is Empty</h4>

    )
}

export default Favourite
