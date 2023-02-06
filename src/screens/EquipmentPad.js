import React from 'react';
import ConstantPhotoPrompts from '../components/ConstantPhotoPrompts';
import { equipmentPadPrompts } from '../components/ConstantPhotoPrompts/prompts';

const EquipmentPad = () => {
    return <ConstantPhotoPrompts prompts={equipmentPadPrompts} navigateTo="TypeDDispensers" />
}

export default EquipmentPad; 