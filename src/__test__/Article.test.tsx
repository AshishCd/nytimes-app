import { render, screen, fireEvent } from "@testing-library/react";
import { Article } from "../components/Article";

const mockArticle = {
    abstract: "This is the article abstract",
    adx_keywords: "Legal Profession;Workplace Hazards and Violations;#MeToo Movement;Appointments and Executive Changes;Kaplan, Roberta A",
    asset_id: 100000009542567,
    byline: "By Katie J. M. Baker and David Enrich",
    column: null,
    id: 1,
    media: [
        {
            type: "image",
            subtype: "photo",
            caption: "",
            copyright: "Albert Tercero",
            approved_for_syndication: 1,
            "media-metadata": [
                {
                    url: "https://static01.nyt.com/images/2024/06/24/well/24Well-Midlife-Promo/24Well-Midlife-Promo-thumbStandard.jpg",
                    format: "Standard Thumbnail",
                    height: 75,
                    width: 75,
                },
                {
                    url: "https://static01.nyt.com/images/2024/06/24/well/24Well-Midlife-Promo/24Well-Midlife-Promo-mediumThreeByTwo210.jpg",
                    format: "mediumThreeByTwo210",
                    height: 140,
                    width: 210,
                },
                {
                    url: "https://static01.nyt.com/images/2024/06/24/well/24Well-Midlife-Promo/24Well-Midlife-Promo-mediumThreeByTwo440.jpg",
                    format: "mediumThreeByTwo440",
                    height: 293,
                    width: 440,
                },
            ],
        },
    ],
    nytdsection: "business",
    published_date: "2024-06-26",
    section: "Section",
    source: "New York Times",
    subsection: "Subsection",
    title: "title",
    type: "Article",
    updated: "2024-06-27 10:17:33",
    uri: "nyt://article/77eed7ad-4b80-583d-9248-a67fcaa65f3f",
    url: "https://www.nytimes.com/2024/06/26/business/roberta-robbie-kaplan.html",
};

//getByText for all the elements which you expect would be present inside the DOM
//queryByText fro optional elements, if it deson't find that element return null and do not fail the test

const defaultProps = {
    isTypeSidebar: false,
    articleData: mockArticle,
    expandedArticlesId: { 1: false },
    toggleShowMore: jest.fn(),
};

describe("Article Component", () => {
    
    test("renders article title and byline", () => {
        render(<Article {...defaultProps} />);

        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("By Katie J. M. Baker and David Enrich")).toBeInTheDocument();
    });

    test("renders published date and updated date", () => {
        render(<Article {...defaultProps} />);

        expect(screen.getByText(/Published date: 2024-06-26/i)).toBeInTheDocument();
        expect(screen.getByText(/Updated on: 2024-06-27 10:17:33/i)).toBeInTheDocument();
    });

    test("renders 'Read More' button when article is not expanded", () => {
        render(<Article {...defaultProps} />);

        expect(screen.getByText("Read More")).toBeInTheDocument();
        expect(screen.queryByText("Read Less")).not.toBeInTheDocument();
    });

    test("renders 'Read Less' button when article is expanded", () => {
        render(<Article {...defaultProps} expandedArticlesId={{ 1: true }} />);

        expect(screen.getByText("Read Less")).toBeInTheDocument();
        expect(screen.queryByText("Read More")).not.toBeInTheDocument();
    });

    test("calls toggleShowMore function when button is clicked", () => {
        render(<Article {...defaultProps} />);

        fireEvent.click(screen.getByText("Read More"));
        expect(defaultProps.toggleShowMore).toHaveBeenCalledWith(1);
    });

    test("renders article abstract and section when expanded", () => {
        render(<Article {...defaultProps} expandedArticlesId={{ 1: true }} />);

        expect(screen.getByText("This is the article abstract")).toBeInTheDocument();
        expect(screen.getByText("Section")).toBeInTheDocument();
        expect(screen.getByText("Subsection")).toBeInTheDocument();
        expect(screen.getByText("Read Full Article")).toBeInTheDocument();
    });

    test("renders ResponsiveImage component when media is present", () => {
        render(<Article {...defaultProps} />);

        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    test("does not render updated date when it is not present", () => {
        const modifiedProps = {
            ...defaultProps,
            articleData: {
                ...mockArticle,
                updated: "",
            },
        };

        render(<Article {...modifiedProps} />);

        expect(screen.queryByText(/Updated on/i)).not.toBeInTheDocument();
    });
});
