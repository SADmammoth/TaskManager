import React from 'react';
import PropTypes from 'prop-types';
import DraggableArea from '../Draggable/DraggableArea';

class CalendarView extends React.Component {
  render() {
    return (
      <>
        <DraggableArea>
          <table>
            {(() => {
              let array = [];
              array.push(
                <tr>
                  {(() => {
                    let array = [];
                    array.push(<td></td>);
                    for (let col = 0; col < this.props.columns; col++) {
                      array.push(
                        <td>
                          {
                            (this.props.startDate.setDate(
                              this.props.startDate.getDate() + 1
                            ),
                            this.props.startDate.toLocaleDateString('ru-RU'))
                          }
                        </td>
                      );
                    }
                    return array;
                  })()}
                </tr>
              );
              for (let row = 0; row < this.props.rows; row++) {
                array.push(
                  <tr>
                    {(() => {
                      let array = [];
                      array.push(
                        <td>
                          {this.props.startDate.getHours() +
                            this.props.dateStep * row}
                        </td>
                      );
                      for (let col = 0; col < this.props.columns; col++) {
                        array.push(<td></td>);
                      }
                      return array;
                    })()}
                  </tr>
                );
              }
              return array;
            })()}
          </table>
        </DraggableArea>
      </>
    );
  }
}

export default CalendarView;

CalendarView.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  timeStep: PropTypes.number.isRequired
};
