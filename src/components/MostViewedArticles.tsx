import React from "react";
import { IMostViewedArticlesProps, IMostViewedArticlesState } from "../interface/type";
import { isNonEmptyArray } from "../utils";
import "../App.css";
import { Constants } from "../constants";
import Loader from "./Loader";
import { Article } from "./Article";

export class MostViewedArticles extends React.Component<IMostViewedArticlesProps, IMostViewedArticlesState> {
    API_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${this.props.day}.json`;

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
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ articles: data.results, loading: false });
        } catch (error) {
            this.setState({ error: error instanceof Error ? error : new Error('An unknown error occurred'), loading: false });
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
        const { heading } = this.props;
        const { articles, loading, error, expandedArticlesId } = this.state;

        if (loading) {
            return <div><Loader /></div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                {this.isTypeSidebar() ? <h2 data-testid="cypress-sidebar-header" className="text-lg text-center lg:text-4xl mb-5 border-b-2 pb-1 lg:border-none lg:text-left font-bold">
                    {heading}
                </h2> : <h1 data-testid="cypress-main-header" className="text-lg text-center lg:text-4xl mb-5 border-b-2 pb-1 lg:border-none lg:text-left font-bold">
                    {heading}
                </h1>}
                {isNonEmptyArray(articles) && this.shouldShowArticles().map((article) => (
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
};
