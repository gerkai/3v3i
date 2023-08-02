import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { revisionHistoryPrompts } from '../components/FormPrompts/prompts/revisionHistoryPrompts';

const RevisionHistory = () => {
    return <FormPrompts prompts={revisionHistoryPrompts} navigateTo="SiteDetails" />
}

export default RevisionHistory; 