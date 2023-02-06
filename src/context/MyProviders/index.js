import { useState, createContext } from 'react';

export const AllFormInputsContext = createContext({ allFormInputs: null, addFormInputs: () => { } });
export const PhotosContext = createContext({ photos: null, setPhotos: () => { } });

const MyProviders = ({ children }) => {
    const [allFormInputs, setAllFormInputs] = useState(null);
    const [photos, setPhotos] = useState([]);

    const addFormInputs = (newInputs) => {
        setAllFormInputs((prevInputs) => {
            return {
                ...prevInputs,
                ...newInputs,
            };
        });
    };

    const addPhoto = (newPhoto) => {
        setPhotos([...photos, newPhoto])
    }

    return (
        <AllFormInputsContext.Provider value={{ allFormInputs, addFormInputs }}>
            <PhotosContext.Provider value={{ photos, addPhoto }}>
                {children}
            </PhotosContext.Provider>
        </AllFormInputsContext.Provider>
    );
}

export default MyProviders;