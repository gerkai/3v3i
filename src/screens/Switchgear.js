import React from 'react';
import ConstantPhotoPrompts from '../components/ConstantPhotoPrompts';
import { switchgearPrompts } from '../components/ConstantPhotoPrompts/prompts';

const Switchgear = () => {
    return <ConstantPhotoPrompts prompts={switchgearPrompts} navigateTo="TransformerMeter" />
}

export default Switchgear; 