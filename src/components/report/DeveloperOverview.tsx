import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface DeveloperOverviewProps {
    developer: string;
    devloperOverview: string;
}

const DeveloperOverview: React.FC<DeveloperOverviewProps> = ({ developer, devloperOverview }) => {
    // const [overview, setOverview] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const defaultOverview = 'No details available for this location.';

    // useEffect(() => {
    //     const fetchOverview = async () => {
    //         setLoading(true);
    //         setError(null);

    //         try {
    //             // Initialize the API inside the effect to avoid re-creating on each render
    //             const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    //             const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    //             const response = await model.generateContent(
    //                 `Write a short under 100 words overview of the real estate developer 'Ashar' for home buyers covering all aspects.`
    //             );

    //             // Use response.text() method instead of response.text property
    //             setOverview(response.response.text());
    //         } catch (error) {
    //             console.error("Error fetching location overview:", error);
    //             setError("Failed to fetch location details. Please try again later.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (location) {
    //         fetchOverview();
    //     }
    // }, [location]);

    return (
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-6 mt-4">
            <div className="flex flex-col justify-between text-center items-center">
                <h2 className="text-lg font-semibold text-gray-800">HouseGPT Developer Overview</h2>
                <span>🏗 {developer}</span>
                {/* <span className="text-xs text-blue-500">Source : Google Gemini</span> */}
            </div>

            <div className="mt-2">
                {/* {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader className="animate-spin" size={24} />
                        <span className="ml-2 text-gray-500">Fetching details...</span>
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (  */}
                    <>
                        <p className="text-gray-700 text-sm items-center text-center">
                            {isExpanded ? (devloperOverview || defaultOverview) : `${(devloperOverview || defaultOverview).slice(0, 300)}...`}
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={toggleReadMore}
                                className="mt-2 text-blue-500 text-xs hover:underline focus:outline-none"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                        {/* <p className="text-gray-700 text-sm items-center text-center">
                            {isExpanded ? (devloperOverview || defaultOverview) : `${(devloperOverview || defaultOverview).slice(0, 300)}...`}
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={toggleReadMore}
                                className="mt-2 text-blue-500 text-xs hover:underline focus:outline-none"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        </div> */}
                    </>
                {/* )} */}
            </div>
        </div>
    );
};

export default DeveloperOverview;