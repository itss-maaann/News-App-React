import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { author, title, description, source, imageUrl, newsUrl, date } = this.props;
        return (
            <div>
                <div className="card h-100 d-flex flex-column justify-content-between">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                    style={{left : '90%', zIndex : '1'}}>
                        {source}
                    </span>
                    <img src={imageUrl ? imageUrl : 'https://images.indianexpress.com/2023/06/Webb-reionisation-20230613.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By <strong>{author}</strong> on {date ? new Date(date).toGMTString() : '--/--/--'}</small></p>
                        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
