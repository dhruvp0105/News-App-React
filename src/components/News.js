import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=58e4360f1bdf4b89b38f59a46b7e8250&page=${page}&pageSize=${props.pageSize}`;
        setLoading(false);
        let data = await fetch(url);
        let parsedData = await data.json();


        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

    }

    useEffect(() => {
        updateNews();
    }, [])

    const handlePrevClick = async () => {
        setPage(page - 1);
        updateNews();
    }

    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    }

    return (
        <div className='container my-5'>
            <h1 className='text-center' style={{ margin: '40px 0px' }}>News-Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
            {
                loading &&
                <Spinner />
            }
            <div className='row'>
                {!loading && articles.map((element) => {
                    return (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    )
                })}
            </div>
            <div className="container d-flex justify-content-between my-3" >
                <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>

        </div>

    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'science'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;
