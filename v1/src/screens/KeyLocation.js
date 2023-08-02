import React from 'react';
import ConstantPhotoPrompts from '../components/ConstantPhotoPrompts';
import { keyLocationPrompts } from '../components/ConstantPhotoPrompts/prompts';

const SitePhotos = () => {
    return <ConstantPhotoPrompts prompts={keyLocationPrompts} navigateTo="CreateHTMLDocument" />
}

export default SitePhotos; 