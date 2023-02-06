import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { highPoweredMultiSystemDataPrompts } from '../components/FormPrompts/prompts/highPoweredMultiSystemDataPrompts';

const HighPoweredMultiSystemData = () => {
    return <FormPrompts prompts={highPoweredMultiSystemDataPrompts} navigateTo="StandaloneChargingSystemData" />
}

export default HighPoweredMultiSystemData; 