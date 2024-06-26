import React, { useEffect, useState } from "react";
import { IMostViewedArticles } from "../interface/type";
import { isNonEmptyArray } from "../utils";
import "../App.css";
import { ResponsiveImage } from "./ResponsiveImage";

interface IMostViewedArticlesProps {

}

export const MostViewedArticles: React.FunctionComponent<IMostViewedArticlesProps> = () => {
    const [articles, setArticles] = useState<IMostViewedArticles[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const apiKey = process.env.REACT_APP_NYT_API_KEY;
                const response = await fetch(
                    `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.response);
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    };

    return (
        <main className="items-center justify-between p-24">
            <section>
                {isNonEmptyArray(articles) && articles.map((article) => {
                    const shoudlRenderPhotoCredit = article.byline && article.source;
                    return (
                        <div className={`flex gap-24 border-2 mb-8 p-6 min-h-[250px]`} key={article.id}>
                            <div className="flex-1">
                                <div>
                                    <div className="text-[12px] pb-2">
                                        <span>
                                            {`Published date: ${article.published_date}`}
                                        </span>
                                        {article.updated && <span>
                                            {`, Updated on: ${article.updated}`}
                                        </span>}
                                        </div>
                                    <h3 className="font-bold">{article.title}</h3>
                                    <h6 className="mt-3 truncate-3-lines">{article.abstract}</h6>
                                </div>
                            </div>
                            {isNonEmptyArray(article.media) && <div className="flex-1">
                                <ResponsiveImage media={article.media} />
                                {shoudlRenderPhotoCredit && <div className="flex justify-end mt-2 text-[8px]">{`${article.byline} for the ${article.source}`}</div>}
                            </div>}
                        </div>
                    )
                })
                }
            </section>
        </main>
    )
}