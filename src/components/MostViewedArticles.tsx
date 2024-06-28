import React from "react";
import {
  IMostViewedArticlesProps,
  IMostViewedArticlesState,
} from "../interface/type";
import { getApiUrl, isNonEmptyArray } from "../utils";
import "../App.css";
import { Constants } from "../constants";
import Loader from "./Loader";
import { Article } from "./Article";

export class MostViewedArticles extends React.Component<
  IMostViewedArticlesProps,
  IMostViewedArticlesState
> {
  public API_URL = getApiUrl(this.props.day);

  constructor(props: IMostViewedArticlesProps) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      error: null,
      expandedArticlesId: {},
    };
  }

  async componentDidMount() {
    try {
      const apiKey = process.env.REACT_APP_NYT_API_KEY;
      const response = await fetch(`${this.API_URL}?api-key=${apiKey}`);
      if (!response.ok) {
        throw new Error("Network response was not ok, Too many calls");
      }
      const data = await response.json();
      this.setState({ articles: data.results, loading: false });
    } catch (error) {
      this.setState({
        error:
          error instanceof Error
            ? error
            : new Error("An unknown error occurred"),
        loading: false,
      });
    }
  }

  private toggleShowMore = (articleId: number) => {
    this.setState((prevState) => ({
      expandedArticlesId: {
        ...prevState.expandedArticlesId,
        [articleId]: !prevState.expandedArticlesId[articleId],
      },
    }));
  };

  private isTypeSidebar = () => {
    const { type } = this.props;
    return !!type && type === Constants.SIDE_BAR;
  };

  private shouldShowArticles = () => {
    const { articles } = this.state;
    return this.isTypeSidebar() ? articles.slice(0, 10) : articles;
  };

  public render() {
    const { articles, loading, error, expandedArticlesId } = this.state;

    if (loading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="block">
        {isNonEmptyArray(articles) &&
          this.shouldShowArticles().map((article) => (
              <Article
                key={article.id}
                isTypeSidebar={this.isTypeSidebar()}
                articleData={article}
                expandedArticlesId={expandedArticlesId}
                toggleShowMore={this.toggleShowMore}
              />
          ))}
      </div>
    );
  }
}
