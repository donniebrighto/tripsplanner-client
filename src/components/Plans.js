import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import SectionHeader from './SectionHeader';
import PlaceholdersGrid from './PlaceholdersGrid';

class Plans extends Component {

    render() {
        return (
            <Container>
                <SectionHeader
                    title="Plany wycieczek"
                    subtitle="Przeglądaj plany stworzone przez innych użytkowników"
                    iconName="briefcase"
                />
                <PlaceholdersGrid/>
            </Container>
        )
    }
}

export default Plans;