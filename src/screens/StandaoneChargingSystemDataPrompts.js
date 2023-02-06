import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { standaloneChargingStationDataPrompts } from '../components/FormPrompts/prompts/standaloneChargingStationDataPrompts';

const StandaloneChargingSystemData = () => {
    return <FormPrompts prompts={standaloneChargingStationDataPrompts} navigateTo="SitePhotos" />
}

export default StandaloneChargingSystemData; 