import React, { useState } from 'react';
import FormPrompts from '../components/FormPrompts';
import { titlePrompts } from '../components/FormPrompts/prompts/titlePrompts';

const Title = () => {
    return <FormPrompts prompts={titlePrompts} navigateTo="RevisionHistory" />
}

export default Title;