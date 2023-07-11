import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loader: true,
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
    };

    newsApiCall = async () => {
        const { page } = this.state;
        const { country, category, apiKey, pageSize } = this.props;
        console.log(page);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);

            if (result.status === 'ok') {
                this.setState({
                    articles: this.state.articles.length === 0 ? result.articles : this.state.articles.concat(result.articles),
                    totalResults: result.totalResults,
                    loader: false,
                });
            } else {
                console.log('API request failed:', result.message);
            }
        } catch (error) {
            console.log('API request failed:', error);
        }
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
        console.log("Component mounted");
        console.log(this.mounted);
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
        const { articles, loader } = this.state;
        const {category} = this.props;

        return (
            <>
                <h2 className="text-center">{category !== '' ? `NewsMonkey - Top ${this.capitalizeFirstLetter(category)} Headlines` : 'NewsMonkey - Top headlines' }</h2>
                {loader && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchMoreData}
                    hasMore={articles.length < this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container my-3">
                <div className="row">
                    {articles.map((article, index) => (
                        <div className="col-md-4" key={index}>
                            {!loader && <NewsItem
                                title={article.title ? (article.title.length > 45 ? `${article.title.slice(0, 45)}...` : article.title) : ''}
                                description={article.description ? (article.description.length > 88 ? `${article.description.slice(0, 88)}...` : article.description) : ''}
                                author={article.author ? article.author : 'Unknown'}
                                source={article.source.name}
                                imageUrl={article.urlToImage}
                                newsUrl={article.url}
                                date={article.publishedAt}
                            />}
                        </div>
                    ))}
                </div>
                </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;