import React from 'react'
import './NewsItem.css'
const NewsItem = (props)=> {
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <div className="card" style={{width : "23rem"}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
                <span className="badge rounded-pill bg-danger"> {source} </span>
            </div>
          <img src={imageUrl?imageUrl:"https://png.pngtree.com/png-clipart/20200225/original/pngtree-pop-art-bubble-speech-with-oops-text-png-image_5301923.jpg"} className="card-img-top" alt="..." height="250px" width="200px"/>
          <div className="card-body">
          <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" >Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem