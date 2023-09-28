import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Perks from './Perks';
import PhotosUploader from './PhotosUploader';
import placeService from '../services/placeService';

function PlaceForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputFields, setInputFields] = useState({
    title: '',
    address: '',
    photoLink: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuest: 1,
  });

  useEffect(() => {
    if (!id) return;

    placeService.getPlaceById(id).then((data) =>
      setInputFields({
        title: data.title,
        address: data.address,
        photoLink: '',
        addedPhotos: data.photos,
        description: data.description,
        perks: data.perks,
        extraInfo: data.extraInfo,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        maxGuest: data.maxGuests,
      })
    );
  }, [id]);

  function placeHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function placeSubHeader(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function heading(header, subHeader) {
    return (
      <>
        {placeHeader(header)}
        {placeSubHeader(subHeader)}
      </>
    );
  }

  function handleFormChange(event, key) {
    if (key === 'maxGuest' && event.target.value < 1) return;
    setInputFields((prev) => ({ ...prev, [key]: event.target.value }));
  }

  async function savePlace(ev) {
    ev.preventDefault();
    if (id) {
      await placeService.updatePlace(id, inputFields);
      navigate('/profile/accomodations');
    } else {
      await placeService.addPlace(inputFields);
      navigate('/profile/accomodations');
    }
  }

  return (
    <div>
      <form className="max-w-4xl mx-auto" onSubmit={savePlace}>
        {heading('Title', 'title for your place, should be short and catchy')}
        <input
          type="text"
          placeholder="for example: My lovely Apt"
          id="title"
          value={inputFields.title}
          onChange={(ev) => handleFormChange(ev, ev.target.id)}
        />

        {heading('Address', 'address to your place')}
        <input
          type="text"
          placeholder="Address"
          id="address"
          value={inputFields.address}
          onChange={(ev) => handleFormChange(ev, ev.target.id)}
        />

        {heading('Photos', 'upload your place photos')}

        <PhotosUploader
          inputFields={inputFields}
          setInputFields={setInputFields}
          handleFormChange={handleFormChange}
        />

        {heading('Description', 'description of your place')}
        <textarea
          value={inputFields.description}
          id="description"
          onChange={(ev) => handleFormChange(ev, ev.target.id)}
        />

        {heading('Perks', 'select all the perks of your place')}
        <Perks setInputFields={setInputFields} inputFields={inputFields} />

        {heading('Extra Information', 'house rules, etc')}
        <textarea
          value={inputFields.extraInfo}
          id="extraInfo"
          onChange={(ev) => handleFormChange(ev, ev.target.id)}
        />

        {heading(
          'CheckIn & CheckOut',
          'add checkIn & checkOut time, remember to have some time window for cleaning the room between guests'
        )}

        <div className="flex gap-2 mt-2 justify-between">
          <div>
            <h3>CheckIn time</h3>
            <input
              type="text"
              placeholder="eg. 14:00"
              id="checkIn"
              value={inputFields.checkIn}
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />
          </div>
          <div>
            <h3>CheckOut time</h3>
            <input
              type="text"
              id="checkOut"
              placeholder="eg. 12:00"
              value={inputFields.checkOut}
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />
          </div>
          <div>
            <h3>Max Guest</h3>
            <input
              type="number"
              id="maxGuest"
              placeholder="eg. 4"
              value={inputFields.maxGuest}
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-7 mb-6">
          <button className="w-1/2 bg-primary text-white p-2 rounded-full">
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceForm;
