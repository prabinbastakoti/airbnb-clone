import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import placeService from '../services/placeService';
import Spinner from '../components/spinner/Spinner';
import BookingWidget from '../components/BookingWidget';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SinglePage() {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    placeService.getPlaceById(id).then((data) => {
      setPlace(data);
      setLoading(false);
    });
  }, []);

  if (loading || !place) {
    return <Spinner />;
  }

  return (
    <div className="mt-4 py-8">
      <h1 className="text-xl sm:text-2xl mb-1">{place.title}</h1>
      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        <a
          className="my-2 block font-semibold underline text-sm sm:text-base"
          target="_blank"
          rel="noreferrer"
          href={'https://maps.google.com/?q=' + place.address}
        >
          {place.address}
        </a>
      </div>
      <div className="relative mt-4 grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        {place.photos?.[0] && (
          <img
            className="aspect-square w-full h-full object-cover"
            src={BASE_URL + '/api/uploads/' + place.photos[0]}
          />
        )}
        <div className="grid overflow-hidden">
          {place.photos?.[1] && (
            <img
              className="aspect-square w-full h-full object-cover"
              src={BASE_URL + '/api/uploads/' + place.photos[1]}
            />
          )}
          {place.photos?.[2] && (
            <img
              className="aspect-square w-full h-full object-cover relative top-2"
              src={BASE_URL + '/api/uploads/' + place.photos[2]}
            />
          )}
        </div>
        <Link
          className="flex items-center gap-1 absolute bottom-2 right-2 py-2 px-3 rounded-2xl bg-white shadow-md shadow-gray-500 text-sm"
          to={`/place/${id}/allphotos`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <rect width="256" height="256" fill="none" />
            <circle cx="60" cy="60" r="16" />
            <circle cx="128" cy="60" r="16" />
            <circle cx="196" cy="60" r="16" />
            <circle cx="60" cy="128" r="16" />
            <circle cx="128" cy="128" r="16" />
            <circle cx="196" cy="128" r="16" />
            <circle cx="60" cy="196" r="16" />
            <circle cx="128" cy="196" r="16" />
            <circle cx="196" cy="196" r="16" />
          </svg>
          <span className="text-xs sm:text-sm">Show&nbsp;all&nbsp;photos</span>
        </Link>
      </div>
      <BookingWidget place={place} />
    </div>
  );
}

export default SinglePage;
