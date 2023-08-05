import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitalizeFirstLetter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e41ce1279c974e638ac7eecc0b1dbe92&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - DailyHub`;
    updateNews();
    // eslint-disable-next-line
  },[])
  
  // const = handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // }

  // const = handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // }
  const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e41ce1279c974e638ac7eecc0b1dbe92&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };
    return (
      <>
          <h1 className="text-center" style={{  paddingTop:'20px', marginTop: '55px', textShadow: '2px 2px 10px black' }}>DailyHub - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner/>}
          <InfiniteScroll
                dataLength={articles.length} //This is important field to render the next data
                next={fetchMoreData} 
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
          >
          <div className="container">
          <div className="row">
              {articles.map((ele)=>{
                return <div className="col-md-4" key={ele.url}>
                  <NewsItem title={ele.title} description={ele.description} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                </div>
              })}
          </div>
          </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
              <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
              <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 20,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News