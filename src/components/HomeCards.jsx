import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

function HomeCards() {
  return (
    <section className="py-8">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg">
        <Card bg="bg-[#E6F3FF]" className="w-64 h-80 p-8">
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <p className="mt-4 mb-8 text-lg">
              Look at all the different leaderboards(daily, clan, player).
            </p>
            <Link
              to="/leaderboard/daily/current"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              View
            </Link>
          </Card>
          <Card bg="bg-[#E6F3FF]" className="w-64 h-80 p-8">
            <h2 className="text-2xl font-bold">Profile Viewer</h2>
            <p className="mt-4 mb-8 text-lg">
              View profile stats, with extra stats!
            </p>
            <Link
              to="/pv"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Look up
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default HomeCards;
