// import React from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { Info } from 'lucide-react';

// interface ScoreCardProps {
//     title: string;
//     score: number;
//     description: string;
// }

// const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, description }) => {
//     const getScoreColor = (score: number) => {
//         if (score >= 80) return '#22c55e'; // Green
//         if (score >= 60) return '#eab308'; // Yellow
//         return '#ef4444'; // Red
//     };

//     function getRating(percentage: number): string {
//         if (percentage < 50) return "Poor";
//         if (percentage < 65) return "Average";
//         if (percentage < 75) return "Good";
//         if (percentage < 85) return "Better";
//         if (percentage < 95) return "Best";
//         return "Excellent";
//     }

//     return (
//         <div className="bg-white rounded-lg py-2 px-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                     <div className='flex flex-row justify-between'>
//                         <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
//                         <div className="group relative">
//                             <Info className="w-4 h-4 text-gray-400 cursor-help" />
//                             <div className="absolute right-0 w-48 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//                                 {description}
//                             </div>
//                         </div>
//                     </div>

//                     <div className='flex flex-row justify-between'>
//                         <div className="mt-1 flex items-center gap-2">
//                             <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                 <div
//                                     className="h-full rounded-full transition-all duration-500"
//                                     style={{
//                                         width: `${score}%`,
//                                         backgroundColor: getScoreColor(score)
//                                     }}
//                                 />
//                             </div>
//                             <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
//                                 {score}%
//                             </span>
//                         </div>
//                         <div className='flex justify-end'>
//                             <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
//                                 {getRating(score)}
//                             </span>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// };

// interface PropertyScoreProps {
//     propertyId: string;
// }

// export function PropertyScore({ propertyId }: PropertyScoreProps) {

//     const getScoreColor = (score: number) => {
//         if (score >= 80) return '#22c55e'; // Green
//         if (score >= 60) return '#eab308'; // Yellow
//         return '#ef4444'; // Red
//     };

//     function getRating(percentage: number): string {
//         if (percentage < 50) return "Poor";
//         if (percentage < 65) return "Average";
//         if (percentage < 75) return "Good";
//         if (percentage < 85) return "Better";
//         if (percentage < 95) return "Best";
//         return "Excellent";
//     }

//     // Mock data - Replace with actual API call
//     const overallScore = 85;

//     const localityScores = [
//         {
//             title: "Livability Score",
//             score: 88,
//             description: "Based on safety, cleanliness & public utilities in the area"
//         },
//         {
//             title: "Connectivity Score",
//             score: 92,
//             description: "Proximity to metro, highways, IT hubs & markets"
//         },
//         {
//             title: "Safety Score",
//             score: 85,
//             description: "Analysis of crime rates, women's safety & emergency services"
//         },
//         {
//             title: "Pollution Score",
//             score: 75,
//             description: "Air quality index and noise pollution levels"
//         },
//         {
//             title: "Social & Lifestyle",
//             score: 90,
//             description: "Access to malls, restaurants, cultural hubs & nightlife"
//         }
//     ];

//     const propertyScores = [
//         {
//             title: "Price Growth",
//             score: 82,
//             description: "AI-based forecast for property value appreciation"
//         },
//         {
//             title: "Rental Yield",
//             score: 78,
//             description: "Expected rental returns based on market analysis"
//         },
//         {
//             title: "Investment Potential",
//             score: 88,
//             description: "Combined score for short & long-term value appreciation"
//         },
//         {
//             title: "Gentrification",
//             score: 95,
//             description: "Future development prospects and infrastructure plans"
//         },
//         {
//             title: "Demand & Supply",
//             score: 85,
//             description: "Market dynamics and inventory trends"
//         }
//     ];

//     return (
//         <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-6 mt-4">
//             <div className="flex justify-center items-center gap-2 mb-6">
//                 <h2 className="text-lg font-semibold text-blue-500">HouseGPT Property Score</h2>
//             </div>

//             {/* Overall Score */}
//             <div className="flex items-center justify-center mb-4">
//                 <div className="w-32 h-32">
//                     <CircularProgressbar
//                         value={overallScore}
//                         text={`${overallScore}%`}
//                         styles={buildStyles({
//                             textSize: '1.5rem',
//                             pathColor: `#22c55e`,
//                             textColor: '#1f2937',
//                             trailColor: '#e5e7eb',
//                         })}
//                     />
//                 </div>
//             </div>

