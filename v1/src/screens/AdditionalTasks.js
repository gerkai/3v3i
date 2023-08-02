import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { additionalTasksPrompts } from '../components/FormPrompts/prompts/additionalTasksPrompts';

const AdditionalTasks = () => {
    return <FormPrompts prompts={additionalTasksPrompts} navigateTo="AdditionalDocuments" />
}

export default AdditionalTasks; 