import React, { useContext } from "react";
import Nav from "../Components/Nav";
import { listingDataContext } from "../Context/ListingContext";
import Card from "../Components/Card";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-500">
          <h2>Something went wrong.</h2>
          <p>Error: {this.state.error.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = () => {
  let { listingData, setListingData, newListData } = useContext(listingDataContext);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 via-blue-600 via-teal-500 via-green-400 via-yellow-300 via-orange-500 to-red-600 overflow-hidden relative"
    >
      <Nav />
      <div className="container mx-auto px-4 pt-[200px] py-8 relative z-30">
        <ErrorBoundary>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {newListData && Array.isArray(newListData) && newListData.length > 0 ? (
              newListData.map((list) => (
                <Card
                  key={list._id}
                  title={list.title || "Untitled"}
                  landMark={list.landMark || "Unknown"}
                  city={list.city || "Unknown"}
                  image1={list.image1 || ""}
                  image2={list.image2 || ""}
                  image3={list.image3 || ""}
                  rent={list.rent || 0}
                  id={list._id}
                  ratings={list.ratings || "N/A"}
                  isBooked={list.isBooked || false}
                  host={list.host || "Unknown"}
                  className="z-40"
                />
              ))
            ) : (
              <p className="text-white text-lg">No listings available.</p>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Home;