//             <div className='flex justify-center mb-4'>
//                 <span className="text-lg font-medium" style={{ color: getScoreColor(overallScore) }}>
//                     {getRating(overallScore)}
//                 </span>
//             </div>

//             <div className="flex justify-center items-center text-center gap-2 mb-6">
//                 <p className="text-sm font-medium text-gray-500">With an Overall HouseGPT Score of 87, this property is highly recommended for both end-users and investors. It offers a balanced mix of livability, connectivity, and strong ROI potential, making it a premium choice in Bengaluru’s real estate market.
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Locality & Neighborhood Scores */}
//                 <div>
//                     <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
//                         <span>📍 Locality & Neighborhood</span>
//                     </h3>
//                     <div className="space-y-3">
//                         {localityScores.map((score) => (
//                             <ScoreCard
//                                 key={score.title}
//                                 title={score.title}
//                                 score={score.score}
//                                 description={score.description}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Property-Specific Scores */}
//                 <div>
//                     <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
//                         <span>🏠 Property Analysis</span>
//                     </h3>
//                     <div className="space-y-3">
//                         {propertyScores.map((score) => (
//                             <ScoreCard
//                                 key={score.title}
//                                 title={score.title}
//                                 score={score.score}
//                                 description={score.description}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Info } from 'lucide-react';
import { PropertyScores } from '../../lib/property-detail';

