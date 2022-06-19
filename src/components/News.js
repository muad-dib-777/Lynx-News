import React, {useEffect, useState, useCallback} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) =>  {

    
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  

    const capitalizeFirstLetter = (string)  => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {

      
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
     
        setLoading(true)
        let data = await fetch(url);
       
        let parsedData = await data.json()
        
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    const fetchMoreData = async () => {
      
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
    

    useEffect(() => {

      if(props.category === 'general'){

        document.title = `Lynx News`
      }
      else{

        document.title = `Lynx News - ${capitalizeFirstLetter(props.category)}`
      }
      updateNews(); 
      }, [])


    return (

            <>

            
            <h1 className='text-center' style = {{marginTop: '90px'}} >Lynx News - Top Headlines {props.category === 'general'?'':`on ${capitalizeFirstLetter(props.category)}`}</h1>
            {loading && <Spinner/>}

            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner/>}
            >
            
            <div className='container my-3'>
              <div className="row">


                  {articles.map((element) => {
                  
                    return <div className="col-md-4" key = {`element.url ${Math.random()}`}>
                    <NewsItem title = {element.title?element.title:''} description = {element.description?element.description:""} imageURL = {element.urlToImage} newsURL = {element.url} author = {element.author} date = {element.publishedAt}/>
                  </div>

                    
                })}
                
                </div>
                </div>

            </InfiniteScroll>
                  
                  
            </>
    )
  
}

News.defaultProps = {

  pageSize: 6,
  category: 'general'
}

News.propTypes = {

  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News
