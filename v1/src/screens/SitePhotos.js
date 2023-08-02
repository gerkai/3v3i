import React from 'react';
import ConstantPhotoPrompts from '../components/ConstantPhotoPrompts';
import { sitePhotoPrompts } from '../components/ConstantPhotoPrompts/prompts';

const SitePhotos = () => {
    return <ConstantPhotoPrompts prompts={sitePhotoPrompts} navigateTo="EquipmentPad" />
}

export default SitePhotos; 