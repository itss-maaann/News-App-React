import React, { Component } from 'react';

class NewsItem extends Component {
    render() {
        const { author, title, description, source, imageUrl, newsUrl, date, index } = this.props;

        return (
            <div className="card h-100 d-flex flex-column justify-content-between">
                <div className='position-absolute d-flex justify-content-end' style={{ right: 0 }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                </div>
                <img src={imageUrl ? imageUrl : `https://picsum.photos/200?random=${index}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By <strong>{author}</strong> on {date ? new Date(date).toGMTString() : '--/--/--'}
                        </small>
                    </p>
                    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More</a>
                </div>
            </div>
        );
    }
}

export default NewsItem;