interface ScoreCardProps {
    title: string;
    score: number;
    description: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, description }) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return '#22c55e'; // Green
        if (score >= 60) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    function getRating(percentage: number): string {
        if (percentage < 50) return "Poor";
        if (percentage < 65) return "Average";
        if (percentage < 75) return "Good";
        if (percentage < 85) return "Better";
        if (percentage < 95) return "Best";
        return "Excellent";
    }

    return (
        <div className="bg-white rounded-lg py-2 px-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className='flex flex-row justify-between'>
                        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                        <div className="group relative">
                            <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="absolute right-0 w-48 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                {description}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className="mt-1 flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${score}%`,
                                        backgroundColor: getScoreColor(score)
                                    }}
                                />
                            </div>
                            <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
                                {score}%
                            </span>
                        </div>
                        <div className='flex justify-end'>
                            <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
                                {getRating(score)}
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

interface PropertyScoreProps {
    // propertyId: string;
    propertyScore: PropertyScores;
}

export function PropertyScore({ propertyScore }: PropertyScoreProps) {

    const getScoreColor = (score: number) => {
        if (score >= 80) return '#22c55e'; // Green
        if (score >= 60) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    function getRating(percentage: number): string {
        if (percentage < 50) return "Poor";
        if (percentage < 65) return "Average";
        if (percentage < 75) return "Good";
        if (percentage < 85) return "Better";
        if (percentage < 95) return "Best";
        return "Excellent";
    }

    // Mock data - Replace with actual API call
    const overallScore = 85;

    // const localityScores = [
    //     {
    //         title: "Livability Score",
    //         score: 88,
    //         description: "Based on safety, cleanliness & public utilities in the area"
    //     },
    //     {
    //         title: "Connectivity Score",
    //         score: 92,
    //         description: "Proximity to metro, highways, IT hubs & markets"
    //     },
    //     {
    //         title: "Safety Score",
    //         score: 85,
    //         description: "Analysis of crime rates, women's safety & emergency services"
    //     },
    //     {
    //         title: "Pollution Score",
    //         score: 75,
    //         description: "Air quality index and noise pollution levels"
    //     },
    //     {
    //         title: "Social & Lifestyle",
    //         score: 90,
    //         description: "Access to malls, restaurants, cultural hubs & nightlife"
    //     }
    // ];

    // const propertyScores = [
    //     {
    //         title: "Price Growth",
    //         score: 82,
    //         description: "AI-based forecast for property value appreciation"
    //     },
    //     {
    //         title: "Rental Yield",
    //         score: 78,
    //         description: "Expected rental returns based on market analysis"
    //     },
    //     {
    //         title: "Investment Potential",
    //         score: 88,
    //         description: "Combined score for short & long-term value appreciation"
    //     },
    //     {
    //         title: "Gentrification",
    //         score: 95,
    //         description: "Future development prospects and infrastructure plans"
    //     },
    //     {
    //         title: "Demand & Supply",
    //         score: 85,
    //         description: "Market dynamics and inventory trends"
    //     }
    // ];

    return (
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-6 mt-4">
            <div className="flex justify-center items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold text-blue-500">HouseGPT Property Score</h2>
            </div>

            {/* Overall Score */}
            <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32">
                    <CircularProgressbar
                        value={propertyScore.overallScore}
                        text={`${propertyScore.overallScore}%`}
                        styles={buildStyles({
                            textSize: '1.5rem',
                            pathColor: getScoreColor(propertyScore.overallScore),
                            textColor: getScoreColor(propertyScore.overallScore),
                            trailColor: '#e5e7eb',
                        })}
                    />
                </div>
            </div>

            <div className='flex justify-center mb-4'>
                <span className="text-lg font-medium" style={{ color: getScoreColor(propertyScore.overallScore) }}>
                    {getRating(propertyScore.overallScore)}
                </span>
            </div>

            <div className="flex justify-center items-center text-center gap-2 mb-6">
                <p className="text-sm text-gray-500">{propertyScore.scoreOverview}</p>
            </div>


                    
            <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">
               

                {/* Property-Specific Scores */}
                <div>
                    <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                        <span>🏠 Property Analysis</span>
                    </h3>
                    {/* <div className="space-y-3">
                        {propertyScores.map((score) => (
                            <ScoreCard
                                key={score.title}
                                title={score.title}
                                score={score.score}
                                description={score.description}
                            />
                        ))}
                    </div> */}
                    <div className="space-y-3">

                        <ScoreCard
                            key={"Price Growth"}
                            title={"Price Growth"}
                            score={propertyScore.priceGrowthScore}
                            description={`AI-based forecast for property value appreciation`}
                        />
                        <ScoreCard
                            key={"Rental Yield"}
                            title={"Rental Yield"}
                            score={propertyScore.rentalYieldScore}
                            description={`Expected rental returns based on market analysis`}
                        />
                        <ScoreCard
                            key={"Investment Potential"}
                            title={"Investment Potential"}
                            score={propertyScore.investmentPotentialScore}
                            description={`Combined score for short & long-term value appreciation`}
                        />
                        <ScoreCard
                            key={"Gentrification"}
                            title={"Gentrification"}
                            score={propertyScore.gentrificationScore}
                            description={`Future development prospects and infrastructure plans`}
                        />
                        <ScoreCard
                            key={"Demand & Supply"}
                            title={"Demand & Supply"}
                            score={propertyScore.demandSupplyScore}
                            description={`Market dynamics and inventory trends`}
                        />

                    </div>
                </div>
                 {/* Locality & Neighborhood Scores */}
                 <div>
                    <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                        <span>📍 Locality & Neighborhood</span>
                    </h3>
                    {/* <div className="space-y-3">
                        {localityScores.map((score) => (
                            <ScoreCard
                                key={score.title}
                                title={score.title}
                                score={score.score}
                                description={score.description}
                            />
                        ))}
                    </div> */}
                    <div className="space-y-3">
                        <ScoreCard
                            key={'Livability Score'}
                            title={'Livability Score'}
                            score={propertyScore.livabilityScore}
                            description={'Based on safety, cleanliness & public utilities in the area'}
                        />
                        <ScoreCard
                            key={'Connectivity Score'}
                            title={'Connectivity Score'}
                            score={propertyScore.connectivityScore}
                            description={'Proximity to metro, highways, IT hubs & markets'}
                        />
                        <ScoreCard
                            key={'Safety Score'}
                            title={'Safety Score'}
                            score={propertyScore.safetyScore}
                            description={`Analysis of crime rates, women's safety & emergency services`}
                        />
                        <ScoreCard
                            key={'Pollution Score'}
                            title={'Pollution Score'}
                            score={propertyScore.pollutionScore}
                            description={'Air quality index and noise pollution levels'}
                        />
                        <ScoreCard
                            key={'Social & Lifestyle'}
                            title={'Social & Lifestyle'}
                            score={propertyScore.socialLifestyleScore}
                            description={'Access to malls, restaurants, cultural hubs & nightlife'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}