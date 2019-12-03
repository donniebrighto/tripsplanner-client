import React, { useEffect } from 'react';
import { PLANNING } from '../../actions/planning';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Header,
} from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/pl';
import AddToPlanPopup from './AddToPlanPopup';

function getDaysFromMapping(pointsByDay) {
  return pointsByDay
    .sort((e1, e2) => new Date(e1.day) - new Date(e2.day))
    .map(entry => {
      const { day } = entry;
      const formattedDay = moment(day)
        .locale('pl')
        .format('LLLL');
      const withoutTime = formattedDay.substring(0, formattedDay.length - 5);
      return {
        key: day,
        value: day,
        text: withoutTime,
      };
    });
}

const PointCard = props => {
  const { id, author, startDate, endDate } = props;
  const { name, vicinity, url, types } = props;

  const startTime = moment(startDate)
    .locale('pl')
    .format('LT');

  const endTime = moment(endDate)
    .locale('pl')
    .format('LT');

  return (
    <Card fluid key={startTime}>
      <Card.Content>
        <Header as="h5" floated="right">
          {startTime} - {endTime}
        </Header>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{types.slice(0, 2).toString()}</Card.Meta>
        <Card.Meta>autor: {author.name}</Card.Meta>
        <Card.Meta>adres: {vicinity}</Card.Meta>
        <div style={{ marginTop: '10px' }}>
          <Button as="a" target="_blank" href={url} basic>
            Sprawdź
          </Button>
          <Button.Group floated="right">
            <AddToPlanPopup>
              <Button basic color="blue">
                Edytuj
              </Button>
            </AddToPlanPopup>
            <Button
              basic
              color="red"
              onClick={() => props.deletePoint(props.tripId, id)}
            >
              Usuń
            </Button>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  );
};

const PlanContainer = props => {
  const { id } = useParams();
  const { day, points, pointsByDay, content } = props;
  const { fetchPointsByDay, fetchPointsDetails, deletePoint, setDay } = props;
  useEffect(() => {
    fetchPointsByDay(id);
  }, []);

  const comparePointObjects = JSON.stringify(points);
  useEffect(() => {
    points && fetchPointsDetails(id, points.tripPoints);
  }, [comparePointObjects]);

  let pointsCards;
  if (content) {
    const sorted = content.sort(
      (e1, e2) =>
        new Date(e1.tripPoint.startDate) - new Date(e2.tripPoint.startDate)
    );
    pointsCards = sorted.map(entry => {
      const { tripPoint, details } = entry;
      return (
        <PointCard
          {...tripPoint}
          {...details}
          deletePoint={deletePoint}
          tripId={id}
        />
      );
    });
  }

  return (
    <Container style={{ height: '100%' }}>
      <Dropdown
        placeholder="Wybierz dzień..."
        options={getDaysFromMapping(pointsByDay)}
        onChange={(event, { value }) => setDay(value)}
        value={day}
        fluid
        selection
      />
      <Divider />
      <Card.Group style={{ overflowY: 'scroll', height: 'calc(100% - 55px)' }}>
        {pointsCards}
      </Card.Group>
    </Container>
  );
};

const mapStateToProps = state => ({
  ...state.planning.plan,
});

const mapDispatchToProps = {
  fetchPointsByDay: PLANNING.PLAN.fetchPointsByDay,
  fetchPointsDetails: PLANNING.PLAN.fetchPointsDetails,
  deletePoint: PLANNING.PLAN.deletePoint,
  setDay: PLANNING.PLAN.setDay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanContainer);
