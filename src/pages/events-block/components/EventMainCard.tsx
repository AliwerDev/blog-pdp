import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .event-card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    padding: 15px;
    height: 100%;
  }

  .event-image {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 10px;
  }

  .event-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .text-content {
    flex: 1;
  }

  .event-title {
    font-size: 22px;
    font-weight: 500;
    margin: 0;
    margin-top: 10px;
    line-height: 1.3;
  }

  .event-description {
    font-size: 13px;
    color: #555;
    font-weight: 300;
    margin: 10px 0;
  }

  .event-details {
    font-size: 13px;
    color: #333;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .event-detail {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 15px;

      img {
        width: 40px;
        height: 40px;
      }

      .label {
        display: block;
        font-size: 10px;

        &.red {
          color: #e53c3e;
        }
        &.blue {
          color: #3182ce;
        }
        &.orange {
          color: #f6ad55;
        }
        &.green {
          color: #38a169;
        }
      }
      .value {
        font-size: 14px;
      }
    }
  }

  /* Tablet (768px dan kichik) */
  @media (max-width: 768px) {
    .event-card {
      padding: 12px;
    }

    .event-image {
      height: 250px;
    }

    .event-title {
      font-size: 20px;
    }

    .event-description {
      font-size: 13px;
    }

    .event-detail {
      flex-direction: row;
      gap: 10px;
    }
  }

  /* Mobile (480px dan kichik) */
  @media (max-width: 480px) {
    .event-card {
      padding: 10px;
    }

    .event-image {
      height: 200px;
    }

    .event-title {
      font-size: 18px;
    }

    .event-description {
      font-size: 12px;
    }

    .event-detail {
      flex-direction: column;
      align-items: flex-start;
    }

    .event-details {
      font-size: 12px;
      flex-direction: column;
    }

    .event-detail img {
      width: 30px;
      height: 30px;
    }

    .label {
      font-size: 9px;
      text-align: center;
    }

    .value {
      font-size: 12px;
      text-align: center;
    }
  }
`;

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  coverImage: string;
}

const EventMainCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Wrapper>
      <div className="event-card">
        <img className="event-image" src={event?.coverImage} alt={event?.title} />
        <div className="event-content">
          <div className="text-content">
            <h3 className="event-title">{event?.title}</h3>
            <p className="event-description">{event?.description}</p>
          </div>

          <div className="event-details">
            <div className="event-detail">
              <img src="/icons/date.svg" alt="clock" />
              <div className="right">
                <span className="label red">TADBIR KUNI</span>
                <span className="value">{moment(event?.date).format("DD MMMM")}</span>
              </div>
            </div>
            <div className="event-detail">
              <img src="/icons/earch.svg" alt="clock" />
              <div className="right">
                <span className="label blue">MANZIL</span>
                <span className="value">{event?.location}</span>
              </div>
            </div>
            <div className="event-detail">
              <img src="/icons/users.svg" alt="clock" />
              <div className="right">
                <span className="label orange">SIG'IMI</span>
                <span className="value">
                  {event?.capacity} <span>nafar</span>
                </span>
              </div>
            </div>
            <div className="event-detail">
              <img src="/icons/clock.svg" alt="clock" />
              <div className="right">
                <span className="label green">TADBIR VAQTI</span>
                <span className="value">{moment(event?.date).format("HH:mm")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventMainCard;
