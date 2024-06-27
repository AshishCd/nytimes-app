import { IArticleProps } from "../interface/type"
import { isNonEmptyArray } from "../utils";
import { ResponsiveImage } from "./ResponsiveImage";


export const Article: React.FunctionComponent<IArticleProps> = ({
    isTypeSidebar,
    articleData: article,
    expandedArticlesId,
    toggleShowMore
}) => {
    const isExpanded = expandedArticlesId[article.id];
    return (
        <div
            className={`mb-4 flex flex-col flex-col-reverse gap-3 border-2 lg:mb-8 p-6 min-h-[250px] text-left ${isTypeSidebar ? "lg:size-full lg:min-w-60 max-w-md" : "lg:flex-row lg:gap-18"}`}
            key={article.id}
        >
            <div className="flex-1">
                {!isTypeSidebar && <div className="text-[12px] pb-2">
                    <span className="text-gray-500">
                        {`Published date: ${article.published_date}`}
                    </span>
                    {article.updated && <p className="text-gray-500 mt-1">
                        {`Updated on: ${article.updated}`}
                    </p>}
                </div>}
                <h3 data-testid={`cypress-article-title-${article.id}`} className="font-bold truncate-3-lines">{article.title}</h3>
                <div className="text-xs mt-1">{article.byline}</div>
                {isExpanded && <>
                    <div className="mt-3 text-gray-500 truncate-3-lines">{article.abstract}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-current px-3 py-2 text-black text-xs cursor-pointer">{article.section}</span>
                        {article.subsection && <span className="rounded-full border border-current px-3 py-2 text-black text-xs cursor-pointer mr-2">{article.subsection}</span>}
                        <a href={article.url} target="_blank" rel="noreferrer" className="rounded-full border border-current px-3 py-2 bg-zinc-300 text-black text-xs cursor-pointer mr-2">{"Read Full Article"}</a>
                    </div>
                </>}
                <button
                    onClick={() => toggleShowMore(article.id)}
                    className={`w-full md:w-auto lg:w-auto rounded-full text-white bg-black py-2 px-3 ${isExpanded ? "mt-4" : "mt-2"} text-sm`}>{isExpanded ? "Read Less" : "Read More"}</button>
            </div>
            {isNonEmptyArray(article.media) && <div className="flex-1">
                <ResponsiveImage isTypeSidebar={isTypeSidebar} media={article.media} />
            </div>}
        </div>
    )
}