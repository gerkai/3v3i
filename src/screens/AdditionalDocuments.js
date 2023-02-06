import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { additionalDocumentsPrompts } from '../components/FormPrompts/prompts/additionalDocumentsPrompts';

const AdditionalDocuments = () => {
    return <FormPrompts prompts={additionalDocumentsPrompts} navigateTo="HighPoweredMultiSystemData" />
}

export default AdditionalDocuments; 