import React, {Component} from 'react';
import SectionHeader from "./SectionHeader";
import PlaceholdersGrid from "./PlaceholdersGrid";
import {Container} from "semantic-ui-react";

class Checklists extends Component{

    render() {
        return (
            <Container>
                <SectionHeader
                    title="Checklisty"
                    subtitle="Przeglądaj listy rzeczy do zabrania stworzone przez użytkowników"
                    iconName="list alternate outline"
                    link={{
                        text: "Dodaj własną checklistę",
                        path: "/checklists/create"
                    }}
                />
                <PlaceholdersGrid/>
            </Container>
        )
    }
}

export default Checklists;