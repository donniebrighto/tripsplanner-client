import React from 'react';
import {
  Button,
  Container,
  Embed,
  Grid,
  Header,
  Icon,
  Placeholder,
  Segment,
} from 'semantic-ui-react';

const Home = () => (
  <Container>
    <Segment placeholder>
      <Header icon>
        <Icon name="pdf file outline" />
        Kreator Podróży
        <Header.Subheader>
          Zaplanuj swoją podróż razem z przyjaciółmi
        </Header.Subheader>
      </Header>
      <Button basic color="red">
        Wypróbuj
      </Button>
    </Segment>

    <Grid columns={3}>
      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>
    </Grid>

    <Embed style={{ marginTop: '40px' }} id="O6Xo21L0ybE" source="youtube" />
  </Container>
);

export default Home;
