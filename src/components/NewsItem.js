import React from 'react'

const NewsItem = (props) => {

    
  

    let {title, description, imageURL, newsURL, author, date} = props;

    return (
        
        <div className="card my-3">
            <img src={!imageURL?'https://alxgroup.com.au/wp-content/uploads/2016/04/dummy-post-horisontal.jpg':imageURL} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
                <a href= {newsURL} rel="noreferrer" target = "_blank" className="btn btn-sm btn-dark">Read More</a>
                
            </div>
        </div>
        
        
    )
  
}

export default NewsItem