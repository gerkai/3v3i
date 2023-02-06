import React from 'react';
import ConstantPhotoPrompts from '../components/ConstantPhotoPrompts';
import { transformerMeterPrompts } from '../components/ConstantPhotoPrompts/prompts';

const TransformerMeter = () => {
    return <ConstantPhotoPrompts prompts={transformerMeterPrompts} navigateTo="KeyLocation" />
}

export default TransformerMeter; 