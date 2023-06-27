import React from 'react'

const NewsItem = (props) => {
    // let { title, description, imgUrl, newsUrl, author, date, source } = this.props;

    return (
        <div className='my-3'>
            <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{props.source}</span>
                <img src={!props.imgUrl ? 'https://www.dsij.in/Portals/0/EasyDNNnews/30539/image_238.jpg' : props.imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className="text-muted">By {!props.author ? "Unknown" : props.author} on {new Date(props.date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={props.newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
                {/* target='_blank' opens new Tab */}
            </div>
        </div>
    )
}

export default NewsItem;