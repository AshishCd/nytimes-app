import React, { useEffect, useState } from "react";
import { IMostViewedArticles } from "../interface/type";
import { isNonEmptyArray } from "../utils";
import "../App.css";
import { ResponsiveImage } from "./ResponsiveImage";
import { Constants } from "../constants";
import Loader from "./Loader";

interface IMostViewedArticlesProps {
    day: number;
    heading: string;
    type?: string;
};

export const MostViewedArticles: React.FunctionComponent<IMostViewedArticlesProps> = ({ day, heading, type }) => {
    const API_IRL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${day}.json`;
    const [articles, setArticles] = useState<IMostViewedArticles[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [expandedArticlesId, setExpandedArticlesId] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const apiKey = process.env.REACT_APP_NYT_API_KEY;
                const response = await fetch(
                    `${API_IRL}?api-key=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArticles(data.results);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('An unknown error occurred'));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div><Loader /></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    };

    const toggleShowMore = (articleId: number) => {
        setExpandedArticlesId(prevExpandedArticlesId => ({
            ...prevExpandedArticlesId,
            [articleId]: !prevExpandedArticlesId[articleId],
        }));
    };

    const isTypeSidebar = () => {
        return type === Constants.SIDE_BAR;
    };

    const shouldShowArticles = () => {
        if (!isTypeSidebar()) {
            return articles
        } else {
            return articles.slice(0, 10);
        }
    }


    return (
        <div>
            <h1 className={"text-lg text-center lg:text-4xl mb-5 border-b-2 pb-1 lg:border-none lg:text-left font-bold"}>{heading}</h1>
            {isNonEmptyArray(articles) && shouldShowArticles().map((article) => {
                const isExpanded = expandedArticlesId[article.id];
                return (
                    <div
                        className={`mb-4 flex flex-col flex-col-reverse gap-3 border-2 lg:mb-8 p-6 min-h-[250px] text-left ${isTypeSidebar() ? "lg:size-full lg:min-w-60 max-w-md" : "lg:flex-row lg:gap-18"}`}
                        key={article.id}
                    >
                        <div className="flex-1">
                            {!isTypeSidebar() && <div className="text-[12px] pb-2">
                                <span className="text-gray-500">
                                    {`Published date: ${article.published_date}`}
                                </span>
                                {article.updated && <p className="text-gray-500 mt-1">
                                    {`Updated on: ${article.updated}`}
                                </p>}
                            </div>}
                            <h3 className="font-bold">{article.title}</h3>
                            <div className="text-xs mt-1">{article.byline}</div>
                            {isExpanded && <>
                                <div className="mt-3 truncate-3-lines text-gray-500">{article.abstract}</div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="rounded-full border border-current px-3 py-2 text-black text-xs cursor-pointer">{article.section}</span>
                                    {article.subsection && <span className="rounded-full border border-current px-3 py-2 text-black text-xs cursor-pointer mr-2">{article.subsection}</span>}
                                    <a href={article.url} target="_blank" className="rounded-full border border-current px-3 py-2 bg-zinc-300 text-black text-xs cursor-pointer mr-2">{"Read Full Article"}</a>
                                </div>
                            </>}
                            <button
                                onClick={() => toggleShowMore(article.id)}
                                className={`size-full md:size-auto rounded-full text-white bg-black py-2 px-3 ${isExpanded ? "mt-4" : "mt-2"} mt-2 text-sm`}>{isExpanded ? "Read Less" : "Read More"}</button>
                        </div>
                        {isNonEmptyArray(article.media) && <div className="flex-1">
                            <ResponsiveImage isTypeSidebar={isTypeSidebar()} media={article.media} />
                        </div>}
                    </div>
                )
            })
            }
        </div>
    )
}