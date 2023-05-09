import { API, Storage } from 'aws-amplify';

export const createHTMLDocument = async (allFormInputs, photos, onProgress) => {
    const numSteps = 3;
    let progress = 0;

    await uploadFormInputs(allFormInputs);
    progress += 1 / numSteps;
    onProgress(progress);

    await uploadPhotos(photos, (photoProgress) => {
        progress += photoProgress / numSteps;
        onProgress(progress);
    });

    const url = await createDocument();
    progress += 1 / numSteps;
    onProgress(progress);

    return url;
};

const uploadPhotos = async (photos, onProgress) => {
    await Storage.remove('photos/', { level: 'private' });

    let dispenserCount = 1;
    let powercabinetCount = 1;
    const uploads = photos.map(async (photo, index) => {
        const fileName = `photos/${photo.fileName}.jpg`;
        const fetchedPhoto = await fetch(photo.uri);
        const photoBlob = await fetchedPhoto.blob();

        let metadata;
        if (photo.dispenser) {
            metadata = {
                'dispenser': photo.dispenser.toString(),
                'type': photo.type.toString(),
                'dispenserNumber': photo.dispenserNumber.toString(),
                'overallDispenserNumber': dispenserCount.toString(),
                'promptKey': photo.promptKey.toString()
            };
            dispenserCount = dispenserCount + 1;
        }
        else if (photo.powercabinet) {
            metadata = {
                'powercabinet': photo.powercabinet.toString(),
                'cabinetNumber': photo.cabinetNumber.toString(),
                'overallCabinetNumber': powercabinetCount.toString(),
                'promptKey': photo.promptKey.toString()
            };
            powercabinetCount = powercabinetCount + 1;
        }
        else if (photo.constant) {
            metadata = {
                'constant': photo.constant.toString(),
                'promptKey': photo.promptKey.toString()
            };
        }

        try {
            const response = await Storage.put(fileName, photoBlob, {
                level: "private",
                contentType: "image/jpg",
                metadata: metadata
            });
            const progress = 1 / photos.length;
            onProgress(progress);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    });

    await Promise.all(uploads);
};

const uploadFormInputs = async (allFormInputs) => {
    const fileName = `forminputs.json`;
    const fileContent = JSON.stringify(allFormInputs);
    const fileBlob = new Blob([fileContent], { type: "application/json" });

    try {
        await Storage.put(fileName, fileBlob, {
            level: "private",
            contentType: "application/json"
        });
    } catch (error) {
        console.log("Error uploading file: ", error);
    }
};

const createDocument = async () => {
    const apiName = 'charger';
    const path = '/documentdata';
    const myInit = {};

    try {
        const response = await API.post(apiName, path, myInit);
        return response.url;
    } catch (error) {
        console.log(JSON.stringify(error.response.data.message));
        return null;
    }
};