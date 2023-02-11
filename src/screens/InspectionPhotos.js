import React from 'react';
import FormPrompts from '../components/FormPrompts';
import { inspectionPhotoPrompts } from '../components/FormPrompts/prompts/inspectionPhotoPrompts';

const InspectionPhotos = () => {
    return <FormPrompts prompts={inspectionPhotoPrompts} navigateTo="SitePhotos" />
}

export default InspectionPhotos; 