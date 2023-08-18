import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loader: true,
            hasMoreData: false
        };
        this.mounted = false;
    }

    static defaultProps = {
        pageSize: 9,
        country: 'in',
        category: '',
        apiKey: '0f176a171aef4983893d919d30976af1',
    };

    static propTypes = {
        pageSize: PropTypes.number.isRequired,
        country: PropTypes.string,
        category: PropTypes.string,
        apiKey: PropTypes.string.isRequired,
        setProgress: PropTypes.func.isRequired,
    };

    newsApiCall = async () => {
        this.props.setProgress(10);
        const { page } = this.state;
        const { country, category, apiKey, pageSize } = this.props;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

        try {
            const response = await fetch(url);
            this.props.setProgress(30);
            const result = await response.json();
            this.props.setProgress(70);

            if (result.status === 'ok') {
                const newArticles = result.articles;
                this.setState((prevState) => ({
                    articles: prevState.articles.concat(newArticles),
                    loader: false,
                    hasMoreData: newArticles.length > 0,
                }));
            } else {
                this.props.setProgress(30);
                console.log('API request failed:', result.message);
            }
        } catch (error) {
            console.log('API request failed:', error);
            this.props.setProgress(30);
        }
        this.props.setProgress(100);
    };

    fetchMoreData = () => {
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }),
            () => {
                this.newsApiCall();
            }
        );
    };

    componentDidMount() {
        if (!this.mounted) {
            this.mounted = true;
            this.newsApiCall();
            this.updateDocumentTitle(this.props.category);
        }
    }

    updateDocumentTitle(category) {
        document.title = 'NewsMonkey - Get your daily news for free';
        document.title = category !== '' ? `${this.capitalizeFirstLetter(category)} - ${document.title}` : document.title;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    render() {
        const { articles, loader, hasMoreData } = this.state;
        const { category } = this.props;

        return (
            <div className="container mt-3">
                <h2 className="text-center" style={{marginTop: "80px"}}>{category !== '' ? `NewsMonkey - Top ${this.capitalizeFirstLetter(category)} Headlines` : 'NewsMonkey - Top headlines' }</h2>
                {loader && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchMoreData}
                    hasMore={hasMoreData}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {articles.map((article, index) => (
                                <div className="col-md-3" key={index}>
                                    {!loader && <NewsItem
                                        title={article.title ? (article.title.length > 45 ? `${article.title.slice(0, 45)}...` : article.title) : ''}
                                        description={article.description ? (article.description.length > 88 ? `${article.description.slice(0, 88)}...` : article.description) : ''}
                                        author={article.author ? article.author : 'Unknown'}
                                        source={article.source.Name}
                                        imageUrl={article.urlToImage}
                                        newsUrl={article.url}
                                        date={article.publishedAt}
                                    />}
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;
