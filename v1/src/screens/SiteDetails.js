import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { siteDetailsPrompts } from '../components/FormPrompts/prompts/siteDetailsPrompts';

const SiteDetails = () => {
    return <FormPrompts prompts={siteDetailsPrompts} navigateTo="AdditionalTasks" />
}

export default SiteDetails; 