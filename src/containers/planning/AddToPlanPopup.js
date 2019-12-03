import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Popup } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { PLANNING } from '../../actions/planning';
import moment from 'moment';
import 'moment/locale/pl';

function formatDate(day) {
  return {
    key: day,
    value: day,
    text: moment(day)
      .locale('pl')
      .format('LL'),
  };
}

const mapDaysToOptions = days => {
  return days.map(formatDate);
};

function getDateValue(date) {
  if (!date) {
    return '';
  }
  return date;
}

const AddToPlanPopup = props => {
  const { id } = useParams();
  const {
    stompClient,
    currentUser,
    days,
    date,
    startTime,
    endTime,
    placeId,
  } = props;
  const {
    fetchPossibleDays,
    setStartTime,
    setEndTime,
    setDate,
    resetDateAndTime,
  } = props;

  useEffect(() => {
    fetchPossibleDays(id);
  }, []);

  const setDateTime = (date, time) => {
    date.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second'),
    });
  };

  const sendMessage = event => {
    const mStartDate = moment(date);
    const mEndDate = moment(date);
    const mStartTime = moment(startTime, 'HH:mm');
    const mEndTime = moment(endTime, 'HH:mm');

    setDateTime(mStartDate, mStartTime);
    setDateTime(mEndDate, mEndTime);

    const tripPointMessage = {
      placeId: placeId,
      user: currentUser,
      startDate: mStartDate.format(),
      endDate: mEndDate.format(),
    };

    stompClient.send(
      `/app/${id}/point.create`,
      {},
      JSON.stringify(tripPointMessage)
    );

    resetDateAndTime();
    event.preventDefault();
  };

  return (
    <Popup
      trigger={props.children}
      content={
        <Form>
          <Form.Field>
            <label>Dzień</label>
            <Form.Dropdown
              placeholder="Wybierz dzień..."
              options={mapDaysToOptions(days)}
              onChange={(event, { value }) => setDate(value)}
              value={getDateValue(date)}
              fluid
              selection
            />
          </Form.Field>
          <Form.Field>
            <label>Godzina rozpoczęcia</label>
            <Form.Input
              onChange={(event, { value }) => setStartTime(value)}
              type="time"
              value={startTime ? startTime : ''}
              fluid
            />
          </Form.Field>
          <Form.Field>
            <label>Godzina zakończenia</label>
            <Form.Input
              onChange={(event, { value }) => setEndTime(value)}
              type="time"
              value={endTime ? endTime : ''}
              fluid
            />
          </Form.Field>
          <Button fluid color="green" onClick={sendMessage}>
            Dodaj
          </Button>
        </Form>
      }
      position={props.position}
      header="Dodaj do planu"
      on="click"
    />
  );
};

const mapStateToProps = state => ({
  stompClient: state.planning.websocketsContext.stompClient,
  currentUser: state.authentication.currentUser,
  ...state.planning.tripPoints,
});

const mapDispatchToProps = {
  fetchPossibleDays: PLANNING.TRIP_POINTS.fetchPossibleDays,
  setStartTime: PLANNING.TRIP_POINTS.setStartTime,
  setEndTime: PLANNING.TRIP_POINTS.setEndTime,
  setDate: PLANNING.TRIP_POINTS.setDate,
  resetDateAndTime: PLANNING.TRIP_POINTS.resetDateAndTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToPlanPopup);
