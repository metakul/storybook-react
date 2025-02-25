import React from 'react';

const RoadmapCard = ({ title, quarter, percentage, items }) => (
  <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
    <div className="flex justify-between items-center mb-4">
      <div className="text-neon-green text-xl font-bold">{title} ({quarter})</div>
      <div className="text-yellow-400 text-xl font-bold">{percentage}%</div>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-white text-sm">{index + 1}. {item}</li>
      ))}
    </ul>
  </div>
);

const Web3Roadmap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-neon-green text-sm font-medium mb-4">
            EMBARK ON THE METACOPS ADVENTURE
          </div>
          <h1 className="text-white text-4xl font-bold mb-16">
            UNVEILING THE ROAD TO WEB3 EXCELLENCE
          </h1>
        </div>

        <div className="grid gap-8">
          <RoadmapCard
            title="GENESIS MINTING"
            quarter="Q1 2023"
            percentage={10}
            items={[
              "Minting the first 500 unique Metacops NFTs.",
              "Exclusive access for early supporters and whitelist members.",
              "Unveiling our legendary NFT characters to the world.",
              "Initiation of the Metacops community."
            ]}
          />

          <RoadmapCard
            title="STAKE & REWARD"
            quarter="Q2 2023"
            percentage={25}
            items={[
              "Introducing $META as our utility token for staking.",
              "Staking platform launch with enticing rewards for participants.",
              "Building a vibrant and engaged Metacops staking community.",
              "Continuous development for enhanced staking experiences."
            ]}
          />

          <RoadmapCard
            title="LEGENDARY BREEDING"
            quarter="Q3 2023"
            percentage={40}
            items={[
              "Unveiling the Metacops Breeding platform.",
              "Introduction of rare traits and exclusive breeding events.",
              "Community-driven breeding competitions and challenges.",
              "Expansion of the Metacops NFT universe through breeding."
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Web3Roadmap;